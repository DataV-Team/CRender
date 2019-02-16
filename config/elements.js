import { checkPointIsInCircle, checkPointIsInPolygon, getDistanceBetweenPointAndLine, getCircleRadianPoint } from '../extend/methods'

import { checkPointIsInSector, getRegularPolygonPoints, getTwoPointDistance } from '../extend/methods'

import { drawPolylinePath, drawSmoothlinePath } from '../extend/canvas'

export const circle = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0
  },

  validator (shape, style) {
    const { rx, ry, r } = shape

    if (typeof rx !== 'number' || typeof ry !== 'number' || typeof r !== 'number') {
      console.warn('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    const { rx, ry, r } = shape

    ctx.arc(rx, ry, r, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (pos, shape, style) {
    const { rx, ry, r } = shape

    return checkPointIsInCircle(rx, ry, r, pos)
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

export const ring = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0
  },

  validator (shape, style) {
    const { rx, ry, r } = shape

    if (typeof rx !== 'number' || typeof ry !== 'number' || typeof r !== 'number') {
      console.warn('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    const { rx, ry, r } = shape

    ctx.arc(rx, ry, r, 0, Math.PI * 2)

    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (pos, shape, style) {
    const { rx, ry, r } = shape

    const { lineWidth } = style

    const halfLineWidth = lineWidth / 2

    const minDistance = r - halfLineWidth
    const maxDistance = r + halfLineWidth

    const distance = getTwoPointDistance(pos, [rx, ry])

    return (distance >= minDistance && distance <= maxDistance)
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

export const ellipse = {
  shape: {
    rx: 0,
    ry: 0,
    hr: 0,
    vr: 0
  },

  validator (shape, style) {
    const { rx, ry, hr, vr } = shape

    if (typeof rx !== 'number' || typeof ry !== 'number' || typeof hr !== 'number' || typeof vr !== 'number') {
      console.warn('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { rx, ry, hr, vr } = shape

    ctx.ellipse(rx, ry, hr, vr, 0, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (pos, shape, style) {
    const { rx, ry, hr, vr } = shape

    const a = Math.max(hr, vr)
    const b = Math.min(hr, vr)

    const c = Math.sqrt(a * a - b * b)

    const leftFocusPoint = [rx - c, ry]
    const rightFocusPoint = [rx + c, ry]

    const distance = getTwoPointDistance(pos, leftFocusPoint) + getTwoPointDistance(pos, rightFocusPoint)

    return distance <= 2 * a
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

export const rect = {
  shape: {
    x: 0,
    y: 0,
    w: 0,
    h: 0
  },

  validator (shape, style) {
    const { x, y, w, h } = shape

    if (typeof x !== 'number' || typeof y !== 'number' || typeof w !== 'number' || typeof h !== 'number') {
      console.warn('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { x, y, w, h } = shape

    ctx.rect(x, y, w, h)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck ([px, py], shape, style) {
    let { x, y, w, h } = shape

    if (px < x) return false
    if (py < y) return false

    if (px > x + w) return false
    if (py > y + h) return false

    return true
  },

  setGraphOrigin (shape, style) {
    const { x, y, w, h } = shape

    style.graphOrigin = [x + w / 2, y + h / 2]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      x: shape.x + movementX,
      y: shape.y + movementY
    })
  }
}

export const polygon = {
  shape: {
    points: []
  },

  validator (shape, style) {
    const { points } = shape

    if (!(points instanceof Array)) {
      console.warn('Points should be an array!')

      return false
    }

    if (points.length < 3) {
      console.warn('The length of points should be no less than 3!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { points } = shape

    drawPolylinePath(ctx, points)

    ctx.closePath()

    ctx.fill()
    ctx.stroke()
  },

  hoverCheck (point, shape, style) {
    let { points } = shape

    return checkPointIsInPolygon(point, points)
  },

  setGraphOrigin (shape, style) {
    const { points } = shape

    style.graphOrigin = points[0]
  },

  drag ({movementX, movementY}, shape, style) {
    const { points } = shape

    const moveAfterPoints = points.map(([x, y]) => [x + movementX, y + movementY])

    this.attr('shape', {
      points: moveAfterPoints
    })
  }
}

export const polyline = {
  shape: {
    points: []
  },

  validator (shape, style) {
    const { points } = shape

    if (!(points instanceof Array)) {
      console.warn('Points should be an array!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { points } = shape

    drawPolylinePath(ctx, points)

    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (point, shape, style) {
    let { points } = shape

    const lineNum = points.length - 1

    const { lineWidth } = style

    const minus = lineWidth / 2

    const [x, y] = point

    const { max, min } = Math

    if (lineNum === 0) return false

    const lines = new Array(lineNum).fill('').map((t, i) => [points[i], points[i + 1]])

    const result = lines.find(line => {
      const xB = line[0][0]
      const xE = line[1][0]

      const yB = line[0][1]
      const yE = line[1][1]

      if (x > max(xB, xE) || x < min(xB, xE)) return false

      if (y > max(yB, yE) || y < min(yB, yE)) return false

      return getDistanceBetweenPointAndLine(point, ...line) < minus
    })

    return result
  },

  setGraphOrigin (shape, style) {
    const { points } = shape

    style.graphOrigin = points[0]
  },

  drag ({movementX, movementY}, shape, style) {
    const { points } = shape

    const moveAfterPoints = points.map(([x, y]) => [x + movementX, y + movementY])

    this.attr('shape', {
      points: moveAfterPoints
    })
  }
}

export const sector = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0,
    startAngle: 0,
    endAngle: 0,
    clockWise: true
  },

  validator (shape, style) {
    const { rx, ry, r, startAngle, endAngle } = shape

    const keys = ['rx', 'ry', 'r', 'startAngle', 'endAngle']

    if (keys.find(key => typeof shape[key] !== 'number')) {
      console.warn('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    const { rx, ry, r, startAngle, endAngle, clockWise } = shape

    ctx.arc(rx, ry, r, startAngle, endAngle, !clockWise)

    ctx.lineTo(rx, ry)

    ctx.closePath()

    ctx.stroke()
    ctx.fill()
  },

  hoverCheck (point, shape, style) {
    const { rx, ry, r, startAngle, endAngle, clockWise } = shape

    return checkPointIsInSector(point, rx, ry, r, startAngle, endAngle, clockWise)
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    const { rx, ry } = shape

    this.attr('shape', {
      rx: rx + movementX,
      ry: ry + movementY
    })
  }
}

export const arc = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0,
    startAngle: 0,
    endAngle: 0,
    clockWise: true
  },

  validator (shape, style) {
    const { rx, ry, r, startAngle, endAngle } = shape

    const keys = ['rx', 'ry', 'r', 'startAngle', 'endAngle']

    if (keys.find(key => typeof shape[key] !== 'number')) {
      console.warn('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    const { rx, ry, r, startAngle, endAngle, clockWise } = shape

    ctx.arc(rx, ry, r, startAngle, endAngle, !clockWise)

    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (point, shape, style) {
    const { rx, ry, r, startAngle, endAngle, clockWise } = shape

    const { lineWidth } = style

    const halfLineWidth = lineWidth / 2

    const insideRadius = r - halfLineWidth
    const outsideRadius = r + halfLineWidth

    return !checkPointIsInSector(point, rx, ry, insideRadius, startAngle, endAngle, clockWise) &&
    checkPointIsInSector(point, rx, ry, outsideRadius, startAngle, endAngle, clockWise)
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

export const regPolygon = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0,
    side: 0
  },

  validator (shape, style) {
    const { rx, ry, r, side } = shape

    const keys = ['rx', 'ry', 'r', 'side']

    if (keys.find(key => typeof shape[key] !== 'number')) {
      console.warn('Shape configuration is abnormal!')

      return false
    }

    if (side < 3) {
      console.warn('At least trigon!')

      return false
    }

    return true
  },

  draw (ctx, shape, style, element) {
    ctx.beginPath()

    const { rx, ry, r, side } = shape

    const { drawData } = element

    if (!drawData || drawData.rx !== rx || drawData.ry !== ry || drawData.r !== r || drawData.side !== side ) {

      const points = getRegularPolygonPoints(rx, ry, r, side)

      element.drawData = { points, rx, ry, r, side }
    }

    const { drawData: { points } } = element

    drawPolylinePath(ctx, points)

    ctx.closePath()

    ctx.stroke()
    ctx.fill()
  },

  hoverCheck (point, shape, style, element) {
    let { drawData: { points } } = element

    return checkPointIsInPolygon(point, points)
  },

  setGraphOrigin (shape, style) {
    const { rx, ry } = shape

    style.graphOrigin = [rx, ry]
  },

  drag ({movementX, movementY}, shape, style) {
    const { rx, ry } = shape

    this.attr('shape', {
      rx: rx + movementX,
      ry: ry + movementY
    })
  }
}

export const smoothline = {
  shape: {
    points: []
  },

  validator (shape, style) {
    const { points } = shape

    if (!(points instanceof Array)) {
      console.warn('Points should be an array!')

      return false
    }

    return true
  },

  draw (ctx, shape, style) {
    ctx.beginPath()

    let { points } = shape

    const first = points.find(point => point)

    drawSmoothlinePath(ctx, points, first)

    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (point, shape, style) {
    let { points } = shape

    const lineNum = points.length - 1

    const { lineWidth } = style

    const minus = lineWidth / 2

    const [x, y] = point

    const { max, min } = Math

    if (lineNum === 0) return false

    const lines = new Array(lineNum).fill('').map((t, i) => [points[i], points[i + 1]])

    const result = lines.find(line => {
      const xB = line[0][0]
      const xE = line[1][0]

      const yB = line[0][1]
      const yE = line[1][1]

      if (x > max(xB, xE) || x < min(xB, xE)) return false

      if (y > max(yB, yE) || y < min(yB, yE)) return false

      return getDistanceBetweenPointAndLine(point, ...line) < minus
    })

    return result
  },

  setGraphOrigin (shape, style) {
    const { points } = shape

    style.graphOrigin = points[0]
  },

  drag ({movementX, movementY}, shape, style) {
    const { points } = shape

    const moveAfterPoints = points.map(([x, y]) => [x + movementX, y + movementY])

    this.attr('shape', {
      points: moveAfterPoints
    })
  }
}


const elements = new Map([
  ['circle', circle],
  ['ellipse', ellipse],
  ['rect', rect],
  ['polygon', polygon],
  ['ring', ring],
  ['polyline', polyline],
  ['sector', sector],
  ['arc', arc],
  ['regPolygon', regPolygon],
  ['smoothline', smoothline]
])

export default elements

export function extendNewElement (name, config) {
  if (!name || !curve) {
    console.warn('extendNewElement Missing Parameters!')

    return
  }

  config.set(name, config)
}