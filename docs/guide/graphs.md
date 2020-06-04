# 基础图形

插件内置了丰富的基础图形，如下是相关实例，你还可以尝试拖拽他们。

## 圆形

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
| rx | `Number` | `0` | 圆心x轴坐标 |
| ry | `Number` | `0` | 圆心y轴坐标 |
| r | `Number` | `0` | 圆半径 |
</full-width-table>

<demo :config="circle" />

<fold-box>
<<< @/docs/guide/graphData/circle.js
</fold-box>

## 椭圆形

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
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

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
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

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
| rx | `Number` | `0` | 中心点x轴坐标 |
| ry | `Number` | `0` | 中心点y轴坐标 |
| r | `Number` | `0` | 环半径 |
</full-width-table>

<demo :config="ring" />

<fold-box>
<<< @/docs/guide/graphData/ring.js
</fold-box>

## 弧形

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
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

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
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

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
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

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
| points | `Array` | `[]` | 构成折线的点 |
| close | `Boolean` | `false` | 是否闭合折线 |
</full-width-table>

<demo :config="polyline" />

<fold-box>
<<< @/docs/guide/graphData/polyline.js
</fold-box>

## 折线（闭合）

<demo :config="polylineClosed" />

<fold-box>
<<< @/docs/guide/graphData/polylineClosed.js
</fold-box>

## 光滑曲线

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
| points | `Array` | `[]` | 构成光滑曲线的点 |
| close | `Boolean` | `false` | 是否闭合光滑曲线 |
</full-width-table>

<demo :config="smoothline" />

<fold-box>
<<< @/docs/guide/graphData/smoothline.js
</fold-box>

## 光滑曲线（闭合）

<demo :config="smoothlineClosed" />

<fold-box>
<<< @/docs/guide/graphData/smoothlineClosed.js
</fold-box>

## 贝塞尔曲线

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
| points | `Array` | `[]` | 构成贝塞尔曲线的点 |
| close | `Boolean` | `false` | 是否闭合贝塞尔曲线 |
</full-width-table>

<demo :config="bezierCurve" />

<fold-box>
<<< @/docs/guide/graphData/bezierCurve.js
</fold-box>

## 贝塞尔曲线（闭合）

<demo :config="bezierCurveClosed" />

<fold-box>
<<< @/docs/guide/graphData/bezierCurveClosed.js
</fold-box>

## 文本

**shape 属性表**

<full-width-table>
| 属性名 | 类型 | 默认值 | 注解 |
| :---: | :---: | :---: | :---: |
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
:::

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

</script>
