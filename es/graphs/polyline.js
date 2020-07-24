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

import { drawPolylinePath } from '../utils/canvas';
import { eliminateBlur, checkPointIsInPolygon, checkPointIsNearPolyline } from '../utils/graphs';
import Graph from '../core/graph.class';

var Polyline = /*#__PURE__*/function (_Graph) {
  _inherits(Polyline, _Graph);

  var _super = _createSuper(Polyline);

  function Polyline(config) {
    var _this;

    _classCallCheck(this, Polyline);

    _this = _super.call(this, Graph.mergeDefaultShape({
      points: [],
      close: false
    }, config, function (_ref) {
      var points = _ref.shape.points;
      if (!(points instanceof Array)) throw new Error('CRender Graph Polyline: Polyline points should be an array!');
    }));

    _defineProperty(_assertThisInitialized(_this), "name", 'polyline');

    return _this;
  }

  _createClass(Polyline, [{
    key: "draw",
    value: function draw() {
      var shape = this.shape,
          lineWidth = this.style.lineWidth,
          ctx = this.render.ctx;
      var points = shape.points,
          close = shape.close;
      ctx.beginPath();
      drawPolylinePath(ctx, lineWidth === 1 ? eliminateBlur(points) : points);

      if (close) {
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.stroke();
      }
    }
  }, {
    key: "hoverCheck",
    value: function hoverCheck(point) {
      var shape = this.shape,
          style = this.style;
      var points = shape.points,
          close = shape.close;
      var lineWidth = style.lineWidth;

      if (close) {
        return checkPointIsInPolygon(point, points);
      } else {
        return checkPointIsNearPolyline(point, points, lineWidth);
      }
    }
  }, {
    key: "setGraphCenter",
    value: function setGraphCenter() {
      var shape = this.shape,
          style = this.style;
      var points = shape.points;
      style.graphCenter = points[0];
    }
  }, {
    key: "move",
    value: function move(_ref2) {
      var movementX = _ref2.movementX,
          movementY = _ref2.movementY;
      var points = this.shape.points;
      var moveAfterPoints = points.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            x = _ref4[0],
            y = _ref4[1];

        return [x + movementX, y + movementY];
      });
      this.attr('shape', {
        points: moveAfterPoints
      });
    }
  }]);

  return Polyline;
}(Graph);

export default Polyline;