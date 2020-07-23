import {
  StyleConfig,
  LineCap,
  LineJoin,
  HoverCursor,
  FontStyle,
  FontVarient,
  FontWeight,
  TextAlign,
  TextBaseLine,
  GradientType,
  GradientParams,
  GradientWith,
  GradientStops,
  colors,
  LinearGradientParams,
  RadialGradientParams,
} from '../types/core/style'
import {
  getCtxRealColorWithOpacity,
  gradientColorValidator,
  transformColor,
  getAutoColorStops,
} from '../utils/style'
import { RgbaValue } from '@jiaminghi/color/types/types'
import CRender from '..'

export default class Style {
  /**
   * @description Rgba value of graph fill color
   */
  fill: RgbaValue = [0, 0, 0, 1]
  /**
   * @description Rgba value of graph stroke color
   */
  stroke: RgbaValue = [0, 0, 0, 0]
  /**
   * @description Opacity of graph
   */
  opacity = 1
  /**
   * @description LineCap of Ctx
   */
  lineCap: LineCap = 'butt'
  /**
   * @description Linejoin of Ctx
   */
  lineJoin: LineJoin = 'miter'
  /**
   * @description LineDash of Ctx
   */
  lineDash: number[] = []
  /**
   * @description LineDashOffset of Ctx
   */
  lineDashOffset = 0
  /**
   * @description ShadowBlur of Ctx
   */
  shadowBlur = 0
  /**
   * @description Rgba value of graph shadow color
   */
  shadowColor: RgbaValue = [0, 0, 0, 0]
  /**
   * @description ShadowOffsetX of Ctx
   */
  shadowOffsetX = 0
  /**
   * @description ShadowOffsetY of Ctx
   */
  shadowOffsetY = 0
  /**
   * @description LineWidth of Ctx
   */
  lineWidth = 1
  /**
   * @description Center point of the graph
   */
  graphCenter?: [number, number]
  /**
   * @description Graph scale
   */
  scale?: [number, number]
  /**
   * @description Graph rotation degree
   */
  rotate?: number
  /**
   * @description Graph translate distance
   */
  translate?: [number, number]
  /**
   * @description Cursor status when hover
   */
  hoverCursor: HoverCursor = 'pointer'
  /**
   * @description Font style of Ctx
   */
  fontStyle: FontStyle = 'normal'
  /**
   * @description Font varient of Ctx
   */
  fontVarient: FontVarient = 'normal'
  /**
   * @description Font weight of Ctx
   */
  fontWeight: FontWeight = 'normal'
  /**
   * @description Font size of Ctx
   */
  fontSize = 10
  /**
   * @description Font family of Ctx
   */
  fontFamily = 'Arial'
  /**
   * @description TextAlign of Ctx
   */
  textAlign: TextAlign = 'center'
  /**
   * @description TextBaseline of Ctx
   */
  textBaseline: TextBaseLine = 'middle'
  /**
   * @description The color used to create the gradient
   */
  gradientColor?: RgbaValue[]
  /**
   * @description Gradient type
   */
  gradientType: GradientType = 'linear'
  /**
   * @description Gradient params
   */
  gradientParams?: GradientParams
  /**
   * @description When to use gradients
   */
  gradientWith: GradientWith = 'stroke'
  /**
   * @description Gradient color stops
   */
  gradientStops: GradientStops = 'auto'
  /**
   * @description Extended color that supports animation transition
   * @example colors = ['#000', '#111', '#222', 'red' ]
   * @example colors = { a: '#000', b: '#111' }
   */
  colors?: colors

  constructor(style?: StyleConfig<string | RgbaValue>) {
    if (style) this.update(style)
  }

  update(style: StyleConfig<string | RgbaValue>): void {
    Object.assign(this, Style.colorProcessor(style))
  }

