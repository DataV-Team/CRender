import { Point } from '../types/core/graph'
import { CircleShape, RectShape, ArcShape, RegPolygonShape } from '../types/graphs/shape'
export declare function getTwoPointDistance([xa, ya]: Point, [xb, yb]: Point): number
export declare function checkPointIsInCircle(point: Point, { rx, ry, r }: CircleShape): boolean
export declare function checkPointIsInRect([px, py]: Point, { x, y, w, h }: RectShape): boolean
/**
 * @description Determine if the point is in the clockwise direction of the vector
 */
export declare function isClockWise(vArm: [number, number], vPoint: Point): boolean
/**
 * @description Get the coordinates of the specified radian on the circle
 */
export declare function getCircleRadianPoint(
  x: number,
  y: number,
  radius: number,
  radian: number
): Point
export declare function checkPointIsInSector(
  point: Point,
  { rx, ry, r, startAngle, endAngle, clockWise }: ArcShape
): boolean
/**
 * @description Get the points that make up a regular polygon
 */
export declare function getRegularPolygonPoints(
  { rx, ry, r, side }: RegPolygonShape,
  minus?: number
): Point[]
/**
 * @description Check if the point is inside the polygon
 */
export declare function checkPointIsInPolygon(point: Point, polygon: Point[]): boolean
/**
 * @description Check if the point is inside the polyline
 */
export declare function checkPointIsNearPolyline(
  point: Point,
  polyline: Point[],
  lineWidth: number
): boolean
/**
 * @description Eliminate line blur due to 1px line width
 */
export declare function eliminateBlur(points: Point[]): Point[]
