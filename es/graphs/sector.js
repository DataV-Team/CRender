import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { checkPointIsInSector } from '../utils/graphs';
import Graph from '../core/graph.class';

var Sector = /*#__PURE__*/function (_Graph) {
  _inherits(Sector, _Graph);

  var _super = _createSuper(Sector);

  function Sector(config) {
    var _this;

    _classCallCheck(this, Sector);

    _this = _super.call(this, Graph.mergeDefaultShape({
      rx: 0,
      ry: 0,
      r: 0,
      startAngle: 0,
      endAngle: 0,
      clockWise: true
    }, config, function (_ref) {
      var shape = _ref.shape;
      var keys = ['rx', 'ry', 'r', 'startAngle', 'endAngle'];
      if (keys.find(function (key) {
        return typeof shape[key] !== 'number';
      })) throw new Error('CRender Graph Sector: Sector shape configuration is invalid!');
    }));

    _defineProperty(_assertThisInitialized(_this), "name", 'sector');

    return _this;
  }

  _createClass(Sector, [{
    key: "draw",
    value: function draw() {
      var shape = this.shape,
          ctx = this.render.ctx;
      var rx = shape.rx,
          ry = shape.ry,
          r = shape.r,
          startAngle = shape.startAngle,
          endAngle = shape.endAngle,
          clockWise = shape.clockWise;
      ctx.beginPath();
      ctx.arc(rx, ry, r > 0 ? r : 0, startAngle, endAngle, !clockWise);
      ctx.lineTo(rx, ry);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }, {
    key: "hoverCheck",
    value: function hoverCheck(point) {
      var shape = this.shape;
      return checkPointIsInSector(point, shape);
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
    value: function move(_ref2) {
      var movementX = _ref2.movementX,
          movementY = _ref2.movementY;
      var shape = this.shape;
      var rx = shape.rx,
          ry = shape.ry;
      this.attr('shape', {
        rx: rx + movementX,
        ry: ry + movementY
      });
    }
  }]);

  return Sector;
}(Graph);

export default Sector;