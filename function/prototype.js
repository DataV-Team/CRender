import { deepClone } from '../extend/methods'

import { tranColorAttrToRgbaValue, rgbaValueToColor } from '../config/style'

import style from '../config/style'

import elements from '../config/elements'

import baseAttr from '../config/baseAttr'

import elementExtend from './instance'

function add (config = {}) {
  const { name } = config

  if (!name) {
    console.warn('Missing parameters!')

    return
  }

  const element = elements.get(name)

  if (!element) {
    console.warn('No corresponding graphic configuration found!')

    return
  }

  const mixinElement = getMixinElement(element, config)

  if (!validatorCheck(mixinElement)) return

  this.initAttribute(mixinElement)

  addElementExtend(mixinElement)

  mixinElement.init()

  this.elements.push(mixinElement)

  this.drawAllGraph()

  this.rankElementsByIndex()

  return mixinElement
}

function getMixinElement (element, config) {
  const clonedElement = deepClone(element, true)

  const clonedShape = deepClone(element.shape)
  const clonedStyle = deepClone(style)

  const clonedBaseAttr = deepClone(baseAttr)

  Object.assign(clonedShape, config.shape || {})
  Object.assign(clonedStyle, config.style || {})

  config.shape = clonedShape
  config.style = clonedStyle

  const mixinElement = {}

  Object.assign(mixinElement, clonedBaseAttr, clonedElement, config)

  tranColorAttrToRgbaValue(mixinElement.style)

  return mixinElement
}

function validatorCheck (element) {
  const { shape, style } = element

  if (typeof element.validator === 'function' && !element.validator(shape, style)) {
    console.warn('Invalid configuration!')

    return false
  }

  return true
}

function initAttribute (element) {
  element.render = this
  element.animationRoot = []
  element.animationKeys = []
  element.animationFrameState = []

  return element
}

function addElementExtend (element) {
  const extendKeys = Object.keys(elementExtend)

  extendKeys.forEach(key => element[key] = elementExtend[key])

  return element
}

function clearArea () {
  const { ctx, area } = this

  ctx.clearRect(0, 0, ...area)
}

function drawAllGraph () {
  const { elements } = this

  const visibleElements = elements.filter(ele => ele.inVisible).reverse()

  this.clearArea()

  visibleElements.forEach(ele => ele.doDraw())
}

function doAnimation () {
  const { animationStatus } = this

  if (animationStatus) return

  this.animationStatus = true

  return new Promise(resolve => {

    this.animations(e => {
      this.animationStatus = false

      resolve()
    })

  })
}

function checkAnimationAble (elements) {
  return elements.find(ele => !ele.pause && ele.animationFrameState.length)
}

function animations (callback) {
  const { elements } = this

  if (!checkAnimationAble(elements)) {
    callback()

    return
  }

  elements.forEach(ele => ele.turnToNextFrame())

  this.drawAllGraph()

  requestAnimationFrame(this.animations.bind(this, callback))
}

function rankElementsByIndex () {
  const { elements } = this

  elements.sort((a, b) => {
    if (a.index > b.index) return -1
    if (a.index === b.index) return 0
    if (a.index < b.index) return 1
  })
}

function mouseMove (e) {
  this.hoverElement &&
    this.hoverElement.dragAble &&
      this.hoverElement.dragging &&
        typeof this.hoverElement.doDrag === 'function' &&
          this.hoverElement.doDrag(e)

  const { offsetX, offsetY } = e

  const { elements } = this

  const mousePos = [offsetX, offsetY]

  const hoverAbleElements = elements.filter(ele => ele.hoverAble && ele.hoverCheck)

  const hoverElement = hoverAbleElements.find(ele => ele.doHoverCheck(mousePos))

  this.lastMousePosition = mousePos

  this.setCurrentHoverElement(hoverElement, e)
}

function mouseDown (e) {
  if (this.hoverElement) this.hoverElementMouseDownTimer = (new Date()).getTime()

  this.hoverElement &&
    this.hoverElement.dragAble &&
      (this.hoverElement.dragging = true)
}

function mouseUp (e) {
  const timer = (new Date()).getTime()

  this.hoverElement &&
    this.hoverElementMouseDownTimer &&
      (timer - this.hoverElementMouseDownTimer < 200) &&
        typeof this.hoverElement.onClick === 'function' &&
          this.hoverElement.onClick(e)

  this.hoverElement && (this.hoverElement.dragging = false)
}

function setCurrentHoverElement (hoverElement = false, e) {
  if (hoverElement && hoverElement.hovered) return hoverElement

  if ((!hoverElement && this.hoverElement) || (hoverElement && this.hoverElement)) {
    typeof this.hoverElement.mouseOuter === 'function' && this.hoverElement.mouseOuter(e)

    this.hoverElement.hovered = false

    this.hoverElement = ''

    document.body.style.cursor = 'default'
  }

  if (!hoverElement) return ''

  hoverElement.hovered = true

  typeof hoverElement.mouseEnter === 'function' && hoverElement.mouseEnter(e)

  this.hoverElement = hoverElement

  document.body.style.cursor = hoverElement.style.hoverCursor || 'default'

  return hoverElement
}

function initGraphStyle (style) {
  const { ctx } = this

  const { fill, stroke, shadowColor, opacity } = style

  ctx.fillStyle = rgbaValueToColor(fill, opacity)
  ctx.strokeStyle = rgbaValueToColor(stroke, opacity)
  ctx.shadowColor = rgbaValueToColor(shadowColor, opacity)

  const { lineCap, lineDash, lineDashOffset } = style

  ctx.lineCap = lineCap
  ctx.setLineDash(lineDash || [10, 0])
  ctx.lineDashOffset = lineDashOffset

  const { shadowBlur, shadowOffsetX, shadowOffsetY } = style

  ctx.shadowBlur = shadowBlur > 0 ? shadowBlur : 0.1
  ctx.shadowOffsetX = shadowOffsetX
  ctx.shadowOffsetY = shadowOffsetY

  const { lineWidth } = style

  ctx.lineWidth = lineWidth
}

function initTransform (style) {
  const { ctx } = this

  ctx.save()

  const { graphOrigin, rotate, scale, translate } = style

  if (!(graphOrigin instanceof Array)) return

  ctx.translate(...graphOrigin)

  if (rotate) ctx.rotate(rotate * Math.PI / 180)

  if (scale instanceof Array) ctx.scale(...scale)

  if (translate) ctx.translate(...translate)

  ctx.translate(-graphOrigin[0], -graphOrigin[1])
}

function restoreTransform (style) {
  const { ctx } = this

  ctx.restore()
}

function deleteAllElements () {
  this.elements = []

  this.drawAllGraph()
}

function deleteElement (element) {
  const { elements } = this

  const index = elements.findIndex(ele => ele === element)

  if (index === -1) return

  elements.splice(index, 1)
  
  this.drawAllGraph()
}

const prototypes = {
  add,
  initAttribute,
  clearArea,
  drawAllGraph,
  doAnimation,
  animations,
  rankElementsByIndex,
  mouseMove,
  mouseDown,
  mouseUp,
  setCurrentHoverElement,
  initGraphStyle,
  initTransform,
  restoreTransform,
  deleteAllElements,
  deleteElement
}

export default function extendPrototype (cl) {
  const prototypeKeys = Object.keys(prototypes)

  prototypeKeys.forEach(key => cl.prototype[key] = prototypes[key])
}