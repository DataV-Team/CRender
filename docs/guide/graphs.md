# 基础图形

插件内置了丰富的基础图形，如下是相关实例，你还可以尝试拖拽他们。

<<<<<<< HEAD

## 圆形

# **shape 属性表**

<fold-box title="点击以展开或折叠内置图形 Shape 类型定义">
<<<@/src/types/graphs/shape.ts
</fold-box>

## 圆形

**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| rx | `Number` | `0` | 圆心x轴坐标 |
| ry | `Number` | `0` | 圆心y轴坐标 |
| r | `Number` | `0` | 圆半径 |
</full-width-table>

<demo :config="circle" />

<fold-box>
<<< @/docs/guide/graphData/circle.js
</fold-box>

## 椭圆形

# **shape 属性表**

| rx | `number` | `0` | 圆心 x 轴坐标 |
| ry | `number` | `0` | 圆心 y 轴坐标 |
| r | `number` | `0` | 圆半径 |
</full-width-table>

<demo :graph="circle" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/circle.js
</fold-box>

<fold-box title="点击以展开或折叠 Circle 实现">
<<< @/src/graphs/circle.ts
</fold-box>

## 椭圆形

**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| rx | `Number` | `0` | 圆心x轴坐标 |
| ry | `Number` | `0` | 圆心y轴坐标 |
| hr | `Number` | `0` | 横轴半径 |
| vr | `Number` | `0` | 竖轴半径 |
</full-width-table>

<demo :config="ellipse" />

<fold-box>
<<< @/docs/guide/graphData/ellipse.js
</fold-box>

## 矩形

# **shape 属性表**

| rx | `number` | `0` | 圆心 x 轴坐标 |
| ry | `number` | `0` | 圆心 y 轴坐标 |
| hr | `number` | `0` | 横轴半径 |
| vr | `number` | `0` | 竖轴半径 |
</full-width-table>

<demo :graph="ellipse" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/ellipse.js
</fold-box>

<fold-box title="点击以展开或折叠 Ellipse 实现">
<<< @/src/graphs/ellipse.ts
</fold-box>

## 矩形

**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| x | `Number` | `0` | 矩形左上角x轴坐标 |
| y | `Number` | `0` | 矩形左上角y轴坐标 |
| w | `Number` | `0` | 矩形宽度 |
| h | `Number` | `0` | 矩形高度 |
</full-width-table>

<demo :config="rect" />

<fold-box>
<<< @/docs/guide/graphData/rect.js
</fold-box>

## 环形

# **shape 属性表**

| x | `number` | `0` | 矩形左上角 x 轴坐标 |
| y | `number` | `0` | 矩形左上角 y 轴坐标 |
| w | `number` | `0` | 矩形宽度 |
| h | `number` | `0` | 矩形高度 |
</full-width-table>

<demo :graph="rect" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/rect.js
</fold-box>

<fold-box title="点击以展开或折叠 Rect 实现">
<<< @/src/graphs/rect.ts
</fold-box>

## 环形

**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| rx | `Number` | `0` | 中心点x轴坐标 |
| ry | `Number` | `0` | 中心点y轴坐标 |
| r | `Number` | `0` | 环半径 |
</full-width-table>

<demo :config="ring" />

<fold-box>
<<< @/docs/guide/graphData/ring.js
</fold-box>

## 弧形

# **shape 属性表**

| rx | `number` | `0` | 中心点 x 轴坐标 |
| ry | `number` | `0` | 中心点 y 轴坐标 |
| r | `number` | `0` | 环半径 |
</full-width-table>

<demo :graph="ring" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/ring.js
</fold-box>

<fold-box title="点击以展开或折叠 Ring 实现">
<<< @/src/graphs/ring.ts
</fold-box>

## 弧形

**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| rx | `Number` | `0` | 中心点x轴坐标 |
| ry | `Number` | `0` | 中心点y轴坐标 |
| r | `Number` | `0` | 弧半径 |
| startAngle | `Number` | `0` | 弧起始弧度值 |
| endAngle | `Number` | `0` | 弧结束弧度值 |
| clockWise | `Boolean` | `true` | 是否顺时针 |
</full-width-table>

<demo :config="arc" />

