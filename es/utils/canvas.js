import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

/**
 * @description Draw a polyline path
 */
export function drawPolylinePath(ctx, points) {
  var beginPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var closePath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (points.length < 2) return;
  if (beginPath) ctx.beginPath();
  points.forEach(function (point, i) {
    return point && (i === 0 ? ctx.moveTo.apply(ctx, _toConsumableArray(point)) : ctx.lineTo.apply(ctx, _toConsumableArray(point)));
  });
  if (closePath) ctx.closePath();
}
/**
 * @description Draw a bezier curve path
 */

export function drawBezierCurvePath(ctx, points) {
  var moveTo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var beginPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var closePath = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (!ctx || !points) return;
  if (beginPath) ctx.beginPath();
  if (moveTo) ctx.moveTo.apply(ctx, _toConsumableArray(moveTo));
  points.forEach(function (item) {
    return ctx.bezierCurveTo(item[0][0], item[0][1], item[1][0], item[1][1], item[2][0], item[2][1]);
  });
  if (closePath) ctx.closePath();
}