import { GraphModel } from '../types/graphs/index'
import { RegPolygonShape, RegPolygonShapeCache } from '../types/graphs/shape'
import { getRegularPolygonPoints, checkPointIsInPolygon } from '../utils/graphs'
import { drawPolylinePath } from '../utils/canvas'

const regPolygon: GraphModel<RegPolygonShape, RegPolygonShapeCache> = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0,
    side: 0,
  },

  validator({ shape }) {
    const { side } = shape

    const keys: (keyof RegPolygonShape)[] = ['rx', 'ry', 'r', 'side']

    if (keys.find(key => typeof shape[key] !== 'number')) {
      console.error('CRender Graph RegPolygon: RegPolygon shape configuration is invalid!')

      return false
    }

    if (side < 3) {
      console.error('CRender Graph RegPolygon: RegPolygon at least trigon!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape, cache }) {
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
  },

  hoverCheck(point, { cache }) {
    const { points } = cache!

    return checkPointIsInPolygon(point, points!)
  },

  setGraphCenter({ shape, style }) {
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  },

  move({ movementX, movementY }, regPolygon) {
    const { shape, cache } = regPolygon
    const { rx, ry } = shape

    cache.rx! += movementX
    cache.ry! += movementY

    regPolygon.attr('shape', {
      rx: rx + movementX,
      ry: ry + movementY,
    })

    cache.points = cache.points!.map(([x, y]) => [x + movementX, y + movementY])
  },
}

export default regPolygon
