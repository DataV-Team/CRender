import { Point, GraphConfig } from '../types/core/graph'
import { BezierCurveShape, BezierCurveShapeCache } from '../types/graphs/shape'
import { deepClone } from '../utils/common'
import { drawBezierCurvePath } from '../utils/canvas'
import { checkPointIsInPolygon, checkPointIsNearPolyline } from '../utils/graphs'
import Graph from '../core/graph.class'
import { bezierCurveToPolyline } from '@jiaminghi/bezier-curve'
import {
  BezierCurveSegment,
  BezierCurve as BezierCurveType,
} from '@jiaminghi/bezier-curve/types/types'

class BezierCurve extends Graph<BezierCurveShape> {
  name = 'bezierCurve'

  private cache: BezierCurveShapeCache = {}

  constructor(config: GraphConfig<Partial<BezierCurveShape>>) {
    super(
      Graph.mergeDefaultShape(
        {
          points: [],
          close: false,
        },
        config,
        ({ shape: { points } }) => {
          if (!(points instanceof Array))
            throw new Error('CRender Graph BezierCurve: BezierCurve points should be an array!')
        }
      )
    )
  }

  draw(): void {
    const { shape, cache, render } = this
    const { points, close } = shape
    const { ctx } = render

    if (!cache.points || cache.points.toString() !== points.toString()) {
      const hoverPoints = bezierCurveToPolyline(points as BezierCurveType, 20)

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
  }

  hoverCheck(point: Point): boolean {
    const { cache, shape, style } = this
    const { hoverPoints } = cache
    const { close } = shape
    const { lineWidth } = style

    if (close) {
      return checkPointIsInPolygon(point, hoverPoints!)
    } else {
      return checkPointIsNearPolyline(point, hoverPoints!, lineWidth)
    }
  }

  setGraphCenter(): void {
    const { shape, style } = this
    const { points } = shape

    style.graphCenter = points[0]
  }

  move({ movementX, movementY }: MouseEvent): void {
    const {
      shape: { points },
      cache,
    } = this

    const [fx, fy] = points[0] as Point
    const curves = points.slice(1)

    const bezierCurvePoints = [
      [fx + movementX, fy + movementY],
      ...(curves as BezierCurveSegment[]).map(curve =>
        curve.map(([x, y]) => [x + movementX, y + movementY])
      ),
    ] as BezierCurveType

    cache.points = bezierCurvePoints
    cache.hoverPoints = cache.hoverPoints!.map(([x, y]) => [x + movementX, y + movementY])

    this.attr('shape', {
      points: bezierCurvePoints,
    })
  }
}

export default BezierCurve
