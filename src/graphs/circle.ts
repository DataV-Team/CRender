import { GraphModel } from '../types/graphs/index'
import { CircleShape } from '../types/graphs/shape'
import { checkPointIsInCircle } from '../utils/graphs'

const circle: GraphModel<CircleShape> = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0,
  },

  validator({ shape }) {
    const { rx, ry, r } = shape

    if (typeof rx !== 'number' || typeof ry !== 'number' || typeof r !== 'number') {
      console.error('CRender Graph Circle: Circle shape configuration is invalid!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape }) {
    const { rx, ry, r } = shape

    ctx.beginPath()
    ctx.arc(rx, ry, r > 0 ? r : 0, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()
  },

  hoverCheck(point, { shape }) {
    return checkPointIsInCircle(point, shape)
  },

  setGraphCenter({ shape, style }) {
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  },

  move({ movementX, movementY }, circle) {
    const { shape } = circle

    circle.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY,
    })
  },
}

export default circle
