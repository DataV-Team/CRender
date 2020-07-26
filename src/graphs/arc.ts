import Graph from '../core/graph.class'
import { ArcShape } from '../types/graphs/shape'
import { checkPointIsInSector } from '../utils/graphs'
import { GraphConfig, Point } from '../types/core/graph'

class Arc extends Graph<ArcShape> {
  name = 'arc'

  constructor(config: GraphConfig<Partial<ArcShape>>) {
    super(
      Graph.mergeDefaultShape(
        {
          rx: 0,
          ry: 0,
          r: 0,
          startAngle: 0,
          endAngle: 0,
          clockWise: true,
        },
        config,
        ({ shape }) => {
          const keys: (keyof ArcShape)[] = ['rx', 'ry', 'r', 'startAngle', 'endAngle']

          if (keys.find(key => typeof shape[key] !== 'number'))
            throw new Error('CRender Graph Arc: Arc shape configuration is invalid!')
        }
      )
    )
  }

  draw(): void {
    const {
      shape,
      render: { ctx },
    } = this

    const { rx, ry, r, startAngle, endAngle, clockWise } = shape

    ctx.beginPath()
    ctx.arc(rx, ry, r > 0 ? r : 0, startAngle, endAngle, !clockWise)

    ctx.stroke()
  }

  hoverCheck(point: Point): boolean {
    const { shape, style } = this

    const { rx, ry, r, startAngle, endAngle, clockWise } = shape

    const { lineWidth } = style

    const halfLineWidth = lineWidth / 2

    const insideRadius = r - halfLineWidth
    const outsideRadius = r + halfLineWidth

    const inSide = checkPointIsInSector(point, {
      rx,
      ry,
      r: insideRadius,
      startAngle,
      endAngle,
      clockWise,
    })

    const outSide = checkPointIsInSector(point, {
      rx,
      ry,
      r: outsideRadius,
      startAngle,
      endAngle,
      clockWise,
    })

    return !inSide && outSide
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

export default Arc
