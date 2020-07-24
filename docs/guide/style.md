---
sidebarDepth: 2
---

# Style

<<<<<<< HEAD
这里将介绍**Style**类的实例属性。

## 实例属性


### fill

```js
/**
 * @description 图形填充颜色的Rgba值
 * @type {Array<Number>}
 * @default fill = [0, 0, 0, 1]
 */
=======
这里将介绍**Style**类的实例化及实例属性，它负责图形的样式配置，颜色由[Color 插件](https://github.com/DataV-Team/Color)进行管理。实例化**Graph**图形时，`style`属性的值将用于 Style 实例化，你可以配置图形的描边颜色、填充颜色、阴影、字体等样式。

<fold-box title="点击以展开或折叠 Style 相关类型">
<<<@/src/types/core/style.ts
</fold-box>

## 实例化

```typescript
/**
 * @description Style 类
 *
 * 实例化时，配置项中的颜色支持'red'这样的有效颜色名，也支持rgb或rgba颜色
 * 同时也支持 RgbaValue 类型的颜色值
 * 实例化后，实例属性上的颜色值都会被转换为 RgbaValue 格式 便于颜色渐变支持
 */
class Style {
  constructor(style?: StyleConfig<string | RgbaValue>) {
    // ...
  }
}
```

## 实例属性

### fill

```typescript
/**
 * @description 图形填充颜色的Rgba值
 */
fill: RgbaValue = [0, 0, 0, 1]
>>>>>>> dev
```

### stroke

<<<<<<< HEAD
```js
/**
 * @description 图形描边颜色的Rgba值
 * @type {Array<Number>}
 * @default stroke = [0, 0, 0, 1]
 */
=======
```typescript
/**
 * @description 图形描边颜色的Rgba值
 */
stroke: RgbaValue = [0, 0, 0, 0]
>>>>>>> dev
```

### opacity

<<<<<<< HEAD
```js
/**
 * @description 图形透明度
 * @type {Number}
 * @default opacity = 1
 */
=======
```typescript
/**
 * @description 图形透明度
 */
opacity: number = 1
>>>>>>> dev
```

### lineCap

<<<<<<< HEAD
```js
/**
 * @description Ctx的lineCap属性值
 * @type {Null|String}
 * @default lineCap = null
 * @example lineCap = 'butt'|'round'|'square'
 */
=======
```typescript
/**
 * @description Ctx的lineCap属性值
 */
lineCap: LineCap = 'butt'
>>>>>>> dev
```

### lineJoin

<<<<<<< HEAD
```js
/**
 * @description Ctx的lineJoin属性值
 * @type {Null|String}
 * @default lineJoin = null
 * @example lineJoin = 'round'|'bevel'|'miter'
 */
=======
```typescript
/**
 * @description Ctx的lineJoin属性值
 */
lineJoin: LineJoin = 'miter'
>>>>>>> dev
```

### lineDash

<<<<<<< HEAD
```js
/**
 * @description Ctx的lineDash属性值
 * @type {Null|Array<Number>}
 * @default lineDash = null
 * @example lineDash = [10, 10]
 */
=======
```typescript
/**
 * @description Ctx的lineDash属性值
 */
lineDash: number[] = []
>>>>>>> dev
```

### lineDashOffset

<<<<<<< HEAD
```js
/**
 * @description Ctx的lineDashOffset属性值
 * @type {Null|Number}
 * @default lineDashOffset = null
 * @example lineDashOffset = 10
 */
=======
```typescript
/**
 * @description Ctx的lineDashOffset属性值
 */
lineDashOffset: number = 0
>>>>>>> dev
```

### shadowBlur

<<<<<<< HEAD
```js
/**
 * @description Ctx的shadowBlur属性值
 * @type {Number}
 * @default shadowBlur = 0
 */
=======
```typescript
/**
 * @description Ctx的shadowBlur属性值
 */
shadowBlur: number = 0
>>>>>>> dev
```

### shadowColor

