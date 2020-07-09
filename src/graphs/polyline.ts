import { PolylineShape } from '../types/graphs/shape'
import { drawPolylinePath } from '../utils/canvas'
import { eliminateBlur, checkPointIsInPolygon, checkPointIsNearPolyline } from '../utils/graphs'
import Graph from '../core/graph.class'
import { GraphConfig, Point } from '../types/core/graph'
import CRender from '../core/crender.class'
import { GraphName } from '../types/graphs'

class Polyline extends Graph<PolylineShape> {
  name: GraphName = 'polyline'

  constructor(config: GraphConfig<PolylineShape>, render: CRender) {
    super(
      Graph.mergeDefaultShape(
        {
          points: [],
          close: false,
        },
        config,
        ({ shape: { points } }) => {
          if (!(points instanceof Array))
            throw new Error('CRender Graph Polyline: Polyline points should be an array!')
        }
      ),
      render
    )
  }

  draw(): void {
    const {
      shape,
      style: { lineWidth },
      render: { ctx },
    } = this
    const { points, close } = shape

    ctx.beginPath()
    drawPolylinePath(ctx, lineWidth === 1 ? eliminateBlur(points) : points)

    if (close) {
      ctx.closePath()

      ctx.fill()
      ctx.stroke()
    } else {
      ctx.stroke()
    }
  }

  hoverCheck(point: Point): boolean {
    const { shape, style } = this
    const { points, close } = shape

    const { lineWidth } = style

    if (close) {
      return checkPointIsInPolygon(point, points)
    } else {
      return checkPointIsNearPolyline(point, points, lineWidth)
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
    } = this

    const moveAfterPoints = points.map(([x, y]) => [x + movementX, y + movementY])

    this.attr('shape', {
      points: moveAfterPoints,
    })
  }
}

export default Polyline
