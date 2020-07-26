import { RingShape } from '../types/graphs/shape'
import { getTwoPointDistance } from '../utils/graphs'
import Graph from '../core/graph.class'
import { GraphConfig, Point } from '../types/core/graph'

class Ring extends Graph<RingShape> {
  name = 'ring'

  constructor(config: GraphConfig<Partial<RingShape>>) {
    super(
      Graph.mergeDefaultShape(
        {
          rx: 0,
          ry: 0,
          r: 0,
        },
        config,
        ({ shape: { rx, ry, r } }) => {
          if (typeof rx !== 'number' || typeof ry !== 'number' || typeof r !== 'number')
            throw new Error('CRender Graph Ring: Ring shape configuration is invalid!')
        }
      )
    )
  }

  draw(): void {
    const {
      shape,
      render: { ctx },
    } = this
    const { rx, ry, r } = shape

    ctx.beginPath()
    ctx.arc(rx, ry, r > 0 ? r : 0, 0, Math.PI * 2)

    ctx.stroke()
  }

  hoverCheck(point: Point): boolean {
    const { shape, style } = this
    const { rx, ry, r } = shape

    const { lineWidth } = style

    const halfLineWidth = lineWidth / 2

    const minDistance = r - halfLineWidth
    const maxDistance = r + halfLineWidth

    const distance = getTwoPointDistance(point, [rx, ry])

    return distance >= minDistance && distance <= maxDistance
  }

  setGraphCenter(): void {
    const { shape, style } = this
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  }

  move({ movementX, movementY }: MouseEvent): void {
    const { shape } = this

    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY,
    })
  }
}

export default Ring
