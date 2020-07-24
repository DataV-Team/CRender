---
sidebarDepth: 2
---

# Style

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
```

### stroke

```typescript
/**
 * @description 图形描边颜色的Rgba值
 */
stroke: RgbaValue = [0, 0, 0, 0]
```

### opacity

```typescript
/**
 * @description 图形透明度
 */
opacity: number = 1
```

### lineCap

```typescript
/**
 * @description Ctx的lineCap属性值
 */
lineCap: LineCap = 'butt'
```

### lineJoin

```typescript
/**
 * @description Ctx的lineJoin属性值
 */
lineJoin: LineJoin = 'miter'
```

### lineDash

```typescript
/**
 * @description Ctx的lineDash属性值
 */
lineDash: number[] = []
```

### lineDashOffset

```typescript
/**
 * @description Ctx的lineDashOffset属性值
 */
lineDashOffset: number = 0
```

### shadowBlur

```typescript
/**
 * @description Ctx的shadowBlur属性值
 */
shadowBlur: number = 0
```

### shadowColor

```typescript
/**
 * @description 图形阴影颜色的Rgba值
 */
shadowColor: RgbaValue = [0, 0, 0, 0]
```

### shadowOffsetX

```typescript
/**
 * @description Ctx的shadowOffsetX属性值
 */
shadowOffsetX: number = 0
```

### shadowOffsetY

```typescript
/**
 * @description Ctx的shadowOffsetY属性值
 */
shadowOffsetY: number = 0
```

### lineWidth

```typescript
/**
 * @description Ctx的lineWidth属性值
 */
lineWidth: number = 1
```

### graphCenter

```typescript
/**
 * @description 图形中心点
 */
graphCenter?: [number, number]
```

### scale

```typescript
/**
 * @description 图形缩放倍数
 */
scale?: [number, number]
```

### rotate

```typescript
/**
 * @description 图形旋转角度
 */
rotate?: number
```

### translate

```typescript
/**
 * @description 图形位移距离
 */
translate?: [number, number]
```

### hoverCursor

```typescript
/**
 * @description 鼠标悬浮在图形上时cursor的值
 */
hoverCursor: HoverCursor = 'pointer'
```

### fontStyle

```typescript
/**
 * @description Ctx的fontStyle属性值
 */
fontStyle: FontStyle = 'normal'
```

### fontVarient

```typescript
/**
 * @description Ctx的fontVarient属性值
 */
fontVarient: FontVarient = 'normal'
```

### fontWeight

```typescript
/**
 * @description Ctx的fontWeight属性值
 */
fontWeight: FontWeight = 'normal'
```

### fontSize

```typescript
/**
 * @description Ctx的fontSize属性值
 */
fontSize: number = 10
```

### fontFamily

```typescript
/**
 * @description Ctx的fontFamily属性值
 */
fontFamily: string = 'Arial'
```

### textAlign

```typescript
/**
 * @description Ctx的textAlign属性值
 */
textAlign: TextAlign = 'center'
```

### textBaseline

```typescript
/**
 * @description Ctx的textBaseline属性值
 */
textBaseline: TextBaseLine = 'middle'
```

### gradientColor

```typescript
/**
 * @description 用于创建渐变色的颜色
 */
gradientColor?: RgbaValue[]
```

### gradientType

```typescript
/**
 * @description 渐变类型
 */
gradientType: GradientType = 'linear'
```

### gradientParams

```typescript
/**
 * @description 渐变参数
 * @example gradientParams = [x0, y0, x1, y1] (线性渐变)
 * @example gradientParams = [x0, y0, r0, x1, y1, r1] (径向渐变)
 */
gradientParams?: GradientParams
```

### gradientWith

```typescript
/**
 * @description 使用渐变色的属性
 *
 * 控制渐变色用于填充颜色还是描边颜色
 */
gradientWith: GradientWith = 'stroke'
```

### gradientStops

```js
/**
 * @description 渐变色位置
 * @example gradientStops = 'auto' | [0, .2, .3, 1]
 */
gradientStops: GradientStops = 'auto'
```

::: tip TIP
`gradientColor`和`gradientParams`被配置后将自动启用**渐变**。
:::
