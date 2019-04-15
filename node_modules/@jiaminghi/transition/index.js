import config from './config'

const defaultTransitionBC = 'linear'

function transition (tBC, begin = false, end = false, frameNum = 30, deep = false) {
  if (!checkParams(...arguments)) return false

  const bezierCurve = getBezierCurve(tBC)

  const frameState = getFrameState(bezierCurve, frameNum)

  if (!deep || typeof end === 'number') return getTransitionState(begin, end, frameState)

  return recursionTransitionState(begin, end, frameState)
}

function checkParams (tBC, begin = false, end = false, frameNum = 30) {
  if (!tBC || begin === false || end === false || !frameNum) {
    console.warn('Transition Missing Parameters!')

    return false
  }

  if (typeof begin !== typeof end) {
    console.warn('Inconsistent Status Types!')

    return false
  }

  const stateType = typeof begin

  if (stateType === 'string' || stateType === 'boolean' || !tBC.length) {
    console.warn('Unsupported Data Type!')

    return false
  }

  return true
}

function getBezierCurve (tBC) {
  let bezierCurve = tBC

  const isString = typeof tBC === 'string'

  if (isString) bezierCurve = config.get(tBC)

  if (!bezierCurve) bezierCurve = config.get(defaultTransitionBC)

  return bezierCurve
}

function getFrameState (bezierCurve, frameNum) {
  const tMinus = 1 / (frameNum - 1)

  const tState = new Array(frameNum).fill(0).map((t, i) => i * tMinus)

  const frameState = tState.map(t => getFrameStateFromT(bezierCurve, t))

  return frameState
}

function getFrameStateFromT (bezierCurve, t) {
  const tBezierCurvePoint = getBezierCurvePointFromT(bezierCurve, t)

  const bezierCurvePointT = getBezierCurvePointTFromReT(tBezierCurvePoint, t)

  return getBezierCurveTState(tBezierCurvePoint, bezierCurvePointT)
}

function getBezierCurvePointFromT (bezierCurve, t) {
  const lastIndex = bezierCurve.length - 1

  let [begin, end] = ['', '']

  bezierCurve.findIndex((item, i) => {
    if (i === lastIndex) return

    begin = item
    end = bezierCurve[i + 1]

    const currentMainPointX = begin[0][0]
    const nextMainPointX = end[0][0]

    return t >= currentMainPointX && t < nextMainPointX
  })

  const p0 = begin[0]
  const p1 = begin[2] || begin[0]
  const p2 = end[1] || end[0]
  const p3 = end[0]

  return [p0, p1, p2, p3]
}

function getBezierCurvePointTFromReT (bezierCurve, t) {
  const reBeginX = bezierCurve[0][0]
  const reEndX = bezierCurve[3][0]

  const xMinus = reEndX - reBeginX

  const tMinus = t - reBeginX

  return tMinus / xMinus
}

function getBezierCurveTState ([[, p0], [, p1], [, p2], [, p3]], t) {
  const { pow } = Math

  const tMinus = 1 - t

  const result1 = p0 * pow(tMinus, 3)

  const result2 = 3 * p1 * t * pow(tMinus, 2)

  const result3 = 3 * p2 * pow(t, 2) * tMinus

  const result4 = p3 * pow(t, 3)

  return 1 - (result1 + result2 + result3 + result4)
}

function getTransitionState (begin, end, frameState) {
  let stateType = 'object'

  if (typeof begin === 'number') stateType = 'number'
  if (begin instanceof Array) stateType = 'array'

  if (stateType === 'number') return getNumberTransitionState(begin, end, frameState)
  if (stateType === 'array') return getArrayTransitionState(begin, end, frameState)
  if (stateType === 'object') return getObjectTransitionState(begin, end, frameState)

  return frameState.map(t => end)
}

function getNumberTransitionState (begin, end, frameState) {
  const minus = end - begin

  return frameState.map(s => begin + minus * s)
}

function getArrayTransitionState (begin, end, frameState) {
  const minus = end.map((v, i) => {
    if (typeof v !== 'number') return false

    return v - begin[i]
  })

  return frameState.map(s =>
    minus.map((v, i) => {
      if (v === false) return end[i]

      return begin[i] + v * s
    }))
}

function getObjectTransitionState (begin, end, frameState) {
  const keys = Object.keys(end)

  const beginValue = keys.map(k => begin[k])
  const endValue = keys.map(k => end[k])

  const arrayState = getArrayTransitionState(beginValue, endValue, frameState)

  return arrayState.map(item => {
    const frameData = {}

    item.forEach((v, i) => (frameData[keys[i]] = v))

    return frameData
  })
}

function recursionTransitionState (begin, end, frameState) {
  const state = getTransitionState(begin, end, frameState)

  for (let key in end) {
    const bTemp = begin[key]
    const eTemp = end[key]

    if (typeof eTemp !== 'object') continue

    const data = recursionTransitionState(bTemp, eTemp, frameState)

    state.forEach((fs, i) => (fs[key] = data[i]))
  }

  return state
}

export function injectNewCurve (name, curve) {
  if (!name || !curve) {
    console.warn('injectNewCurve Missing Parameters!')

    return
  }

  config.set(name, curve)
}

export default transition