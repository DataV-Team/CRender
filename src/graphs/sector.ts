import { GraphModel } from '../types/graphs/index'
import { SectorShape } from '../types/graphs/shape'
import { checkPointIsInSector } from '../utils/graphs'

const sector: GraphModel<SectorShape> = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0,
    startAngle: 0,
    endAngle: 0,
    clockWise: true,
  },

  validator({ shape }) {
    const keys: (keyof SectorShape)[] = ['rx', 'ry', 'r', 'startAngle', 'endAngle']

    if (keys.find(key => typeof shape[key] !== 'number')) {
      console.error('CRender Graph Sector: Sector shape configuration is invalid!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape }) {
    const { rx, ry, r, startAngle, endAngle, clockWise } = shape

    ctx.beginPath()
    ctx.arc(rx, ry, r > 0 ? r : 0, startAngle, endAngle, !clockWise)
    ctx.lineTo(rx, ry)

    ctx.stroke()
    ctx.fill()
  },

  hoverCheck(point, { shape }) {
    return checkPointIsInSector(point, shape)
  },

  setGraphCenter({ shape, style }) {
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  },

  move({ movementX, movementY }, sector) {
    const { rx, ry } = sector.shape

    sector.attr('shape', {
      rx: rx + movementX,
      ry: ry + movementY,
    })
  },
}

export default sector
