import Style from '../core/style.class'
import { getColorFromRgbValue, getRgbaValue } from '@jiaminghi/color'
import { RgbaValue } from '@jiaminghi/color/types/types'

/**
 * reverse: false | string    -> RgbaValue
 * reverse: true  | RgbaValue -> string
 */
export function transformColor(reverse?: boolean) {
  return (color: string | RgbaValue): string | RgbaValue => {
    const isString = typeof color === 'string'
    const isArray = Array.isArray(color)

    if (isString && reverse) return color
    if (isArray && !reverse) return [...(color as RgbaValue)] as RgbaValue
    if (isString && !reverse) return getRgbaValue(color as string)
    if (isArray && reverse) return getColorFromRgbValue(color as RgbaValue)

    throw new Error('CRender Style transformColor: Unexpected color!')
  }
}

export function getCtxRealColorWithOpacity(opacity: number): (color: RgbaValue) => string {
  return (color: RgbaValue): string => {
    const _color = [...color]
    _color[3] * opacity

    return getColorFromRgbValue(_color as RgbaValue)
  }
}

export function gradientColorValidator(style: Style): boolean {
  const { gradientColor, gradientParams, gradientType, gradientWith, gradientStops } = style

  if (!gradientColor || !gradientParams) return false

  if (gradientColor.length === 1) {
    console.warn('CRender Style: The gradient needs to provide at least two colors')

    return false
  }

  if (gradientType !== 'linear' && gradientType !== 'radial') {
    console.warn(
      `CRender Style: GradientType only supports linear or radial, current value is ${gradientType}`
    )

    return false
  }

  const gradientParamsLength = gradientParams.length

  if (
    (gradientType === 'linear' && gradientParamsLength !== 4) ||
    (gradientType === 'radial' && gradientParamsLength !== 6)
  ) {
    console.warn(
      `CRender Style: The expected length of gradientParams is ${
        gradientType === 'linear' ? '4' : '6'
      }`
    )

    return false
  }

  if (gradientWith !== 'fill' && gradientWith !== 'stroke') {
    console.warn(
      `CRender Style: GradientWith only supports fill or stroke, current value is ${gradientWith}`
    )

    return false
  }

  if (gradientStops !== 'auto' && !(gradientStops instanceof Array)) {
    console.warn(
      `CRender Style: gradientStops only supports 'auto' or Number Array ([0, .5, 1]), current value is ${gradientStops}`
    )

    return false
  }

  return true
}

export function getAutoColorStops(color: string[]): number[] {
  const stopGap = 1 / (color.length - 1)

  return color.map((foo, i) => stopGap * i)
}
