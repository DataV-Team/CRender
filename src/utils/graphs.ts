import { Point } from '../types/core/graph'
import { CircleShape, RectShape, ArcShape, RegPolygonShape } from '../types/graphs/shape'

export function getTwoPointDistance([xa, ya]: Point, [xb, yb]: Point): number {
  const minusX = Math.abs(xa - xb)
  const minusY = Math.abs(ya - yb)

  return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function checkPointIsInCircle(point: Point, { rx, ry, r }: CircleShape): boolean {
  return getTwoPointDistance(point, [rx, ry]) <= r
}

export function checkPointIsInRect([px, py]: Point, { x, y, w, h }: RectShape): boolean {
  if (px < x) return false
  if (py < y) return false

  if (px > x + w) return false
  if (py > y + h) return false

  return true
}

/**
 * @description Determine if the point is in the clockwise direction of the vector
 */
export function isClockWise(vArm: [number, number], vPoint: Point): boolean {
  const [ax, ay] = vArm
  const [px, py] = vPoint

  return -ay * px + ax * py > 0
}

/**
 * @description Get the coordinates of the specified radian on the circle
 */
export function getCircleRadianPoint(x: number, y: number, radius: number, radian: number): Point {
  return [x + Math.cos(radian) * radius, y + Math.sin(radian) * radius]
}

export function checkPointIsInSector(
  point: Point,
  { rx, ry, r, startAngle, endAngle, clockWise }: ArcShape
): boolean {
  if (!point) return false

  if (getTwoPointDistance(point, [rx, ry]) > r) return false

  if (!clockWise) [startAngle, endAngle] = [endAngle, startAngle]

  const reverseBE = startAngle > endAngle

  if (reverseBE) [startAngle, endAngle] = [endAngle, startAngle]

  const minus = endAngle - startAngle

  if (minus >= Math.PI * 2) return true

  const [x, y] = point

  const [bx, by] = getCircleRadianPoint(rx, ry, r, startAngle)
  const [ex, ey] = getCircleRadianPoint(rx, ry, r, endAngle)

  const vPoint: Point = [x - rx, y - ry]
  let vBArm: [number, number] = [bx - rx, by - ry]
  let vEArm: [number, number] = [ex - rx, ey - ry]

  const reverse = minus > Math.PI

  if (reverse) [vBArm, vEArm] = [vEArm, vBArm]

  let inSector = isClockWise(vBArm, vPoint) && !isClockWise(vEArm, vPoint)

  if (reverse) inSector = !inSector

  if (reverseBE) inSector = !inSector

  return inSector
}

/**
 * @description Get the points that make up a regular polygon
 */
export function getRegularPolygonPoints(
  { rx, ry, r, side }: RegPolygonShape,
  minus = Math.PI * -0.5
): Point[] {
  const radianGap = (Math.PI * 2) / side

  const radians = new Array(side).fill('').map((t, i) => i * radianGap + minus)

  return radians.map(radian => getCircleRadianPoint(rx, ry, r, radian))
}

/**
 * @description Check if the point is inside the polygon
 */
export function checkPointIsInPolygon(point: Point, polygon: Point[]): boolean {
  let counter = 0

  const [x, y] = point

  const pointNum = polygon.length

  for (let i = 1, p1 = polygon[0]; i <= pointNum; i++) {
    const p2 = polygon[i % pointNum]
    if (x > Math.min(p1[0], p2[0]) && x <= Math.max(p1[0], p2[0])) {
      if (y <= Math.max(p1[1], p2[1])) {
        if (p1[0] !== p2[0]) {
          const xinters = ((x - p1[0]) * (p2[1] - p1[1])) / (p2[0] - p1[0]) + p1[1]

          if (p1[1] === p2[1] || y <= xinters) {
            counter++
          }
        }
      }
    }

    p1 = p2
  }

  return counter % 2 === 1
}

/**
 * @description Check if the point is inside the polyline
 */
export function checkPointIsNearPolyline(
  point: Point,
  polyline: Point[],
  lineWidth: number
): boolean {
  const halfLineWidth = lineWidth / 2

  const moveUpPolyline = polyline.map(([x, y]) => [x, y - halfLineWidth])
  const moveDownPolyline = polyline.map(([x, y]) => [x, y + halfLineWidth])

  const polygon = [...moveUpPolyline, ...moveDownPolyline.reverse()]

  return checkPointIsInPolygon(point, polygon as Point[])
}

/**
 * @description Eliminate line blur due to 1px line width
 */
export function eliminateBlur(points: Point[]): Point[] {
  return points.map(([x, y]) => [(x | 0) + 0.5, (y | 0) + 0.5])
}
