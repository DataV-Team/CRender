export function drawPolylinePath (ctx, points, beginPath = false, closePath = false) {
  if (!ctx || points.length < 3) return false

  if (beginPath) ctx.beginPath()

  points.forEach((point, i) =>
    point && (i === 0 ? ctx.moveTo(...point) : ctx.lineTo(...point)))

  if (closePath) ctx.closePath()
}

export function drawBezierCurveLinePath (ctx, points, moveTo = false, beginPath = false, closePath = false) {
  if (!ctx || !points) return false

  if (beginPath) ctx.beginPath()

  if (moveTo) ctx.moveTo(...moveTo)

  points.forEach(item => (item && ctx.bezierCurveTo(...item[0], ...item[1], ...item[2])))

  if (closePath) ctx.closePath()
}

export function drawSmoothlinePath (ctx, points, moveTo = false, beginPath = false, closePath = false) {
  if (!ctx || !points) return false

  const canDrawPoints = points.filter(point => point)

  if (canDrawPoints.length < 2) return false

  if (beginPath) ctx.beginPath()

  if (canDrawPoints.length === 2) {
    drawPolylinePath(ctx, canDrawPoints)

    return
  }

  const bezierCurveLineNum = canDrawPoints.length - 1

  const bezierCurvePoints = new Array(bezierCurveLineNum).fill(0).map((t, i) =>
    [...getBezierCurveLineControlPoints(canDrawPoints, i), canDrawPoints[i + 1]])

  drawBezierCurveLinePath(ctx, bezierCurvePoints, moveTo)

  if (closePath) ctx.closePath()
}

export function getBezierCurveLineControlPoints (points, index, close = false, offsetA = 0.25, offsetB = 0.25) {
  const pointNum = points.length

  if (pointNum < 3 || index >= pointNum) return

  let beforePointIndex = index - 1
  beforePointIndex < 0 && (beforePointIndex = (close ? pointNum + beforePointIndex : 0))

  let afterPointIndex = index + 1
  afterPointIndex >= pointNum && (afterPointIndex = (close ? afterPointIndex - pointNum : pointNum - 1))

  let afterNextPointIndex = index + 2
  afterNextPointIndex >= pointNum && (afterNextPointIndex = (close ? afterNextPointIndex - pointNum : pointNum - 1))

  const pointBefore = points[beforePointIndex]
  const pointMiddle = points[index]
  const pointAfter = points[afterPointIndex]
  const pointAfterNext = points[afterNextPointIndex]

  return [
    [
      pointMiddle[0] + offsetA * (pointAfter[0] - pointBefore[0]),
      pointMiddle[1] + offsetA * (pointAfter[1] - pointBefore[1])
    ],
    [
      pointAfter[0] - offsetB * (pointAfterNext[0] - pointMiddle[0]),
      pointAfter[1] - offsetB * (pointAfterNext[1] - pointMiddle[1])
    ]
  ]
}

export default {
  drawPolylinePath,
  drawBezierCurveLinePath,
  drawSmoothlinePath,
  getBezierCurveLineControlPoints
}