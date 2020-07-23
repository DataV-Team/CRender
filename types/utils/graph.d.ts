import { Point } from '../types/core/graph'
/**
 * @description Get the coordinates of the rotated point
 */
export declare function getRotatePointPos(
  rotate: number | undefined,
  point: Point,
  origin?: Point
): Point
/**
 * @description Get the coordinates of the scaled point
 */
export declare function getScalePointPos(
  scale: [number, number] | undefined,
  point: Point,
  origin?: Point
): Point
/**
 * @description Get the coordinates of the scaled point
 */
export declare function getTranslatePointPos(translate: [number, number], point: Point): Point
/**
 * @description Check if the point is inside the rect
 */
export declare function checkPointIsInRect(
  [px, py]: Point,
  x: number,
  y: number,
  width: number,
  height: number
): boolean
/**
 * @description Return a timed release Promise
 */
export declare function delay(time: number): Promise<void>
