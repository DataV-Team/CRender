import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { checkPointIsInRect } from '../utils/graphs';
import Graph from '../core/graph.class';

var Rect = /*#__PURE__*/function (_Graph) {
  _inherits(Rect, _Graph);

  var _super = _createSuper(Rect);

  function Rect(config) {
    var _this;

    _classCallCheck(this, Rect);

    _this = _super.call(this, Graph.mergeDefaultShape({
      x: 0,
      y: 0,
      w: 0,
      h: 0
    }, config, function (_ref) {
      var _ref$shape = _ref.shape,
          x = _ref$shape.x,
          y = _ref$shape.y,
          w = _ref$shape.w,
          h = _ref$shape.h;
      if (typeof x !== 'number' || typeof y !== 'number' || typeof w !== 'number' || typeof h !== 'number') throw new Error('CRender Graph Rect: Rect shape configuration is invalid!');
    }));

    _defineProperty(_assertThisInitialized(_this), "name", 'rect');

    return _this;
  }

  _createClass(Rect, [{
    key: "draw",
    value: function draw() {
      var shape = this.shape,
          ctx = this.render.ctx;
      var x = shape.x,
          y = shape.y,
          w = shape.w,
          h = shape.h;
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.fill();
      ctx.stroke();
    }
  }, {
    key: "hoverCheck",
    value: function hoverCheck(point) {
      var shape = this.shape;
      return checkPointIsInRect(point, shape);
    }
  }, {
    key: "setGraphCenter",
    value: function setGraphCenter() {
      var shape = this.shape,
          style = this.style;
      var x = shape.x,
          y = shape.y,
          w = shape.w,
          h = shape.h;
      style.graphCenter = [x + w / 2, y + h / 2];
    }
  }, {
    key: "move",
    value: function move(_ref2) {
      var movementX = _ref2.movementX,
          movementY = _ref2.movementY;
      var shape = this.shape;
      this.attr('shape', {
        x: shape.x + movementX,
        y: shape.y + movementY
      });
    }
  }]);

  return Rect;
}(Graph);

export default Rect;