"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawPolylinePath = drawPolylinePath;
exports.drawBezierCurvePath = drawBezierCurvePath;
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @description Draw a polyline path
 * @param {Object} ctx        Canvas 2d context
 * @param {Array} points      The points that makes up a polyline
 * @param {Boolean} beginPath Whether to execute beginPath
 * @param {Boolean} closePath Whether to execute closePath
 * @return {Undefined} Void
 */
function drawPolylinePath(ctx, points) {
  var beginPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var closePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (!ctx || points.length < 2) return false;
  if (beginPath) ctx.beginPath();
  points.forEach(function (point, i) {
    return point && (i === 0 ? ctx.moveTo.apply(ctx, _toConsumableArray(point)) : ctx.lineTo.apply(ctx, _toConsumableArray(point)));
  });
  if (closePath) ctx.closePath();
}
/**
 * @description Draw a bezier curve path
 * @param {Object} ctx        Canvas 2d context
 * @param {Array} points      The points that makes up a bezier curve
 * @param {Array} moveTo      The point need to excute moveTo
 * @param {Boolean} beginPath Whether to execute beginPath
 * @param {Boolean} closePath Whether to execute closePath
 * @return {Undefined} Void
 */


function drawBezierCurvePath(ctx, points) {
  var moveTo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var beginPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var closePath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (!ctx || !points) return false;
  if (beginPath) ctx.beginPath();
  if (moveTo) ctx.moveTo.apply(ctx, _toConsumableArray(moveTo));
  points.forEach(function (item) {
    return item && ctx.bezierCurveTo.apply(ctx, _toConsumableArray(item[0]).concat(_toConsumableArray(item[1]), _toConsumableArray(item[2])));
  });
  if (closePath) ctx.closePath();
}

var _default = {
  drawPolylinePath: drawPolylinePath,
  drawBezierCurvePath: drawBezierCurvePath
};
exports["default"] = _default;