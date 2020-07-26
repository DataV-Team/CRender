import { SectorShape } from '../types/graphs/shape'
import { checkPointIsInSector } from '../utils/graphs'
import Graph from '../core/graph.class'
import { GraphConfig, Point } from '../types/core/graph'

class Sector extends Graph<SectorShape> {
  name = 'sector'

  constructor(config: GraphConfig<Partial<SectorShape>>) {
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
          const keys: (keyof SectorShape)[] = ['rx', 'ry', 'r', 'startAngle', 'endAngle']

          if (keys.find(key => typeof shape[key] !== 'number'))
            throw new Error('CRender Graph Sector: Sector shape configuration is invalid!')
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
    ctx.lineTo(rx, ry)
    ctx.closePath()

    ctx.stroke()
    ctx.fill()
  }

  hoverCheck(point: Point): boolean {
    const { shape } = this

    return checkPointIsInSector(point, shape)
  }

  setGraphCenter(): void {
    const { shape, style } = this
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  }

  move({ movementX, movementY }: MouseEvent): void {
    const { shape } = this
    const { rx, ry } = shape

    this.attr('shape', {
      rx: rx + movementX,
      ry: ry + movementY,
    })
  }
}

export default Sector
