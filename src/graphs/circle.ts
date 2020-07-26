import { CircleShape } from '../types/graphs/shape'
import { checkPointIsInCircle } from '../utils/graphs'
import Graph from '../core/graph.class'
import { GraphConfig, Point } from '../types/core/graph'

class Circle extends Graph<CircleShape> {
  name = 'circle'

  constructor(config: GraphConfig<Partial<CircleShape>>) {
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
            throw new Error('CRender Graph Circle: Circle shape configuration is invalid!')
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

    ctx.fill()
    ctx.stroke()
  }

  hoverCheck(point: Point): boolean {
    const { shape } = this

    return checkPointIsInCircle(point, shape)
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

export default Circle
