import { getRgbaValue, getColorFromRgbValue } from '@jiaminghi/color'

/**
 * @description Class Style
 * @param {Object} style  Style configuration
 * @return {Style} Instance of Style
 */
export default class Style {
  constructor (style) {
    this.colorProcessor(style)

    const defaultStyle = {
      /**
       * @description Rgba value of graph fill color 
       * @type {Array}
       * @default fill = [0, 0, 0, 1]
       */
      fill: [0, 0, 0, 1],
      /**
       * @description Rgba value of graph stroke color 
       * @type {Array}
       * @default stroke = [0, 0, 0, 1]
       */
      stroke: [0, 0, 0, 0],
      /**
       * @description Opacity of graph
       * @type {Number}
       * @default opacity = 1
       */
      opacity: 1,
      /**
       * @description LineCap of Ctx
       * @type {String}
       * @default lineCap = null
       * @example lineCap = 'butt'|'round'|'square'
       */
      lineCap: null,
      /**
       * @description Linejoin of Ctx
       * @type {String}
       * @default lineJoin = null
       * @example lineJoin = 'round'|'bevel'|'miter'
       */
      lineJoin: null,
      /**
       * @description LineDash of Ctx
       * @type {Array}
       * @default lineDash = null
       * @example lineDash = [10, 10]
       */
      lineDash: null,
      /**
       * @description LineDashOffset of Ctx
       * @type {Number}
       * @default lineDashOffset = null
       * @example lineDashOffset = 10
       */
      lineDashOffset: null,
      /**
       * @description ShadowBlur of Ctx
       * @type {Number}
       * @default shadowBlur = 0
       */
      shadowBlur: 0,
      /**
       * @description Rgba value of graph shadow color 
       * @type {Array}
       * @default shadowColor = [0, 0, 0, 0]
       */
      shadowColor: [0, 0, 0, 0],
      /**
       * @description ShadowOffsetX of Ctx
       * @type {Number}
       * @default shadowOffsetX = 0
       */
      shadowOffsetX: 0,
      /**
       * @description ShadowOffsetY of Ctx
       * @type {Number}
       * @default shadowOffsetY = 0
       */
      shadowOffsetY: 0,
      /**
       * @description LineWidth of Ctx
       * @type {Number}
       * @default lineWidth = 0
       */
      lineWidth: 0,
      /**
       * @description Stroke width is not scaled
       * @type {Boolean}
       * @default strokeNoScale = false
       */
      strokeNoScale: false,
      /**
       * @description Center point of the graph
       * @type {Array}
       * @default graphCenter = null
       * @example graphCenter = [10, 10]
       */
      graphCenter: null,
      /**
       * @description Graph scale
       * @type {Array}
       * @default scale = null
       * @example scale = [1.5, 1.5]
       */
      scale: null,
      /**
       * @description Graph rotation degree
       * @type {Number}
       * @default rotate = null
       * @example rotate = 10
       */
      rotate: null,
      /**
       * @description Graph translate distance
       * @type {Array}
       * @default translate = null
       * @example translate = [10, 10]
       */
      translate: null,
      /**
       * @description Cursor status when hover
       * @type {String}
       * @default hoverCursor = 'pointer'
       * @example hoverCursor = 'default'|'pointer'|'auto'|'crosshair'|'move'|'wait'|...
       */
      hoverCursor: 'pointer',
      /**
       * @description Font style of Ctx
       * @type {String}
       * @default fontStyle = 'normal'
       * @example fontStyle = 'normal'|'italic'|'oblique'
       */
      fontStyle: 'normal',
      /**
       * @description Font varient of Ctx
       * @type {String}
       * @default fontVarient = 'normal'
       * @example fontVarient = 'normal'|'small-caps'
       */
      fontVarient: 'normal',
      /**
       * @description Font weight of Ctx
       * @type {String|Number}
       * @default fontWeight = 'normal'
       * @example fontWeight = 'normal'|'bold'|'bolder'|'lighter'|Number
       */
      fontWeight: 'normal',
      /**
       * @description Font size of Ctx
       * @type {Number}
       * @default fontSize = 10
       */
      fontSize: 10,
      /**
       * @description Font family of Ctx
       * @type {String}
       * @default fontFamily = 'Arial'
       */
      fontFamily: 'Arial',
      /**
       * @description TextAlign of Ctx
       * @type {String}
       * @default textAlign = 'center'
       * @example textAlign = 'start'|'end'|'left'|'right'|'center'
       */
      textAlign: 'center',
      /**
       * @description TextBaseline of Ctx
       * @type {String}
       * @default textBaseline = 'middle'
       * @example textBaseline = 'top'|'bottom'|'middle'|'alphabetic'|'hanging'
       */
      textBaseline: 'middle'
    }

    Object.assign(this, defaultStyle, style)
  }
}

