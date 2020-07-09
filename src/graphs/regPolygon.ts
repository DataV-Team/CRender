import { RegPolygonShape, RegPolygonShapeCache } from '../types/graphs/shape'
import { getRegularPolygonPoints, checkPointIsInPolygon } from '../utils/graphs'
import { drawPolylinePath } from '../utils/canvas'
import Graph from '../core/graph.class'
import { GraphConfig, Point } from '../types/core/graph'
import CRender from '../core/crender.class'
import { GraphName } from '../types/graphs'

class RegPolygon extends Graph<RegPolygonShape> {
  name: GraphName = 'regPolygon'

  cache: RegPolygonShapeCache = {}

  constructor(config: GraphConfig<RegPolygonShape>, render: CRender) {
    super(
      Graph.mergeDefaultShape(
        {
          rx: 0,
          ry: 0,
          r: 0,
          side: 0,
        },
        config,
        ({ shape }) => {
          const { side } = shape

          const keys: (keyof RegPolygonShape)[] = ['rx', 'ry', 'r', 'side']

          if (keys.find(key => typeof shape[key] !== 'number'))
            throw new Error('CRender Graph RegPolygon: RegPolygon shape configuration is invalid!')

          if (side! < 3) throw new Error('CRender Graph RegPolygon: RegPolygon at least trigon!')
        }
      ),
      render
    )
  }

  draw(): void {
    const {
      shape,
      cache,
      render: { ctx },
    } = this
    const { rx, ry, r, side } = shape

    if (
      cache.points ||
      cache.rx !== rx ||
      cache.ry !== ry ||
      cache.r !== r ||
      cache.side !== side
    ) {
      const points = getRegularPolygonPoints(shape)

      Object.assign(cache, { points, rx, ry, r, side })
    }

    const { points } = cache!

    ctx.beginPath()
    drawPolylinePath(ctx, points!)

    ctx.stroke()
    ctx.fill()
  }

  hoverCheck(point: Point): boolean {
    const { points } = this.cache!

    return checkPointIsInPolygon(point, points!)
  }

  setGraphCenter(): void {
    const { shape, style } = this
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  }

  move({ movementX, movementY }: MouseEvent): void {
    const { shape, cache } = this
    const { rx, ry } = shape

    cache.rx! += movementX
    cache.ry! += movementY

    this.attr('shape', {
      rx: rx + movementX,
      ry: ry + movementY,
    })

    cache.points = cache.points!.map(([x, y]) => [x + movementX, y + movementY])
  }
}

export default RegPolygon