<fold-box>
<<< @/docs/guide/graphData/arc.js
</fold-box>

## 扇形

# **shape 属性表**

| rx | `number` | `0` | 中心点 x 轴坐标 |
| ry | `number` | `0` | 中心点 y 轴坐标 |
| r | `number` | `0` | 弧半径 |
| startAngle | `number` | `0` | 弧起始弧度值 |
| endAngle | `number` | `0` | 弧结束弧度值 |
| clockWise | `boolean` | `true` | 是否顺时针 |
</full-width-table>

<demo :graph="arc" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/arc.js
</fold-box>

<fold-box title="点击以展开或折叠 Arc 实现">
<<< @/src/graphs/arc.ts
</fold-box>

## 扇形

**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| rx | `Number` | `0` | 中心点x轴坐标 |
| ry | `Number` | `0` | 中心点y轴坐标 |
| r | `Number` | `0` | 扇形半径 |
| startAngle | `Number` | `0` | 扇形起始弧度值 |
| endAngle | `Number` | `0` | 扇形结束弧度值 |
| clockWise | `Boolean` | `true` | 是否顺时针 |
</full-width-table>

<demo :config="sector" />

<fold-box>
<<< @/docs/guide/graphData/sector.js
</fold-box>

## 正多边形

# **shape 属性表**

| rx | `number` | `0` | 中心点 x 轴坐标 |
| ry | `number` | `0` | 中心点 y 轴坐标 |
| r | `number` | `0` | 扇形半径 |
| startAngle | `number` | `0` | 扇形起始弧度值 |
| endAngle | `number` | `0` | 扇形结束弧度值 |
| clockWise | `boolean` | `true` | 是否顺时针 |
</full-width-table>

<demo :graph="sector" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/sector.js
</fold-box>

<fold-box title="点击以展开或折叠 Sector 实现">
<<< @/src/graphs/sector.ts
</fold-box>

## 正多边形

**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| rx | `Number` | `0` | 中心点x轴坐标 |
| ry | `Number` | `0` | 中心点y轴坐标 |
| r | `Number` | `0` | 外接圆半径 |
| side | `Number` | `0` | 边数 |
</full-width-table>

<demo :config="regPolygon" />

<fold-box>
<<< @/docs/guide/graphData/regPolygon.js
</fold-box>

## 折线

# **shape 属性表**

| rx | `number` | `0` | 中心点 x 轴坐标 |
| ry | `number` | `0` | 中心点 y 轴坐标 |
| r | `number` | `0` | 外接圆半径 |
| side | `number` | `0` | 边数 |
</full-width-table>

<demo :graph="regPolygon" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/regPolygon.js
</fold-box>

<fold-box title="点击以展开或折叠 RegPolygon 实现">
<<< @/src/graphs/regPolygon.ts
</fold-box>

## 折线

**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| points | `Array` | `[]` | 构成折线的点 |
| close | `Boolean` | `false` | 是否闭合折线 |
</full-width-table>

<demo :config="polyline" />

<fold-box>
<<< @/docs/guide/graphData/polyline.js
</fold-box>

## 折线（闭合）

<demo :config="polylineClosed" />

# <fold-box>

| points | `Point[]` | `[]` | 构成折线的点 |
| close | `boolean` | `false` | 是否闭合折线 |
</full-width-table>

<demo :graph="polyline" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/polyline.js
</fold-box>

<fold-box title="点击以展开或折叠 Polyline 实现">
<<< @/src/graphs/polyline.ts
</fold-box>

## 折线（闭合）

<demo :graph="polylineClosed" />

<fold-box title="点击以展开或折叠演示配置">
>>>>>>> dev
<<< @/docs/guide/graphData/polylineClosed.js
</fold-box>

## 光滑曲线

<<<<<<< HEAD
**shape 属性表**
=======
**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| points | `Array` | `[]` | 构成光滑曲线的点 |
| close | `Boolean` | `false` | 是否闭合光滑曲线 |
</full-width-table>

<demo :config="smoothline" />

<fold-box>
<<< @/docs/guide/graphData/smoothline.js
</fold-box>

## 光滑曲线（闭合）

<demo :config="smoothlineClosed" />

# <fold-box>