const colorProcessorKeys = ['fill', 'stroke', 'shadowColor']

/**
 * @description Set colors to rgba value
 * @param {Object} style style config
 * @return {Undefined} Void
 */
Style.prototype.colorProcessor = function (style) {
  const allKeys = Object.keys(style)

  const colorKeys = allKeys.filter(key => colorProcessorKeys.find(k => k === key))

  colorKeys.forEach(key => (style[key] = getRgbaValue(style[key])))
}

/**
 * @description Init graph style
 * @param {Object} ctx Context of canvas
 * @return {Undefined} Void
 */
Style.prototype.initStyle = function(ctx) {
  initTransform(ctx, this)

  initGraphStyle(ctx, this)
}

/**
 * @description Init canvas transform
 * @param {Object} ctx  Context of canvas
 * @param {Style} style Instance of Style
 * @return {Undefined} Void
 */
function initTransform (ctx, style) {
  ctx.save()

  const { graphCenter, rotate, scale, translate } = style

  if (!(graphCenter instanceof Array)) return

  ctx.translate(...graphCenter)

  if (rotate) ctx.rotate(rotate * Math.PI / 180)

  if (scale instanceof Array) ctx.scale(...scale)

  if (translate) ctx.translate(...translate)

  ctx.translate(-graphCenter[0], -graphCenter[1])
}

const autoSetStyleKeys = [
  'lineCap', 'lineJoin', 'lineDashOffset',
  'shadowOffsetX', 'shadowOffsetY', 'lineWidth',
  'textAlign', 'textBaseline'
]

/**
 * @description Set the style of canvas ctx
 * @param {Object} ctx  Context of canvas
 * @param {Style} style Instance of Style
 * @return {Undefined} Void
 */
function initGraphStyle (ctx, style) {
  let { fill, stroke, shadowColor, opacity } = style

  autoSetStyleKeys.forEach(key => {
    if (key || typeof key === 'number') ctx[key] = style[key]
  })

  fill = [...fill]
  stroke = [...stroke]
  shadowColor = [...shadowColor]

  fill[3] *= opacity
  stroke[3] *= opacity
  shadowColor[3] *= opacity

  ctx.fillStyle = getColorFromRgbValue(fill)
  ctx.strokeStyle = getColorFromRgbValue(stroke)
  ctx.shadowColor = getColorFromRgbValue(shadowColor)

  const { lineDash, shadowBlur } = style

  if (lineDash) ctx.setLineDash(lineDash)

  if (typeof shadowBlur === 'number') ctx.shadowBlur = shadowBlur > 0 ? shadowBlur : 0.001

  const { fontStyle, fontVarient, fontWeight, fontSize, fontFamily } = style

  ctx.font = fontStyle + ' ' + fontVarient + ' ' + fontWeight + ' ' + fontSize + 'px' + ' ' + fontFamily
}

/**
 * @description Restore canvas ctx transform
 * @param {Object} ctx  Context of canvas
 * @return {Undefined} Void
 */
Style.prototype.restoreTransform = function (ctx) {
  ctx.restore()
}

/**
 * @description Update style data
 * @param {Object} change Changed data
 * @return {Undefined} Void
 */
Style.prototype.update = function (change) {
  this.colorProcessor(change)

  Object.assign(this, change)
}