import _slicedToArray from "@babel/runtime/helpers/slicedToArray";

/**
 * @description Get the coordinates of the rotated point
 */
export function getRotatePointPos() {
  var rotate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var point = arguments.length > 1 ? arguments[1] : undefined;
  var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];
  if (rotate % 360 === 0) return point;

  var _point = _slicedToArray(point, 2),
      x = _point[0],
      y = _point[1];

  var _origin = _slicedToArray(origin, 2),
      ox = _origin[0],
      oy = _origin[1];

  rotate *= Math.PI / 180;
  return [(x - ox) * Math.cos(rotate) - (y - oy) * Math.sin(rotate) + ox, (x - ox) * Math.sin(rotate) + (y - oy) * Math.cos(rotate) + oy];
}
/**
 * @description Get the coordinates of the scaled point
 */

export function getScalePointPos() {
  var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [1, 1];
  var point = arguments.length > 1 ? arguments[1] : undefined;
  var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];

  var _point2 = _slicedToArray(point, 2),
      x = _point2[0],
      y = _point2[1];

  var _origin2 = _slicedToArray(origin, 2),
      ox = _origin2[0],
      oy = _origin2[1];

  var _scale = _slicedToArray(scale, 2),
      xs = _scale[0],
      ys = _scale[1];

  var relativePosX = x - ox;
  var relativePosY = y - oy;
  return [relativePosX * xs + ox, relativePosY * ys + oy];
}
/**
 * @description Get the coordinates of the scaled point
 */

export function getTranslatePointPos(translate, point) {
  var _point3 = _slicedToArray(point, 2),
      x = _point3[0],
      y = _point3[1];

  var _translate = _slicedToArray(translate, 2),
      tx = _translate[0],
      ty = _translate[1];

  return [x + tx, y + ty];
}
/**
 * @description Check if the point is inside the rect
 */

export function checkPointIsInRect(_ref, x, y, width, height) {
  var _ref2 = _slicedToArray(_ref, 2),
      px = _ref2[0],
      py = _ref2[1];

  if (px < x) return false;
  if (py < y) return false;
  if (px > x + width) return false;
  if (py > y + height) return false;
  return true;
}
/**
 * @description Return a timed release Promise
 */

export function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}