| points | `Point[]` | `[]` | 构成光滑曲线的点 |
| close | `boolean` | `false` | 是否闭合光滑曲线 |
</full-width-table>

<demo :graph="smoothline" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/smoothline.js
</fold-box>

<fold-box title="点击以展开或折叠 Smoothline 实现">
<<< @/src/graphs/smoothline.ts
</fold-box>

## 光滑曲线（闭合）

<demo :graph="smoothlineClosed" />

<fold-box title="点击以展开或折叠演示配置">
>>>>>>> dev
<<< @/docs/guide/graphData/smoothlineClosed.js
</fold-box>

## 贝塞尔曲线

<<<<<<< HEAD
**shape 属性表**
=======
**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| points | `Array` | `[]` | 构成贝塞尔曲线的点 |
| close | `Boolean` | `false` | 是否闭合贝塞尔曲线 |
</full-width-table>

<demo :config="bezierCurve" />

<fold-box>
<<< @/docs/guide/graphData/bezierCurve.js
</fold-box>

## 贝塞尔曲线（闭合）

<demo :config="bezierCurveClosed" />

# <fold-box>

| points | `BezierCurve | []` | `[]` | 构成贝塞尔曲线的点 |
| close | `boolean` | `false` | 是否闭合贝塞尔曲线 |
</full-width-table>

<demo :graph="bezierCurve" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/bezierCurve.js
</fold-box>

<fold-box title="点击以展开或折叠 BezierCurve 实现">
<<< @/src/graphs/bezierCurve.ts
</fold-box>

## 贝塞尔曲线（闭合）

<demo :graph="bezierCurveClosed" />

<fold-box title="点击以展开或折叠演示配置">
>>>>>>> dev
<<< @/docs/guide/graphData/bezierCurveClosed.js
</fold-box>

## 文本

<<<<<<< HEAD
**shape 属性表**
=======
**shape 属性表**

> > > > > > > dev

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
<<<<<<< HEAD
| content | `String` | `''` | 文本内容 |
| position | `Array`  | `[0, 0]` | 文本起始位置 |
| maxWidth | `Number` | `Undefined` | 文本最大宽度 |
| rowGap | `Number` | `0` | 行间距 |
</full-width-table>

<demo :config="text" />

<fold-box>
<<< @/docs/guide/graphData/text.js
</fold-box>

::: tip TIP
图形**text**的鼠标事件依赖`hoverRect`属性，如需鼠标事件生效请对其配置。文本中插入`\n`可以进行换行。
=======
| content | `string` | `''` | 文本内容 |
| position | `[number, number]` | `[0, 0]` | 文本起始位置 |
| maxWidth | `number` | `undefined` | 文本最大宽度 |
| rowGap | `number` | `0` | 行间距 |
</full-width-table>

<demo :graph="text" />

<fold-box title="点击以展开或折叠演示配置">
<<< @/docs/guide/graphData/text.js
</fold-box>

<fold-box title="点击以展开或折叠 Text 实现">
<<< @/src/graphs/text.ts
</fold-box>

::: tip TIP
文本中插入`\n`可以进行换行。

> > > > > > > dev
> > > > > > > :::

<script>

import circle from './graphData/circle.js'
import ellipse from './graphData/ellipse.js'
import rect from './graphData/rect.js'
import ring from './graphData/ring.js'
import arc from './graphData/arc.js'
import sector from './graphData/sector.js'
import regPolygon from './graphData/regPolygon.js'
import polyline from './graphData/polyline.js'
import polylineClosed from './graphData/polylineClosed.js'
import smoothline from './graphData/smoothline.js'
import smoothlineClosed from './graphData/smoothlineClosed.js'
import bezierCurve from './graphData/bezierCurve.js'
import bezierCurveClosed from './graphData/bezierCurveClosed.js'
import text from './graphData/text.js'

export default {
  data () {
    return {
      circle,
      ellipse,
      rect,
      ring,
      arc,
      sector,
      regPolygon,
      polyline,
      polylineClosed,
      smoothline,
      smoothlineClosed,
      bezierCurve,
      bezierCurveClosed,
      text
    }
  }
}

<<<<<<< HEAD
</script>

=======
</script>

> > > > > > > dev