<<<<<<< HEAD
```js
/**
 * @description 图形阴影颜色的Rgba值
 * @type {Array<Number>}
 * @default shadowColor = [0, 0, 0, 0]
 */
=======
```typescript
/**
 * @description 图形阴影颜色的Rgba值
 */
shadowColor: RgbaValue = [0, 0, 0, 0]
>>>>>>> dev
```

### shadowOffsetX

<<<<<<< HEAD
```js
/**
 * @description Ctx的shadowOffsetX属性值
 * @type {Number}
 * @default shadowOffsetX = 0
 */
=======
```typescript
/**
 * @description Ctx的shadowOffsetX属性值
 */
shadowOffsetX: number = 0
>>>>>>> dev
```

### shadowOffsetY

<<<<<<< HEAD
```js
/**
 * @description Ctx的shadowOffsetY属性值
 * @type {Number}
 * @default shadowOffsetY = 0
 */
=======
```typescript
/**
 * @description Ctx的shadowOffsetY属性值
 */
shadowOffsetY: number = 0
>>>>>>> dev
```

### lineWidth

<<<<<<< HEAD
```js
/**
 * @description Ctx的lineWidth属性值
 * @type {Number}
 * @default lineWidth = 0
 */
=======
```typescript
/**
 * @description Ctx的lineWidth属性值
 */
lineWidth: number = 1
>>>>>>> dev
```

### graphCenter

<<<<<<< HEAD
```js
/**
 * @description 图形中心点
 * @type {Null|Array<Number>}
 * @default graphCenter = null
 * @example graphCenter = [10, 10]
 */
=======
```typescript
/**
 * @description 图形中心点
 */
graphCenter?: [number, number]
>>>>>>> dev
```

### scale

<<<<<<< HEAD
```js
/**
 * @description 图形缩放倍数
 * @type {Null|Array<Number>}
 * @default scale = null
 * @example scale = [1.5, 1.5]
 */
=======
```typescript
/**
 * @description 图形缩放倍数
 */
scale?: [number, number]
>>>>>>> dev
```

### rotate

<<<<<<< HEAD
```js
/**
 * @description 图形旋转角度
 * @type {Null|Number}
 * @default rotate = null
 * @example rotate = 10
 */
=======
```typescript
/**
 * @description 图形旋转角度
 */
rotate?: number
>>>>>>> dev
```

### translate

<<<<<<< HEAD
```js
/**
 * @description 图形位移距离
 * @type {Null|Array<Number>}
 * @default translate = null
 * @example translate = [10, 10]
 */
=======
```typescript
/**
 * @description 图形位移距离
 */
translate?: [number, number]
>>>>>>> dev
```

### hoverCursor

<<<<<<< HEAD
```js
/**
 * @description 鼠标悬浮在图形上时cursor的值
 * @type {String}
 * @default hoverCursor = 'pointer'
 * @example hoverCursor = 'default'|'pointer'|'auto'|'crosshair'|'move'|'wait'|...
 */
=======
```typescript
/**
 * @description 鼠标悬浮在图形上时cursor的值
 */
hoverCursor: HoverCursor = 'pointer'
>>>>>>> dev
```

### fontStyle

<<<<<<< HEAD
```js
/**
 * @description Ctx的fontStyle属性值
 * @type {String}
 * @default fontStyle = 'normal'
 * @example fontStyle = 'normal'|'italic'|'oblique'
 */
=======
```typescript
/**
 * @description Ctx的fontStyle属性值
 */
fontStyle: FontStyle = 'normal'
>>>>>>> dev
```

### fontVarient

<<<<<<< HEAD
```js
/**
 * @description Ctx的fontVarient属性值
 * @type {String}
 * @default fontVarient = 'normal'
 * @example fontVarient = 'normal'|'small-caps'
 */
=======
```typescript
/**
 * @description Ctx的fontVarient属性值
 */
fontVarient: FontVarient = 'normal'
>>>>>>> dev
```

### fontWeight

<<<<<<< HEAD
```js
/**
 * @description Ctx的fontWeight属性值
 * @type {String|Number}
 * @default fontWeight = 'normal'
 * @example fontWeight = 'normal'|'bold'|'bolder'|'lighter'|Number
 */
