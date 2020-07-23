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

import { deepClone } from '../utils/common';
import { drawBezierCurvePath } from '../utils/canvas';
import { checkPointIsInPolygon, checkPointIsNearPolyline } from '../utils/graphs';
import Graph from '../core/graph.class';
import { bezierCurveToPolyline } from '@jiaminghi/bezier-curve';

var BezierCurve = /*#__PURE__*/function (_Graph) {
  _inherits(BezierCurve, _Graph);

  var _super = _createSuper(BezierCurve);

  function BezierCurve(config) {
    var _this;

    _classCallCheck(this, BezierCurve);

    _this = _super.call(this, Graph.mergeDefaultShape({
      points: [],
      close: false
    }, config, function (_ref) {
      var points = _ref.shape.points;
      if (!(points instanceof Array)) throw new Error('CRender Graph BezierCurve: BezierCurve points should be an array!');
    }));

    _defineProperty(_assertThisInitialized(_this), "name", 'bezierCurve');

    _defineProperty(_assertThisInitialized(_this), "cache", {});

    return _this;
  }

  _createClass(BezierCurve, [{
    key: "draw",
    value: function draw() {
      var shape = this.shape,
          cache = this.cache,
          render = this.render;
      var points = shape.points,
          close = shape.close;
      var ctx = render.ctx;

      if (!cache.points || cache.points.toString() !== points.toString()) {
        var hoverPoints = bezierCurveToPolyline(points, 20);
        Object.assign(cache, {
          points: deepClone(points),
          hoverPoints: hoverPoints
        });
      }

      ctx.beginPath();
      drawBezierCurvePath(ctx, points.slice(1), points[0]);

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
      var cache = this.cache,
          shape = this.shape,
          style = this.style;
      var hoverPoints = cache.hoverPoints;
      var close = shape.close;
      var lineWidth = style.lineWidth;

      if (close) {
        return checkPointIsInPolygon(point, hoverPoints);
      } else {
        return checkPointIsNearPolyline(point, hoverPoints, lineWidth);
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
      var points = this.shape.points,
          cache = this.cache;

      var _ref3 = points[0],
          _ref4 = _slicedToArray(_ref3, 2),
          fx = _ref4[0],
          fy = _ref4[1];

      var curves = points.slice(1);
      var bezierCurvePoints = [[fx + movementX, fy + movementY]].concat(_toConsumableArray(curves.map(function (curve) {
        return curve.map(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              x = _ref6[0],
              y = _ref6[1];

          return [x + movementX, y + movementY];
        });
      })));
      cache.points = bezierCurvePoints;
      cache.hoverPoints = cache.hoverPoints.map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            x = _ref8[0],
            y = _ref8[1];

        return [x + movementX, y + movementY];
      });
      this.attr('shape', {
        points: bezierCurvePoints
      });
    }
  }]);

  return BezierCurve;
}(Graph);

export default BezierCurve;