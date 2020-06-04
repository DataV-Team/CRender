import { GraphModel } from '../types/graphs/index'
import { ArcShape } from '../types/graphs/shape'
import { checkPointIsInSector } from '../utils/graphs'

const arc: GraphModel<ArcShape> = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0,
    startAngle: 0,
    endAngle: 0,
    clockWise: true,
  },

  validator({ shape }) {
    const keys: (keyof ArcShape)[] = ['rx', 'ry', 'r', 'startAngle', 'endAngle']

    if (keys.find(key => typeof shape[key] !== 'number')) {
      console.error('CRender Graph Arc: Arc shape configuration is invalid!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape }) {
    const { rx, ry, r, startAngle, endAngle, clockWise } = shape

    ctx.beginPath()
    ctx.arc(rx, ry, r > 0 ? r : 0, startAngle, endAngle, !clockWise)

    ctx.stroke()
  },

  hoverCheck(point, { shape, style }) {
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
  },

  setGraphCenter({ shape, style }) {
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  },

  move({ movementX, movementY }, arc) {
    const { shape } = arc

    arc.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY,
    })
  },
}

export default arc
