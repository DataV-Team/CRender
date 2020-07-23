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

import { getRegularPolygonPoints, checkPointIsInPolygon } from '../utils/graphs';
import { drawPolylinePath } from '../utils/canvas';
import Graph from '../core/graph.class';

var RegPolygon = /*#__PURE__*/function (_Graph) {
  _inherits(RegPolygon, _Graph);

  var _super = _createSuper(RegPolygon);

  function RegPolygon(config) {
    var _this;

    _classCallCheck(this, RegPolygon);

    _this = _super.call(this, Graph.mergeDefaultShape({
      rx: 0,
      ry: 0,
      r: 0,
      side: 0
    }, config, function (_ref) {
      var shape = _ref.shape;
      var side = shape.side;
      var keys = ['rx', 'ry', 'r', 'side'];
      if (keys.find(function (key) {
        return typeof shape[key] !== 'number';
      })) throw new Error('CRender Graph RegPolygon: RegPolygon shape configuration is invalid!');
      if (side < 3) throw new Error('CRender Graph RegPolygon: RegPolygon at least trigon!');
    }));

    _defineProperty(_assertThisInitialized(_this), "name", 'regPolygon');

    _defineProperty(_assertThisInitialized(_this), "cache", {});

    return _this;
  }

  _createClass(RegPolygon, [{
    key: "draw",
    value: function draw() {
      var shape = this.shape,
          cache = this.cache,
          ctx = this.render.ctx;
      var rx = shape.rx,
          ry = shape.ry,
          r = shape.r,
          side = shape.side;

      if (cache.points || cache.rx !== rx || cache.ry !== ry || cache.r !== r || cache.side !== side) {
        var _points = getRegularPolygonPoints(shape);

        Object.assign(cache, {
          points: _points,
          rx: rx,
          ry: ry,
          r: r,
          side: side
        });
      }

      var _ref2 = cache,
          points = _ref2.points;
      ctx.beginPath();
      drawPolylinePath(ctx, points);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }, {
    key: "hoverCheck",
    value: function hoverCheck(point) {
      var _ref3 = this.cache,
          points = _ref3.points;
      return checkPointIsInPolygon(point, points);
    }
  }, {
    key: "setGraphCenter",
    value: function setGraphCenter() {
      var shape = this.shape,
          style = this.style;
      var rx = shape.rx,
          ry = shape.ry;
      style.graphCenter = [rx, ry];
    }
  }, {
    key: "move",
    value: function move(_ref4) {
      var movementX = _ref4.movementX,
          movementY = _ref4.movementY;
      var shape = this.shape,
          cache = this.cache;
      var rx = shape.rx,
          ry = shape.ry;
      cache.rx += movementX;
      cache.ry += movementY;
      this.attr('shape', {
        rx: rx + movementX,
        ry: ry + movementY
      });
      cache.points = cache.points.map(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            x = _ref6[0],
            y = _ref6[1];

        return [x + movementX, y + movementY];
      });
    }
  }]);

  return RegPolygon;
}(Graph);

export default RegPolygon;