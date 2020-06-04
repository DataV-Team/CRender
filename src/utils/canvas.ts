import { Point } from '../types/core/graph'

/**
 * @description Draw a polyline path
 */
export function drawPolylinePath(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  beginPath: boolean = false,
  closePath: boolean = false
): void {
  if (points.length < 2) return

  if (beginPath) ctx.beginPath()

  points.forEach((point, i) => point && (i === 0 ? ctx.moveTo(...point) : ctx.lineTo(...point)))

  if (closePath) ctx.closePath()
}

/**
 * @description Draw a bezier curve path
 */
export function drawBezierCurvePath(
  ctx: CanvasRenderingContext2D,
  points: Point[][],
  moveTo: false | Point = false,
  beginPath: boolean = false,
  closePath: boolean = false
): void {
  if (!ctx || !points) return

  if (beginPath) ctx.beginPath()

  if (moveTo) ctx.moveTo(...moveTo)

  points.forEach(item =>
    ctx.bezierCurveTo(item[0][0], item[0][1], item[1][0], item[1][1], item[2][0], item[2][1])
  )

  if (closePath) ctx.closePath()
}
