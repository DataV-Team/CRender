import { EllipseShape } from '../types/graphs/shape'
import { getTwoPointDistance } from '../utils/graphs'
import { Point, GraphConfig } from '../types/core/graph'
import Graph from '../core/graph.class'
import { Optional } from '../types/common'

class Ellipse extends Graph<EllipseShape> {
  name = 'ellipse'

  constructor(config: GraphConfig<Optional<EllipseShape>>) {
    super(
      Graph.mergeDefaultShape(
        {
          rx: 0,
          ry: 0,
          hr: 0,
          vr: 0,
        },
        config,
        ({ shape: { rx, ry, hr, vr } }) => {
          if (
            typeof rx !== 'number' ||
            typeof ry !== 'number' ||
            typeof hr !== 'number' ||
            typeof vr !== 'number'
          )
            throw new Error('CRender Graph Ellipse: Ellipse shape configuration is invalid!')
        }
      )
    )
  }

  draw(): void {
    const {
      shape,
      render: { ctx },
    } = this
    const { rx, ry, hr, vr } = shape

    ctx.beginPath()
    ctx.ellipse(rx, ry, hr > 0 ? hr : 0, vr > 0 ? vr : 0, 0, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()
  }

  hoverCheck(point: Point): boolean {
    const { shape } = this
    const { rx, ry, hr, vr } = shape

    const a = Math.max(hr, vr)
    const b = Math.min(hr, vr)

    const c = Math.sqrt(a * a - b * b)

    const leftFocusPoint: Point = [rx - c, ry]
    const rightFocusPoint: Point = [rx + c, ry]

    const distance =
      getTwoPointDistance(point, leftFocusPoint) + getTwoPointDistance(point, rightFocusPoint)

    return distance <= 2 * a
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

export default Ellipse