=======
```typescript
/**
 * @description Ctx的fontWeight属性值
 */
fontWeight: FontWeight = 'normal'
>>>>>>> dev
```

### fontSize

<<<<<<< HEAD
```js
/**
 * @description Ctx的fontSize属性值
 * @type {Number}
 * @default fontSize = 10
 */
=======
```typescript
/**
 * @description Ctx的fontSize属性值
 */
fontSize: number = 10
>>>>>>> dev
```

### fontFamily

<<<<<<< HEAD
```js
/**
 * @description Ctx的fontFamily属性值
 * @type {String}
 * @default fontFamily = 'Arial'
 */
=======
```typescript
/**
 * @description Ctx的fontFamily属性值
 */
fontFamily: string = 'Arial'
>>>>>>> dev
```

### textAlign

<<<<<<< HEAD
```js
/**
 * @description Ctx的textAlign属性值
 * @type {String}
 * @default textAlign = 'center'
 * @example textAlign = 'start'|'end'|'left'|'right'|'center'
 */
=======
```typescript
/**
 * @description Ctx的textAlign属性值
 */
textAlign: TextAlign = 'center'
>>>>>>> dev
```

### textBaseline

<<<<<<< HEAD
```js
/**
 * @description Ctx的textBaseline属性值
 * @type {String}
 * @default textBaseline = 'middle'
 * @example textBaseline = 'top'|'bottom'|'middle'|'alphabetic'|'hanging'
 */
=======
```typescript
/**
 * @description Ctx的textBaseline属性值
 */
textBaseline: TextBaseLine = 'middle'
>>>>>>> dev
```

### gradientColor

<<<<<<< HEAD
```js
/**
 * @description 用于创建渐变色的颜色
 * @type {Null|Array<String>}
 * @default gradientColor = null
 * @example gradientColor = ['#000', '#111', '#222']
 */
=======
```typescript
/**
 * @description 用于创建渐变色的颜色
 */
gradientColor?: RgbaValue[]
>>>>>>> dev
```

### gradientType

<<<<<<< HEAD
```js
/**
 * @description 渐变类型
 * @type {String}
 * @default gradientType = 'linear'
 * @example gradientType = 'linear' | 'radial'
 */
=======
```typescript
/**
 * @description 渐变类型
 */
gradientType: GradientType = 'linear'
>>>>>>> dev
```

### gradientParams

<<<<<<< HEAD
```js
/**
 * @description 渐变参数
 * @type {Array<Number>}
 * @default gradientParams = null
 * @example gradientParams = [x0, y0, x1, y1] (线性渐变)
 * @example gradientParams = [x0, y0, r0, x1, y1, r1] (径向渐变)
 */
=======
```typescript
/**
 * @description 渐变参数
 * @example gradientParams = [x0, y0, x1, y1] (线性渐变)
 * @example gradientParams = [x0, y0, r0, x1, y1, r1] (径向渐变)
 */
gradientParams?: GradientParams
>>>>>>> dev
```

### gradientWith

<<<<<<< HEAD
```js
/**
 * @description 使用渐变色的属性
 * @type {String}
 * @default gradientWith = 'stroke'
 * @example gradientWith = 'stroke' | 'fill'
 */
=======
```typescript
/**
 * @description 使用渐变色的属性
 *
 * 控制渐变色用于填充颜色还是描边颜色
 */
gradientWith: GradientWith = 'stroke'
>>>>>>> dev
```

### gradientStops

```js
/**
 * @description 渐变色位置
<<<<<<< HEAD
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
=======
 * @example gradientStops = 'auto' | [0, .2, .3, 1]
 */
gradientStops: GradientStops = 'auto'
>>>>>>> dev
```

::: tip TIP
`gradientColor`和`gradientParams`被配置后将自动启用**渐变**。
:::
<<<<<<< HEAD

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
=======
>>>>>>> dev
