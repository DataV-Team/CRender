import { GraphModel } from '../types/graphs/index'
import { RingShape } from '../types/graphs/shape'
import { getTwoPointDistance } from '../utils/graphs'

const ring: GraphModel<RingShape> = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0,
  },

  validator({ shape }) {
    const { rx, ry, r } = shape

    if (typeof rx !== 'number' || typeof ry !== 'number' || typeof r !== 'number') {
      console.error('CRender Graph Ring: Ring shape configuration is invalid!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape }) {
    const { rx, ry, r } = shape

    ctx.beginPath()
    ctx.arc(rx, ry, r > 0 ? r : 0, 0, Math.PI * 2)

    ctx.stroke()
  },

  hoverCheck(point, { shape, style }) {
    const { rx, ry, r } = shape

    const { lineWidth } = style

    const halfLineWidth = lineWidth / 2

    const minDistance = r - halfLineWidth
    const maxDistance = r + halfLineWidth

    const distance = getTwoPointDistance(point, [rx, ry])

    return distance >= minDistance && distance <= maxDistance
  },

  setGraphCenter({ shape, style }) {
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  },

  move({ movementX, movementY }, ring) {
    const { shape } = ring

    ring.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY,
    })
  },
}

export default ring
