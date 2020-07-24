import { Point } from '../types/core/graph'

/**
 * @description Get the coordinates of the rotated point
 */
export function getRotatePointPos(rotate = 0, point: Point, origin: Point = [0, 0]): Point {
  if (rotate % 360 === 0) return point

  const [x, y] = point

  const [ox, oy] = origin

  rotate *= Math.PI / 180

  return [
    (x - ox) * Math.cos(rotate) - (y - oy) * Math.sin(rotate) + ox,
    (x - ox) * Math.sin(rotate) + (y - oy) * Math.cos(rotate) + oy,
  ]
}

/**
 * @description Get the coordinates of the scaled point
 */
export function getScalePointPos(
  scale: [number, number] = [1, 1],
  point: Point,
  origin: Point = [0, 0]
): Point {
  const [x, y] = point

  const [ox, oy] = origin

  const [xs, ys] = scale

  const relativePosX = x - ox
  const relativePosY = y - oy

  return [relativePosX * xs + ox, relativePosY * ys + oy]
}

/**
 * @description Get the coordinates of the scaled point
 */
export function getTranslatePointPos(translate: [number, number], point: Point): Point {
  const [x, y] = point
  const [tx, ty] = translate

  return [x + tx, y + ty]
}

/**
 * @description Check if the point is inside the rect
 */
export function checkPointIsInRect(
  [px, py]: Point,
  x: number,
  y: number,
  width: number,
  height: number
): boolean {
  if (px < x) return false
  if (py < y) return false

  if (px > x + width) return false
  if (py > y + height) return false

  return true
}

/**
 * @description Return a timed release Promise
 */
export function delay(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
