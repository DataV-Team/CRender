import { GraphModel } from '../types/graphs/index'
import { Point } from '../types/core/graph'
import { BezierCurveShape, BezierCurveShapeCache } from '../types/graphs/shape'
import { deepClone } from '../utils/common'
import { drawBezierCurvePath } from '../utils/canvas'
import { checkPointIsInPolygon, checkPointIsNearPolyline } from '../utils/graphs'
import { bezierCurveToPolyline } from '@jiaminghi/bezier-curve'
import { BezierCurveSegment, BezierCurve } from '@jiaminghi/bezier-curve/types/types'

const bezierCurve: GraphModel<BezierCurveShape, BezierCurveShapeCache> = {
  shape: {
    points: [],
    close: false,
  },

  validator({ shape }) {
    const { points } = shape

    if (!(points instanceof Array)) {
      console.error('CRender Graph BezierCurve: BezierCurve points should be an array!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape, cache }) {
    const { points, close } = shape

    if (!cache.points || cache.points.toString() !== points.toString()) {
      const hoverPoints = bezierCurveToPolyline(points as BezierCurve, 20)

      Object.assign(cache, {
        points: deepClone(points),
        hoverPoints,
      })
    }

    ctx.beginPath()

    drawBezierCurvePath(ctx, points.slice(1) as Point[][], points[0])

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

  move({ movementX, movementY }, bezierCurve) {
    const { shape, cache } = bezierCurve
    const { points } = shape

    const [fx, fy] = points[0] as Point
    const curves = points.slice(1)

    const bezierCurvePoints = [
      [fx + movementX, fy + movementY],
      ...(curves as BezierCurveSegment[]).map(curve =>
        curve.map(([x, y]) => [x + movementX, y + movementY])
      ),
    ] as BezierCurve

    cache.points = bezierCurvePoints
    cache.hoverPoints = cache.hoverPoints.map(([x, y]) => [x + movementX, y + movementY])

    bezierCurve.attr('shape', {
      points: bezierCurvePoints,
    })
  },
}

export default bezierCurve
