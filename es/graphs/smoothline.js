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
import { polylineToBezierCurve, bezierCurveToPolyline } from '@jiaminghi/bezier-curve';

var Smoothline = /*#__PURE__*/function (_Graph) {
  _inherits(Smoothline, _Graph);

  var _super = _createSuper(Smoothline);

  function Smoothline(config) {
    var _this;

    _classCallCheck(this, Smoothline);

    _this = _super.call(this, Graph.mergeDefaultShape({
      points: [],
      close: false
    }, config, function (_ref) {
      var points = _ref.shape.points;
      if (!(points instanceof Array)) throw new Error('CRender Graph Smoothline: Smoothline points should be an array!');
    }));

    _defineProperty(_assertThisInitialized(_this), "name", 'smoothline');

    _defineProperty(_assertThisInitialized(_this), "cache", {});

    return _this;
  }

  _createClass(Smoothline, [{
    key: "draw",
    value: function draw() {
      var shape = this.shape,
          cache = this.cache,
          ctx = this.render.ctx;
      var points = shape.points,
          close = shape.close;

      if (!cache.points || cache.points.toString() !== points.toString()) {
        var _bezierCurve = polylineToBezierCurve(points, close);

        var hoverPoints = bezierCurveToPolyline(_bezierCurve);
        Object.assign(cache, {
          points: deepClone(points),
          bezierCurve: _bezierCurve,
          hoverPoints: hoverPoints
        });
      }

      var bezierCurve = cache.bezierCurve;
      ctx.beginPath();
      drawBezierCurvePath(ctx, bezierCurve.slice(1), bezierCurve[0]);

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
      var points = this.shape.points,
          style = this.style;
      style.graphCenter = points[0];
    }
  }, {
    key: "move",
    value: function move(_ref2) {
      var movementX = _ref2.movementX,
          movementY = _ref2.movementY;
      var shape = this.shape,
          cache = this.cache;
      var points = shape.points;
      var moveAfterPoints = points.map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            x = _ref4[0],
            y = _ref4[1];

        return [x + movementX, y + movementY];
      });
      cache.points = moveAfterPoints;

      var _ = _slicedToArray(cache.bezierCurve[0], 2),
          fx = _[0],
          fy = _[1];

      var curves = cache.bezierCurve.slice(1);
      cache.bezierCurve = [[fx + movementX, fy + movementY]].concat(_toConsumableArray(curves.map(function (curve) {
        return curve.map(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              x = _ref6[0],
              y = _ref6[1];

          return [x + movementX, y + movementY];
        });
      })));
      cache.hoverPoints = cache.hoverPoints.map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            x = _ref8[0],
            y = _ref8[1];

        return [x + movementX, y + movementY];
      });
      this.attr('shape', {
        points: moveAfterPoints
      });
    }
  }]);

  return Smoothline;
}(Graph);

export default Smoothline;