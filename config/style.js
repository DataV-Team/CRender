import { tranRgbaValue } from '../extend/color'

export default {
  fill: '#000',
  stroke: 'transparent',
  opacity: 1,
  lineCap: null,
  lineDash: null,
  lineDashOffset: null,
  shadowBlur: 0,
  shadowColor: 'transparent',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  lineWidth: 0,
  strokeNoScale: false,
  graphOrigin: null,
  graphRect: null,
  scale: null,
  rotate: null,
  translate: null,
  hoverCursor: 'default',

  text: null,
  font: null,
  textFill: null,
  textStroke: null,
  textOffset: null,
  textShadowBlur: null,
  textShadowColor: null,
  textShadowOffsetX: 0,
  textShadowOffsetY: 0,
  textAlign: 'center',
  textBaseline: 'middle',
  textOrigin: null,
  textRect: null,
  textTransform: null,
  textScale: null,
  textRotate: null,
  textHoverCursor: 'default'
}

export const styleColorAttr = [
  'fill',
  'stroke',
  'shadowColor',
  'textFill',
  'textStroke',
  'textShadowColor'
]

export function tranColorAttrToRgbaValue (style) {
  const styleKeys = Object.keys(style)

  const tranKeys = styleKeys.filter(k => styleColorAttr.find(attr => attr === k))

  tranKeys.forEach(k => {
    const currentColor = style[k]

    if (!currentColor || currentColor === 'transparent') return

    style[k] = tranRgbaValue(currentColor)
  })
}

export function rgbaValueToColor (value, opacity) {
  if (!value) return ''

  if (value === 'transparent') return 'transparent'

  const mixinOpacity = value.map((v, i) => i === 3 ? v * opacity : v)

  return 'rgba(' + mixinOpacity.join(',') + ')'
}