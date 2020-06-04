---
sidebarDepth: 2
---

# Style

This section describes the instance properties of the **Style** class.

## properties

### fill

```js
/**
 * @description Rgba value of graph fill color
 * @type {Array<Number>}
 * @default fill = [0, 0, 0, 1]
 */
```

### stroke

```js
/**
 * @description Rgba value of graph stroke color
 * @type {Array<Number>}
 * @default stroke = [0, 0, 0, 1]
 */
```

### opacity

```js
/**
 * @description Opacity of graph
 * @type {Number}
 * @default opacity = 1
 */
```

### lineCap

```js
/**
 * @description LineCap of Ctx
 * @type {Null|String}
 * @default lineCap = null
 * @example lineCap = 'butt'|'round'|'square'
 */
```

### lineJoin

```js
/**
 * @description Linejoin of Ctx
 * @type {Null|String}
 * @default lineJoin = null
 * @example lineJoin = 'round'|'bevel'|'miter'
 */
```

### lineDash

```js
/**
 * @description LineDash of Ctx
 * @type {Null|Array<Number>}
 * @default lineDash = null
 * @example lineDash = [10, 10]
 */
```

### lineDashOffset

```js
/**
 * @description LineDashOffset of Ctx
 * @type {Null|Number}
 * @default lineDashOffset = null
 * @example lineDashOffset = 10
 */
```

### shadowBlur

```js
/**
 * @description ShadowBlur of Ctx
 * @type {Number}
 * @default shadowBlur = 0
 */
```

### shadowColor

```js
/**
 * @description Rgba value of graph shadow color
 * @type {Array<Number>}
 * @default shadowColor = [0, 0, 0, 0]
 */
```

### shadowOffsetX

```js
/**
 * @description ShadowOffsetX of Ctx
 * @type {Number}
 * @default shadowOffsetX = 0
 */
```

### shadowOffsetY

```js
/**
 * @description ShadowOffsetY of Ctx
 * @type {Number}
 * @default shadowOffsetY = 0
 */
```

### lineWidth

```js
/**
 * @description LineWidth of Ctx
 * @type {Number}
 * @default lineWidth = 0
 */
```

### graphCenter

```js
/**
 * @description Center point of the graph
 * @type {Null|Array<Number>}
 * @default graphCenter = null
 * @example graphCenter = [10, 10]
 */
```

### scale

```js
/**
 * @description Graph scale
 * @type {Null|Array<Number>}
 * @default scale = null
 * @example scale = [1.5, 1.5]
 */
```

### rotate

```js
/**
 * @description Graph rotation degree
 * @type {Null|Number}
 * @default rotate = null
 * @example rotate = 10
 */
```

### translate

```js
/**
 * @description Graph translate distance
 * @type {Null|Array<Number>}
 * @default translate = null
 * @example translate = [10, 10]
 */
```

### hoverCursor

```js
/**
 * @description Cursor status when hover
 * @type {String}
 * @default hoverCursor = 'pointer'
 * @example hoverCursor = 'default'|'pointer'|'auto'|'crosshair'|'move'|'wait'|...
 */
```

### fontStyle

```js
/**
 * @description Font style of Ctx
 * @type {String}
 * @default fontStyle = 'normal'
 * @example fontStyle = 'normal'|'italic'|'oblique'
 */
```

### fontVarient

```js
/**
 * @description Font varient of Ctx
 * @type {String}
 * @default fontVarient = 'normal'
 * @example fontVarient = 'normal'|'small-caps'
 */
```

### fontWeight

```js
/**
 * @description Font weight of Ctx
 * @type {String|Number}
 * @default fontWeight = 'normal'
 * @example fontWeight = 'normal'|'bold'|'bolder'|'lighter'|Number
 */
```

### fontSize

```js
/**
 * @description Font size of Ctx
 * @type {Number}
 * @default fontSize = 10
 */
```

### fontFamily

```js
/**
 * @description Font family of Ctx
 * @type {String}
 * @default fontFamily = 'Arial'
 */
```

### textAlign

```js
/**
 * @description TextAlign of Ctx
 * @type {String}
 * @default textAlign = 'center'
 * @example textAlign = 'start'|'end'|'left'|'right'|'center'
 */
```

### textBaseline

```js
/**
 * @description TextBaseline of Ctx
 * @type {String}
 * @default textBaseline = 'middle'
 * @example textBaseline = 'top'|'bottom'|'middle'|'alphabetic'|'hanging'
 */
```

### gradientColor

```js
/**
 * @description The color used to create the gradient
 * @type {Null|Array<String>}
 * @default gradientColor = null
 * @example gradientColor = ['#000', '#111', '#222']
 */
```

### gradientType

```js
/**
 * @description Gradient type
 * @type {String}
 * @default gradientType = 'linear'
 * @example gradientType = 'linear' | 'radial'
 */
```

### gradientParams

```js
/**
 * @description Gradient params
 * @type {Array<Number>}
 * @default gradientParams = null
 * @example gradientParams = [x0, y0, x1, y1] (Linear Gradient)
 * @example gradientParams = [x0, y0, r0, x1, y1, r1] (Radial Gradient)
 */
```

### gradientWith

```js
/**
 * @description When to use gradients
 * @type {String}
 * @default gradientWith = 'stroke'
 * @example gradientWith = 'stroke' | 'fill'
 */
```

### gradientStops

```js
/**
 * @description Gradient color stops
 * @type {String|Array<Number>}
 * @default gradientStops = 'auto'
 * @example gradientStops = 'auto' | [0, .2, .3, 1]
 */
```

### colors

```js
/**
 * @description Extended color that supports animation transition
 * @type {Array<String>|Object}
 * @default colors = null
 * @example colors = ['#000', '#111', '#222', 'red']
 * @example colors = { a: '#000', b: '#111' }
 */
```

::: tip TIP
**Gradient** is automatically enabled when `gradientColor` and `gradientParams` are configured.
:::

## prototype

### getStyle

```js
/**
 * @description Get the current style configuration
 * @return {Object} Style configuration
 */
Style.prototype.getStyle = function () {}
```
