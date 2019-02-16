const hexReg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
const rgbReg = /^(rgb|rgba|RGB|RGBA)/
const rgbaReg = /^(rgba|RGBA)/

export function getRgbValue (color) {
  if (!color) {
    console.warn('Missing parameters!')

    return
  }

  const isHex = hexReg.test(color)
  const isRgb = rgbReg.test(color)

  if (!isHex && !isRgb) {
    console.warn('Incorrect color type!')

    return
  }

  const lowerColor = color.toLowerCase()

  if (isHex) return getRgbValueFromHex(lowerColor)
  if (isRgb) return getRgbValueFromRgb(lowerColor)
}

function getRgbValueFromHex (color) {
  color = color.replace('#', '')

  if (color.length === 3) color = Array.from(color).map(hexNum => hexNum + hexNum).join('')

  color = color.split('')

  return new Array(3).fill(0).map((t, i) => parseInt(`0x${color[i * 2]}${color[i * 2 + 1]}`))
}

function getRgbValueFromRgb (color) {
  return color.replace(/rgb\(|rgba\(|\)/g, '').split(',').slice(0, 3)
}

export function tranRgb (color = false, opacity) {
  const rgbValue = getRgbValue(color)

  const addOpacity = typeof opacity === 'number'

  if (addOpacity) return 'rgba(' + rgbValue.join(',') + `,${opacity})`

  return 'rgb(' + rgbValue.join(',') + ')'
}

export function tranHex (color = false) {
  if (!color) {
    console.warn('Missing parameters!')
    
    return
  }

  color = color.toLowerCase()

  if (hexReg.test(color)) return color

  if (!rgbReg.test(color)) {
    console.warn('Incorrect color type!')

    return
  }

  color = getRgbValue(color)

  return '#' + color.map(n =>
    Number(n).toString(16)).map(n =>
      n === '0' ? '00' : n).join('')
}

export function getOpacity (color = false) {
  if (!color) {
    console.warn('Missing parameters!')
    
    return
  }

  const isRgba = rgbaReg.test(color)

  color = color.toLowerCase()

  if (!isRgba) return 1

  return Number(color.replace(/^(rgba\()|(\d+,){3}|(\))/g, ''))
}

export function tranRgbaValue (color = false) {
  if (!color) {
    console.warn('Missing parameters!')

    return
  }

  const colorValue = getRgbValue(color)

  if (!color) return

  colorValue.push(getOpacity(color))

  return colorValue
}
