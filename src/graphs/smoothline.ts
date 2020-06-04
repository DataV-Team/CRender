import { GraphModel } from '../types/graphs/index'
import { Point } from '../types/core/graph'
import { SmoothlineShape, SmoothlineShapeCache } from '../types/graphs/shape'
import { deepClone } from '../utils/common'
import { drawBezierCurvePath } from '../utils/canvas'
import { checkPointIsInPolygon, checkPointIsNearPolyline } from '../utils/graphs'
import { polylineToBezierCurve, bezierCurveToPolyline } from '@jiaminghi/bezier-curve'
import { BezierCurveSegment, BezierCurve } from '@jiaminghi/bezier-curve/types/types'

const smoothline: GraphModel<SmoothlineShape, SmoothlineShapeCache> = {
  shape: {
    points: [],
    close: false,
  },

  validator({ shape }) {
    const { points } = shape

    if (!(points instanceof Array)) {
      console.error('CRender Graph Smoothline: Smoothline points should be an array!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape, cache }) {
    const { points, close } = shape

    if (!cache.points || cache.points.toString() !== points.toString()) {
      const bezierCurve = polylineToBezierCurve(points, close)
      const hoverPoints = bezierCurveToPolyline(bezierCurve)

      Object.assign(cache, {
        points: deepClone(points),
        bezierCurve,
        hoverPoints,
      })
    }

    const { bezierCurve } = cache

    ctx.beginPath()

    drawBezierCurvePath(ctx, bezierCurve.slice(1) as Point[][], bezierCurve[0])

    if (close) {
      ctx.closePath()

      ctx.fill()
      ctx.stroke()
    } else {
      ctx.stroke()
    }
  },

  hoverCheck(point, { cache, shape, style }) {
    const { hoverPoints } = cache

    const { close } = shape

    const { lineWidth } = style

    if (close) {
      return checkPointIsInPolygon(point, hoverPoints)
    } else {
      return checkPointIsNearPolyline(point, hoverPoints, lineWidth)
    }
  },

  setGraphCenter({ shape, style }) {
    const { points } = shape

    style.graphCenter = points[0]
  },

  move({ movementX, movementY }, smoothline) {
    const { shape, cache } = smoothline
    const { points } = shape

    const moveAfterPoints = points.map<Point>(([x, y]) => [x + movementX, y + movementY])

    cache.points = moveAfterPoints

    const [fx, fy] = cache.bezierCurve[0]
    const curves = cache.bezierCurve.slice(1)

    cache.bezierCurve = [
      [fx + movementX, fy + movementY],
      ...(curves as BezierCurveSegment[]).map(curve =>
        curve.map<Point>(([x, y]) => [x + movementX, y + movementY])
      ),
    ] as BezierCurve

    cache.hoverPoints = cache.hoverPoints.map(([x, y]) => [x + movementX, y + movementY])

    smoothline.attr('shape', {
      points: moveAfterPoints,
    })
  },
}

export default smoothline
