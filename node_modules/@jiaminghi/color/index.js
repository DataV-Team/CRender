const hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
const rgbReg = /^(rgb|rgba|RGB|RGBA)/
const rgbaReg = /^(rgba|RGBA)/

/**
 * @description    Get the rgb value of the color
 * @param {String} color Hex or rgb/rgba color
 * @return {Array} Rgb value of the color
 */
export function getRgbValue (color) {
  if (!color) {
    console.error('Missing parameters!')

    return
  }

  const isHex = hexReg.test(color)
  const isRgb = rgbReg.test(color)

  if (!isHex && !isRgb) {
    console.error('Incorrect color type!')

    return
  }

  const lowerColor = color.toLowerCase()

  if (isHex) return getRgbValueFromHex(lowerColor)
  if (isRgb) return getRgbValueFromRgb(lowerColor)
}

/**
 * @description    Get the rgb value of the hex color
 * @param {String} color Hex color
 * @return {Array} Rgb value of the color
 */
function getRgbValueFromHex (color) {
  color = color.replace('#', '')

  if (color.length === 3) color = Array.from(color).map(hexNum => hexNum + hexNum).join('')

  color = color.split('')

  return new Array(3).fill(0).map((t, i) => parseInt(`0x${color[i * 2]}${color[i * 2 + 1]}`))
}

/**
 * @description    Get the rgb value of the rgb/rgba color
 * @param {String} color Hex color
 * @return {Array} Rgb value of the color
 */
function getRgbValueFromRgb (color) {
  return color
    .replace(/rgb\(|rgba\(|\)/g, '')
    .split(',')
    .slice(0, 3)
    .map(n => parseInt(n))
}

/**
 * @description     Convert color to rgb/rgba color
 * @param {String}  color Hex or rgb/rgba color
 * @param {Number}  opacity The opacity of color
 * @return {String} Rgb/rgba color
 */
export function toRgb (color, opacity) {
  if (!color) {
    console.error('Missing parameters!')
    
    return
  }

  const rgbValue = getRgbValue(color)

  const addOpacity = typeof opacity === 'number'

  if (addOpacity) return 'rgba(' + rgbValue.join(',') + `,${opacity})`

  return 'rgb(' + rgbValue.join(',') + ')'
}

/**
 * @description     Convert color to hex color
 * @param {String}  color Hex or rgb/rgba color
 * @return {String} Hex color
 */
export function toHex (color) {
  if (!color) {
    console.error('Missing parameters!')

    return
  }

  color = color.toLowerCase()

  if (hexReg.test(color)) return color

  if (!rgbReg.test(color)) {
    console.warn('Incorrect color type!')

    return
  }

  color = getRgbValue(color)

  return '#' + color
    .map(n => Number(n).toString(16))
    .map(n => n === '0' ? '00' : n)
    .join('')
}

/**
 * @description     Get the opacity of color
 * @param {String}  color Hex or rgb/rgba color
 * @return {Number} Color opacity
 */
export function getOpacity (color) {
  if (!color) {
    console.error('Missing parameters!')
    
    return
  }

  const isRgba = rgbaReg.test(color)

  color = color.toLowerCase()

  if (!isRgba) return 1

  return Number(color.replace(/^(rgba\()|(\d+,){3}|(\))/g, ''))
}

/**
 * @description    Get the rgba value of the color
 * @param {String} color Hex or rgb/rgba color
 * @return {Array} Rgba value of the color
 */
export function getRgbaValue (color) {
  if (!color) {
    console.error('Missing parameters!')

    return
  }

  const colorValue = getRgbValue(color)

  colorValue.push(getOpacity(color))

  return colorValue
}

/**
 * @description     Get Color from rgb value
 * @param {Array}   value Rgb color value
 * @return {String} Rgb / rgba color
 */
export function getColorFromRgbValue (value) {
  if (!value) {
    console.error('Missing parameters!')

    return
  }

  const valueLength = value.length

  if (valueLength !== 3 && valueLength !== 4) {
    console.error('value is illegal!')

    return
  }

  let color = (valueLength === 3 ? 'rgb(' : 'rgba(')

  color += value.join(',') + ')'

  return color
}

/**
 * @description     Deepen color
 * @param {String}  color Hex or rgb/rgba color
 * @return {Number} Percent of Deepen
 * @return {String} Rgba color
 */
export function darken (color, percent) {
  if (!color) {
    console.error('Missing parameters!')

    return
  }

  let rgbaValue = getRgbaValue(color)

  if (!rgbaValue) return

  rgbaValue = rgbaValue
    .map((v, i) => (i === 3 ? v : v - 25 * percent))
    .map(v => (v < 0 ? 0 : v))

  return getColorFromRgbValue(rgbaValue)
}

/**
 * @description     Brighten color
 * @param {String}  color Hex or rgb/rgba color
 * @return {Number} Percent of brighten
 * @return {String} Rgba color
 */
export function lighten (color, percent) {
  if (!color) {
    console.error('Missing parameters!')

    return
  }

  let rgbaValue = getRgbaValue(color)

  if (!rgbaValue) return

  rgbaValue = rgbaValue
    .map((v, i) => (i === 3 ? v : v + 25 * percent))
    .map(v => (v > 255 ? 255 : v))

  return getColorFromRgbValue(rgbaValue)
}

export default {
  getRgbValue,
  getRgbaValue,
  toHex,
  toRgb,
  darken,
  lighten,
  getColorFromRgbValue
}
