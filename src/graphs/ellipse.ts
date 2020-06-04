import { GraphModel } from '../types/graphs/index'
import { EllipseShape } from '../types/graphs/shape'
import { getTwoPointDistance } from '../utils/graphs'
import { Point } from '../types/core/graph'

const ellipse: GraphModel<EllipseShape> = {
  shape: {
    rx: 0,
    ry: 0,
    hr: 0,
    vr: 0,
  },

  validator({ shape }) {
    const { rx, ry, hr, vr } = shape

    if (
      typeof rx !== 'number' ||
      typeof ry !== 'number' ||
      typeof hr !== 'number' ||
      typeof vr !== 'number'
    ) {
      console.error('CRender Graph Ellipse: Ellipse shape configuration is invalid!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape }) {
    const { rx, ry, hr, vr } = shape

    ctx.beginPath()
    ctx.ellipse(rx, ry, hr > 0 ? hr : 0, vr > 0 ? vr : 0, 0, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()
  },

  hoverCheck(point, { shape }) {
    const { rx, ry, hr, vr } = shape

    const a = Math.max(hr, vr)
    const b = Math.min(hr, vr)

    const c = Math.sqrt(a * a - b * b)

    const leftFocusPoint: Point = [rx - c, ry]
    const rightFocusPoint: Point = [rx + c, ry]

    const distance =
      getTwoPointDistance(point, leftFocusPoint) + getTwoPointDistance(point, rightFocusPoint)

    return distance <= 2 * a
  },

  setGraphCenter({ shape, style }) {
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  },

  move({ movementX, movementY }, ellipse) {
    const { shape } = ellipse

    ellipse.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY,
    })
  },
}

export default ellipse
