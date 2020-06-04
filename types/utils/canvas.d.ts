import { Point } from '../types/core/graph'
/**
 * @description Draw a polyline path
 */
export declare function drawPolylinePath(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  beginPath?: boolean,
  closePath?: boolean
): void
/**
 * @description Draw a bezier curve path
 */
export declare function drawBezierCurvePath(
  ctx: CanvasRenderingContext2D,
  points: Point[][],
  moveTo?: false | Point,
  beginPath?: boolean,
  closePath?: boolean
): void
