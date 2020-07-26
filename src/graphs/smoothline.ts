import { Point, GraphConfig } from '../types/core/graph'
import { SmoothlineShape, SmoothlineShapeCache } from '../types/graphs/shape'
import { deepClone } from '../utils/common'
import { drawBezierCurvePath } from '../utils/canvas'
import { checkPointIsInPolygon, checkPointIsNearPolyline } from '../utils/graphs'
import Graph from '../core/graph.class'
import { polylineToBezierCurve, bezierCurveToPolyline } from '@jiaminghi/bezier-curve'
import { BezierCurveSegment, BezierCurve } from '@jiaminghi/bezier-curve/types/types'

class Smoothline extends Graph<SmoothlineShape> {
  name = 'smoothline'

  private cache: SmoothlineShapeCache = {}

  constructor(config: GraphConfig<Partial<SmoothlineShape>>) {
    super(
      Graph.mergeDefaultShape(
        {
          points: [],
          close: false,
        },
        config,
        ({ shape: { points } }) => {
          if (!(points instanceof Array))
            throw new Error('CRender Graph Smoothline: Smoothline points should be an array!')
        }
      )
    )
  }

  draw(): void {
    const {
      shape,
      cache,
      render: { ctx },
    } = this
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

    drawBezierCurvePath(ctx, bezierCurve!.slice(1) as Point[][], bezierCurve![0])

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
    const {
      shape: { points },
      style,
    } = this

    style.graphCenter = points[0]
  }

  move({ movementX, movementY }: MouseEvent): void {
    const { shape, cache } = this
    const { points } = shape

    const moveAfterPoints = points.map<Point>(([x, y]) => [x + movementX, y + movementY])

    cache.points = moveAfterPoints

    const [fx, fy] = cache.bezierCurve![0]
    const curves = cache.bezierCurve!.slice(1)

    cache.bezierCurve = [
      [fx + movementX, fy + movementY],
      ...(curves as BezierCurveSegment[]).map(curve =>
        curve.map<Point>(([x, y]) => [x + movementX, y + movementY])
      ),
    ] as BezierCurve

    cache.hoverPoints = cache.hoverPoints!.map(([x, y]) => [x + movementX, y + movementY])

    this.attr('shape', {
      points: moveAfterPoints,
    })
  }
}

export default Smoothline
