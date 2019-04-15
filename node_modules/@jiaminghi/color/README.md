<h1 align="center">Color Extension</h1>

<p align="center">
    <a href="https://github.com/jiaming743/Color/blob/master/LICENSE"><img src="https://img.shields.io/github/license/jiaming743/bezierCurve.svg" alt="LICENSE" /> </a>
    <a href="https://www.npmjs.com/package/@jiaminghi/color"><img src="https://img.shields.io/npm/v/@jiaminghi/color.svg" alt="NPM" /> </a>
</p>

### This plugin provides some extension methods for color.
- **[darken](#darken)**

  Deepen color

- **[lighten](#lighten)**

  Brighten color

- **[fade](#fade)**

  Adjust color opacity

- **[toHex](#toHex)**

  Convert color to hex color

- **[toRgb](#toRgb)**

  Convert color to rgb/rgba color

- **[getOpacity](#getOpacity)**

  Get color opacity

- **[getRgbValue](#getRgbValue)**

  Get the color rgb value

- **[getRgbaValue](#getRgbaValue)**

  Get the color rgba value

- **[getColorFromRgbValue](#getColorFromRgbValue)**

  Get Color from rgb value

### Install with npm

```shell
npm install @jiaminghi/color
```

------

<h3 align="center">Examples</h3>

#### darken

```javascript
/**
 * @description     Deepen color
 * @param {String}  color Hex or rgb/rgba color
 * @return {Number} Percent of Deepen
 * @return {String} Rgba color
 */
function darken (color, percent) {
	//...
}

const before = '#3080E8'

const after = darken(color, 20)
// after = 'rgba(0,78,182,1)'
```

<p align="center">
    <img width="180px" src="./exampleImgs/1.jpg" />
</p>



#### lighten

```javascript
/**
 * @description     Brighten color
 * @param {String}  color Hex or rgb/rgba color
 * @return {Number} Percent of brighten
 * @return {String} Rgba color
 */
function lighten (color, percent) {
	//...
}

const before = '#3080E8'

const after = lighten(color, 20)
// after = 'rgba(98,178,255,1)'
```

<p align="center">
    <img width="180px" src="./exampleImgs/2.jpg" />
</p>



#### fade

```javascript
/**
 * @description     Adjust color opacity
 * @param {String}  color Hex or rgb/rgba color
 * @return {Number} Percent of opacity
 * @return {String} Rgba color
 */
function fade (color, percent) {
	//...
}

const before = '#3080E8'

const after = lighten(color, 20)
// after = 'rgba(48,128,232,0.2)'
```

<p align="center">
    <img width="180px" src="./exampleImgs/3.jpg" />
</p>



#### toHex

```javascript
/**
 * @description     Convert color to hex color
 * @param {String}  color Hex or rgb/rgba color
 * @return {String} Hex color
 */
function toHex (color) {
	//...
}

const before = 'rgb(48,128,232)'

const after = toHex(before)
// after = '#3080e8'
```



#### toRgb

```javascript
/**
 * @description     Convert color to rgb/rgba color
 * @param {String}  color Hex or rgb/rgba color
 * @param {Number}  opacity The opacity of color
 * @return {String} Rgb/rgba color
 */
function toRgb (color, opacity) {
	//...
}

const before = '#3080E8'

const after1 = toRgb(before)
// after1 = 'rgb(48,128,232)'
const after2 = toRgb(before, 0.2)
// after2 = 'rgba(48,128,232,0.2)'
```



#### getOpacity

```javascript
/**
 * @description     Get the opacity of the color
 * @param {String}  color Hex or rgb/rgba color
 * @return {Number} Color opacity
 */
function getOpacity (color) {
	//...
}

const color1 = '#3080E8'
const color2 = 'rgba(48,128,232,0.2)'

const opacity1 = getOpacity(color1)
// opacity1 = 1
const opacity2 = getOpacity(color2)
// opacity2 = 0.2

```



#### getRgbValue

```javascript
/**
 * @description    Get the color rgb value
 * @param {String} color Hex or rgb/rgba color
 * @return {Array} Rgb value of the color
 */
function getRgbValue (color) {
	//...
}

const color = '#3080E8'

const rgbValue = getRgbValue(color)
// rgbValue = [48, 128, 232]
```



#### getRgbaValue

```javascript
/**
 * @description    Get the color rgba value
 * @param {String} color Hex or rgb/rgba color
 * @return {Array} Rgba value of the color
 */
function getRgbaValue (color) {
	//...
}

const color1 = '#3080E8'
const color2 = 'rgba(48,128,232,0.2)'

const rgbaValue1 = getRgbaValue(color1)
// rgbaValue1 = [48, 128, 232, 1]
const rgbaValue2 = getRgbaValue(color2)
// rgbaValue2 = [48, 128, 232, 0.2]
```



#### getColorFromRgbValue

```javascript
/**
 * @description     Get Color from rgb value
 * @param {Array}   value Rgb color value
 * @return {String} Rgb / rgba color
 */
function getColorFromRgbValue (value) {
	//...
}

const value1 = [48, 128, 232]
const value2 = [48, 128, 232, 0.2]

const color1 = getColorFromRgbValue(value1)
// color1 = 'rgb(48,128,232)'
const color2 = getColorFromRgbValue(value2)
// color2 = 'rgba(48,128,232,0.2)'
```
