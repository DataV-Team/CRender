import { RectShape } from '../types/graphs/shape'
import { checkPointIsInRect } from '../utils/graphs'
import Graph from '../core/graph.class'
import { GraphConfig, Point } from '../types/core/graph'

class Rect extends Graph<RectShape> {
  name = 'rect'

  constructor(config: GraphConfig<Partial<RectShape>>) {
    super(
      Graph.mergeDefaultShape(
        {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
        },
        config,
        ({ shape: { x, y, w, h } }) => {
          if (
            typeof x !== 'number' ||
            typeof y !== 'number' ||
            typeof w !== 'number' ||
            typeof h !== 'number'
          )
            throw new Error('CRender Graph Rect: Rect shape configuration is invalid!')
        }
      )
    )
  }

  draw(): void {
    const {
      shape,
      render: { ctx },
    } = this
    const { x, y, w, h } = shape

    ctx.beginPath()
    ctx.rect(x, y, w, h)

    ctx.fill()
    ctx.stroke()
  }

  hoverCheck(point: Point): boolean {
    const { shape } = this

    return checkPointIsInRect(point, shape)
  }

  setGraphCenter(): void {
    const { shape, style } = this
    const { x, y, w, h } = shape

    style.graphCenter = [x + w / 2, y + h / 2]
  }

  move({ movementX, movementY }: MouseEvent): void {
    const { shape } = this

    this.attr('shape', {
      x: shape.x + movementX,
      y: shape.y + movementY,
    })
  }
}

export default Rect
