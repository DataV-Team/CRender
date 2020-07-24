---
sidebarDepth: 2
---

# Style

这里将介绍**Style**类的实例属性。

## 实例属性


### fill

```js
/**
 * @description 图形填充颜色的Rgba值
 * @type {Array<Number>}
 * @default fill = [0, 0, 0, 1]
 */
```

### stroke

```js
/**
 * @description 图形描边颜色的Rgba值
 * @type {Array<Number>}
 * @default stroke = [0, 0, 0, 1]
 */
```

### opacity

```js
/**
 * @description 图形透明度
 * @type {Number}
 * @default opacity = 1
 */
```

### lineCap

```js
/**
 * @description Ctx的lineCap属性值
 * @type {Null|String}
 * @default lineCap = null
 * @example lineCap = 'butt'|'round'|'square'
 */
```

### lineJoin

```js
/**
 * @description Ctx的lineJoin属性值
 * @type {Null|String}
 * @default lineJoin = null
 * @example lineJoin = 'round'|'bevel'|'miter'
 */
```

### lineDash

```js
/**
 * @description Ctx的lineDash属性值
 * @type {Null|Array<Number>}
 * @default lineDash = null
 * @example lineDash = [10, 10]
 */
```

### lineDashOffset

```js
/**
 * @description Ctx的lineDashOffset属性值
 * @type {Null|Number}
 * @default lineDashOffset = null
 * @example lineDashOffset = 10
 */
```

### shadowBlur

```js
/**
 * @description Ctx的shadowBlur属性值
 * @type {Number}
 * @default shadowBlur = 0
 */
```

### shadowColor

```js
/**
 * @description 图形阴影颜色的Rgba值
 * @type {Array<Number>}
 * @default shadowColor = [0, 0, 0, 0]
 */
```

### shadowOffsetX

```js
/**
 * @description Ctx的shadowOffsetX属性值
 * @type {Number}
 * @default shadowOffsetX = 0
 */
```

### shadowOffsetY

```js
/**
 * @description Ctx的shadowOffsetY属性值
 * @type {Number}
 * @default shadowOffsetY = 0
 */
```

### lineWidth

```js
/**
 * @description Ctx的lineWidth属性值
 * @type {Number}
 * @default lineWidth = 0
 */
```

### graphCenter

```js
/**
 * @description 图形中心点
 * @type {Null|Array<Number>}
 * @default graphCenter = null
 * @example graphCenter = [10, 10]
 */
```

### scale

```js
/**
 * @description 图形缩放倍数
 * @type {Null|Array<Number>}
 * @default scale = null
 * @example scale = [1.5, 1.5]
 */
```

### rotate

```js
/**
 * @description 图形旋转角度
 * @type {Null|Number}
 * @default rotate = null
 * @example rotate = 10
 */
```

### translate

```js
/**
 * @description 图形位移距离
 * @type {Null|Array<Number>}
 * @default translate = null
 * @example translate = [10, 10]
 */
```

### hoverCursor

```js
/**
 * @description 鼠标悬浮在图形上时cursor的值
 * @type {String}
 * @default hoverCursor = 'pointer'
 * @example hoverCursor = 'default'|'pointer'|'auto'|'crosshair'|'move'|'wait'|...
 */
```

### fontStyle

```js
/**
 * @description Ctx的fontStyle属性值
 * @type {String}
 * @default fontStyle = 'normal'
 * @example fontStyle = 'normal'|'italic'|'oblique'
 */
```

### fontVarient

```js
/**
 * @description Ctx的fontVarient属性值
 * @type {String}
 * @default fontVarient = 'normal'
 * @example fontVarient = 'normal'|'small-caps'
 */
```

### fontWeight

```js
/**
 * @description Ctx的fontWeight属性值
 * @type {String|Number}
 * @default fontWeight = 'normal'
 * @example fontWeight = 'normal'|'bold'|'bolder'|'lighter'|Number
 */
```

### fontSize

```js
/**
 * @description Ctx的fontSize属性值
 * @type {Number}
 * @default fontSize = 10
 */
```

### fontFamily

```js
/**
 * @description Ctx的fontFamily属性值
 * @type {String}
 * @default fontFamily = 'Arial'
 */
```

### textAlign

```js
/**
 * @description Ctx的textAlign属性值
 * @type {String}
 * @default textAlign = 'center'
 * @example textAlign = 'start'|'end'|'left'|'right'|'center'
 */
```

### textBaseline

```js
/**
 * @description Ctx的textBaseline属性值
 * @type {String}
 * @default textBaseline = 'middle'
 * @example textBaseline = 'top'|'bottom'|'middle'|'alphabetic'|'hanging'
 */
```

### gradientColor

```js
/**
 * @description 用于创建渐变色的颜色
 * @type {Null|Array<String>}
 * @default gradientColor = null
 * @example gradientColor = ['#000', '#111', '#222']
 */
```

### gradientType

```js
/**
 * @description 渐变类型
 * @type {String}
 * @default gradientType = 'linear'
 * @example gradientType = 'linear' | 'radial'
 */
```

### gradientParams

```js
/**
 * @description 渐变参数
 * @type {Array<Number>}
 * @default gradientParams = null
 * @example gradientParams = [x0, y0, x1, y1] (线性渐变)
 * @example gradientParams = [x0, y0, r0, x1, y1, r1] (径向渐变)
 */
```

### gradientWith

```js
/**
 * @description 使用渐变色的属性
 * @type {String}
 * @default gradientWith = 'stroke'
 * @example gradientWith = 'stroke' | 'fill'
 */
```

### gradientStops

```js
/**
 * @description 渐变色位置
 * @type {String|Array<Number>}
 * @default gradientStops = 'auto'
 * @example gradientStops = 'auto' | [0, .2, .3, 1]
 */
```

### colors

```js
/**
 * @description 支持动画过渡的颜色容器
 * @type {Array<String>|Object}
 * @default colors = null
 * @example colors = ['#000', '#111', '#222', 'red']
 * @example colors = { a: '#000', b: '#111' }
 */
```

::: tip TIP
`gradientColor`和`gradientParams`被配置后将自动启用**渐变**。
:::

## 原型方法

### getStyle

```js
/**
 * @description 获取图形当前样式配置
 * @return {Object} 样式配置
 */
Style.prototype.getStyle = function () {
}
```