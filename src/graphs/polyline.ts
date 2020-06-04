import { GraphModel } from '../types/graphs/index'
import { PolylineShape } from '../types/graphs/shape'
import { drawPolylinePath } from '../utils/canvas'
import { eliminateBlur, checkPointIsInPolygon, checkPointIsNearPolyline } from '../utils/graphs'

const polyline: GraphModel<PolylineShape> = {
  shape: {
    points: [],
    close: false,
  },

  validator({ shape }) {
    const { points } = shape

    if (!(points instanceof Array)) {
      console.error('CRender Graph Polyline: Polyline points should be an array!')

      return false
    }

    return true
  },

  draw({ ctx }, { shape, style: { lineWidth } }) {
    const { points, close } = shape

    ctx.beginPath()
    drawPolylinePath(ctx, lineWidth === 1 ? eliminateBlur(points) : points)

    if (close) {
      ctx.closePath()

      ctx.fill()
      ctx.stroke()
    } else {
      ctx.stroke()
    }
  },

  hoverCheck(point, { shape, style }) {
    const { points, close } = shape

    const { lineWidth } = style

    if (close) {
      return checkPointIsInPolygon(point, points)
    } else {
      return checkPointIsNearPolyline(point, points, lineWidth)
    }
  },

  setGraphCenter({ shape, style }) {
    const { points } = shape

    style.graphCenter = points[0]
  },

  move({ movementX, movementY }, polyline) {
    const { points } = polyline.shape

    const moveAfterPoints = points.map(([x, y]) => [x + movementX, y + movementY])

    polyline.attr('shape', {
      points: moveAfterPoints,
    })
  },
}

export default polyline
