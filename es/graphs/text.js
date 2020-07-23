import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import Graph from '../core/graph.class';
import { checkPointIsInRect } from '../utils/graphs';

var Text = /*#__PURE__*/function (_Graph) {
  _inherits(Text, _Graph);

  var _super = _createSuper(Text);

  function Text(config) {
    var _this;

    _classCallCheck(this, Text);

    _this = _super.call(this, Graph.mergeDefaultShape({
      content: '',
      position: [0, 0],
      maxWidth: undefined,
      rowGap: 0
    }, config, function (_ref) {
      var _ref$shape = _ref.shape,
          content = _ref$shape.content,
          position = _ref$shape.position,
          rowGap = _ref$shape.rowGap;
      if (typeof content !== 'string') throw new Error('CRender Graph Text: Text content should be a string!');
      if (!Array.isArray(position)) throw new Error('CRender Graph Text: Text position should be an array!');
      if (typeof rowGap !== 'number') throw new Error('CRender Graph Text: Text rowGap should be a number!');
    }));

    _defineProperty(_assertThisInitialized(_this), "name", 'text');

    _defineProperty(_assertThisInitialized(_this), "cache", {});

    return _this;
  }

  _createClass(Text, [{
    key: "draw",
    value: function draw() {
      var shape = this.shape,
          ctx = this.render.ctx;
      var content = shape.content,
          position = shape.position,
          maxWidth = shape.maxWidth,
          rowGap = shape.rowGap;
      var textBaseline = ctx.textBaseline,
          font = ctx.font;
      var contentArr = content.split('\n');
      var rowNum = contentArr.length;
      var fontSize = parseInt(font.replace(/\D/g, ''));
      var lineHeight = fontSize + rowGap;
      var allHeight = rowNum * lineHeight - rowGap;
      var offset = 0;
      var x = position[0];
      var y = position[1];

      if (textBaseline === 'middle') {
        offset = allHeight / 2;
        y += fontSize / 2;
      }

      if (textBaseline === 'bottom' || textBaseline === 'alphabetic') {
        offset = allHeight;
        y += fontSize;
      }

      var positions = new Array(rowNum).fill(0).map(function (_, i) {
        return [x, y + i * lineHeight - offset];
      });
      ctx.beginPath();
      var realMaxWidth = 0;
      contentArr.forEach(function (text, i) {
        // calc text width and height for hover check
        var width = ctx.measureText(text).width;
        if (width > realMaxWidth) realMaxWidth = width;
        ctx.fillText(text, positions[i][0], positions[i][1], maxWidth);
        ctx.strokeText(text, positions[i][0], positions[i][1], maxWidth);
      });
      ctx.closePath();
      this.setCache(realMaxWidth, allHeight);
    }
  }, {
    key: "setCache",
    value: function setCache(width, height) {
      var cache = this.cache,
          _this$shape$position = _slicedToArray(this.shape.position, 2),
          x = _this$shape$position[0],
          y = _this$shape$position[1],
          ctx = this.render.ctx;

      var textAlign = ctx.textAlign,
          textBaseline = ctx.textBaseline;
      cache.w = width;
      cache.h = height;
      cache.x = x;
      cache.y = y;

      if (textAlign === 'center') {
        cache.x = x - width / 2;
      } else if (textAlign === 'end' || textAlign === 'right') {
        cache.x = x - width;
      }

      if (textBaseline === 'middle') {
        cache.y = y - height / 2;
      } else if (textBaseline === 'bottom' || textBaseline === 'alphabetic') {
        cache.y = y - height;
      }
    }
  }, {
    key: "setGraphCenter",
    value: function setGraphCenter() {
      var position = this.shape.position,
          style = this.style;
      style.graphCenter = _toConsumableArray(position);
    }
  }, {
    key: "move",
    value: function move(_ref2) {
      var movementX = _ref2.movementX,
          movementY = _ref2.movementY;

      var _this$shape$position2 = _slicedToArray(this.shape.position, 2),
          x = _this$shape$position2[0],
          y = _this$shape$position2[1];

      this.attr('shape', {
        position: [x + movementX, y + movementY]
      });
    }
  }, {
    key: "hoverCheck",
    value: function hoverCheck(point) {
      var _this$cache = this.cache,
          x = _this$cache.x,
          y = _this$cache.y,
          w = _this$cache.w,
          h = _this$cache.h;
      return checkPointIsInRect(point, {
        x: x,
        y: y,
        w: w,
        h: h
      });
    }
  }]);

  return Text;
}(Graph);

export default Text;