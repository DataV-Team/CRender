import { GraphModel } from '../types/graphs/index'
import { RectShape } from '../types/graphs/shape'
import { checkPointIsInRect } from '../utils/graphs'

const rect: GraphModel<RectShape> = {
  shape: {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  },

  validator({ shape }) {
    const { x, y, w, h } = shape

    if (
      typeof x !== 'number' ||
      typeof y !== 'number' ||
      typeof w !== 'number' ||
      typeof h !== 'number'
    ) {
      console.error('CRender Graph Rect: Rect shape configuration is invalid!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape }) {
    const { x, y, w, h } = shape

    ctx.beginPath()
    ctx.rect(x, y, w, h)

    ctx.fill()
    ctx.stroke()
  },

  hoverCheck(point, { shape }) {
    return checkPointIsInRect(point, shape)
  },

  setGraphCenter({ shape, style }) {
    const { x, y, w, h } = shape

    style.graphCenter = [x + w / 2, y + h / 2]
  },

  move({ movementX, movementY }, rect) {
    const { shape } = rect

    rect.attr('shape', {
      x: shape.x + movementX,
      y: shape.y + movementY,
    })
  },
}

export default rect
