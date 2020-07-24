import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
export function getTwoPointDistance(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 2),
      xa = _ref3[0],
      ya = _ref3[1];

  var _ref4 = _slicedToArray(_ref2, 2),
      xb = _ref4[0],
      yb = _ref4[1];

  var minusX = Math.abs(xa - xb);
  var minusY = Math.abs(ya - yb);
  return Math.sqrt(minusX * minusX + minusY * minusY);
}
export function checkPointIsInCircle(point, _ref5) {
  var rx = _ref5.rx,
      ry = _ref5.ry,
      r = _ref5.r;
  return getTwoPointDistance(point, [rx, ry]) <= r;
}
export function checkPointIsInRect(_ref6, _ref7) {
  var _ref8 = _slicedToArray(_ref6, 2),
      px = _ref8[0],
      py = _ref8[1];

  var x = _ref7.x,
      y = _ref7.y,
      w = _ref7.w,
      h = _ref7.h;
  if (px < x) return false;
  if (py < y) return false;
  if (px > x + w) return false;
  if (py > y + h) return false;
  return true;
}
/**
 * @description Determine if the point is in the clockwise direction of the vector
 */

export function isClockWise(vArm, vPoint) {
  var _vArm = _slicedToArray(vArm, 2),
      ax = _vArm[0],
      ay = _vArm[1];

  var _vPoint = _slicedToArray(vPoint, 2),
      px = _vPoint[0],
      py = _vPoint[1];

  return -ay * px + ax * py > 0;
}
/**
 * @description Get the coordinates of the specified radian on the circle
 */

export function getCircleRadianPoint(x, y, radius, radian) {
  return [x + Math.cos(radian) * radius, y + Math.sin(radian) * radius];
}
export function checkPointIsInSector(point, _ref9) {
  var rx = _ref9.rx,
      ry = _ref9.ry,
      r = _ref9.r,
      startAngle = _ref9.startAngle,
      endAngle = _ref9.endAngle,
      clockWise = _ref9.clockWise;
  if (!point) return false;
  if (getTwoPointDistance(point, [rx, ry]) > r) return false;

  if (!clockWise) {
    var _ref10 = [endAngle, startAngle];
    startAngle = _ref10[0];
    endAngle = _ref10[1];
  }

  var reverseBE = startAngle > endAngle;

  if (reverseBE) {
    var _ref11 = [endAngle, startAngle];
    startAngle = _ref11[0];
    endAngle = _ref11[1];
  }

  var minus = endAngle - startAngle;
  if (minus >= Math.PI * 2) return true;

  var _point = _slicedToArray(point, 2),
      x = _point[0],
      y = _point[1];

  var _getCircleRadianPoint = getCircleRadianPoint(rx, ry, r, startAngle),
      _getCircleRadianPoint2 = _slicedToArray(_getCircleRadianPoint, 2),
      bx = _getCircleRadianPoint2[0],
      by = _getCircleRadianPoint2[1];

  var _getCircleRadianPoint3 = getCircleRadianPoint(rx, ry, r, endAngle),
      _getCircleRadianPoint4 = _slicedToArray(_getCircleRadianPoint3, 2),
      ex = _getCircleRadianPoint4[0],
      ey = _getCircleRadianPoint4[1];

  var vPoint = [x - rx, y - ry];
  var vBArm = [bx - rx, by - ry];
  var vEArm = [ex - rx, ey - ry];
  var reverse = minus > Math.PI;

  if (reverse) {
    var _ref12 = [vEArm, vBArm];
    vBArm = _ref12[0];
    vEArm = _ref12[1];
  }

  var inSector = isClockWise(vBArm, vPoint) && !isClockWise(vEArm, vPoint);
  if (reverse) inSector = !inSector;
  if (reverseBE) inSector = !inSector;
  return inSector;
}
/**
 * @description Get the points that make up a regular polygon
 */

export function getRegularPolygonPoints(_ref13) {
  var rx = _ref13.rx,
      ry = _ref13.ry,
      r = _ref13.r,
      side = _ref13.side;
  var minus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.PI * -0.5;
  var radianGap = Math.PI * 2 / side;
  var radians = new Array(side).fill('').map(function (t, i) {
    return i * radianGap + minus;
  });
  return radians.map(function (radian) {
    return getCircleRadianPoint(rx, ry, r, radian);
  });
}
/**
 * @description Check if the point is inside the polygon
 */

export function checkPointIsInPolygon(point, polygon) {
  var counter = 0;

  var _point2 = _slicedToArray(point, 2),
      x = _point2[0],
      y = _point2[1];

  var pointNum = polygon.length;

  for (var i = 1, p1 = polygon[0]; i <= pointNum; i++) {
    var p2 = polygon[i % pointNum];

    if (x > Math.min(p1[0], p2[0]) && x <= Math.max(p1[0], p2[0])) {
      if (y <= Math.max(p1[1], p2[1])) {
        if (p1[0] !== p2[0]) {
          var xinters = (x - p1[0]) * (p2[1] - p1[1]) / (p2[0] - p1[0]) + p1[1];

          if (p1[1] === p2[1] || y <= xinters) {
            counter++;
          }
        }
      }
    }

    p1 = p2;
  }

  return counter % 2 === 1;
}
/**
 * @description Check if the point is inside the polyline
 */

export function checkPointIsNearPolyline(point, polyline, lineWidth) {
  var halfLineWidth = lineWidth / 2;
  var moveUpPolyline = polyline.map(function (_ref14) {
    var _ref15 = _slicedToArray(_ref14, 2),
        x = _ref15[0],
        y = _ref15[1];

    return [x, y - halfLineWidth];
  });
  var moveDownPolyline = polyline.map(function (_ref16) {
    var _ref17 = _slicedToArray(_ref16, 2),
        x = _ref17[0],
        y = _ref17[1];

    return [x, y + halfLineWidth];
  });
  var polygon = [].concat(_toConsumableArray(moveUpPolyline), _toConsumableArray(moveDownPolyline.reverse()));
  return checkPointIsInPolygon(point, polygon);
}
/**
 * @description Eliminate line blur due to 1px line width
 */

export function eliminateBlur(points) {
  return points.map(function (_ref18) {
    var _ref19 = _slicedToArray(_ref18, 2),
        x = _ref19[0],
        y = _ref19[1];

    return [(x | 0) + 0.5, (y | 0) + 0.5];
  });
}