  static colorProcessor(
    style: StyleConfig<string | RgbaValue>,
    reverse?: false
  ): StyleConfig<RgbaValue>
  static colorProcessor(style: StyleConfig<string | RgbaValue>, reverse: true): StyleConfig<string>
  static colorProcessor(
    style: StyleConfig<string | RgbaValue>,
    reverse?: boolean
  ): StyleConfig<RgbaValue> | StyleConfig<string> {
    const processedStyle = { ...style }
    const transform = transformColor(reverse)

    if (processedStyle.fill) processedStyle.fill = transform(processedStyle.fill)
    if (processedStyle.stroke) processedStyle.stroke = transform(processedStyle.stroke)
    if (processedStyle.shadowColor)
      processedStyle.shadowColor = transform(processedStyle.shadowColor)

    processedStyle.gradientColor = (processedStyle.gradientColor || []).map(transform)

    if (reverse) {
      return processedStyle as StyleConfig<string>
    } else {
      return processedStyle as StyleConfig<RgbaValue>
    }
  }

  setCtx(render: CRender): void {
    Style.setCtxTransform(this, render)

    Style.setCtxStyle(render, this)

    Style.setCtxGradientColor(render, this)
  }

  static setCtxTransform(style: Style, { ctx, dpr }: CRender): void {
    ctx.save()

    const { graphCenter, rotate, scale: [sx, sy] = [1, 1], translate: [x, y] = [0, 0] } = style
    if (!graphCenter) return
    const [ox, oy] = graphCenter

    ctx.translate((ox + x) * dpr, (oy + y) * dpr)
    if (rotate) ctx.rotate((rotate * Math.PI) / 180)
    if (sx !== 1 || sy !== 1 || dpr !== 1) ctx.scale(sx * dpr, sy * dpr)
    ctx.translate(-ox, -oy)
  }

  static setCtxStyle({ ctx }: CRender, style: Style): void {
    // Set directly
    ctx.lineCap = style.lineCap
    ctx.lineJoin = style.lineJoin
    ctx.lineDashOffset = style.lineDashOffset
    ctx.shadowOffsetX = style.shadowOffsetX
    ctx.shadowOffsetY = style.shadowOffsetY
    ctx.lineWidth = style.lineWidth
    ctx.textAlign = style.textAlign
    ctx.textBaseline = style.textBaseline

    // Merge global opacity into colors
    const { fill, stroke, shadowColor, opacity } = style
    const getCtxRealColor = getCtxRealColorWithOpacity(opacity)

    ctx.fillStyle = getCtxRealColor(fill)
    ctx.strokeStyle = getCtxRealColor(stroke)
    ctx.shadowColor = getCtxRealColor(shadowColor)

    const { lineDash, shadowBlur } = style

    // Avoid negative values
    if (lineDash) ctx.setLineDash(lineDash.map(v => (v >= 0 ? v : 0)))
    if (typeof shadowBlur === 'number') ctx.shadowBlur = shadowBlur > 0 ? shadowBlur : 0.001

    // Set Ctx font
    const { fontStyle, fontVarient, fontWeight, fontSize, fontFamily } = style

    ctx.font = `${fontStyle} ${fontVarient} ${fontWeight} ${fontSize}px ${fontFamily}`
  }

  static setCtxGradientColor({ ctx }: CRender, style: Style): void {
    if (!gradientColorValidator(style)) return

    const {
      gradientColor,
      gradientParams,
      gradientType,
      gradientWith,
      gradientStops,
      opacity,
    } = style
    const getCtxRealColor = getCtxRealColorWithOpacity(opacity)

    const _gradientColor = gradientColor!.map(getCtxRealColor)
    const _gradientStops =
      gradientStops === 'auto' ? getAutoColorStops(_gradientColor) : gradientStops

    let gradient: CanvasGradient

    if (gradientType === 'linear') {
      gradient = ctx.createLinearGradient(...(gradientParams as LinearGradientParams))
    } else {
      gradient = ctx.createRadialGradient(...(gradientParams as RadialGradientParams))
    }

    _gradientStops.forEach((stop, i) => gradient.addColorStop(stop, _gradientColor[i]))

    ctx[gradientWith === 'fill' ? 'fillStyle' : 'strokeStyle'] = gradient
  }

  restoreCtx({ ctx }: CRender): void {
    ctx.restore()
  }
}
