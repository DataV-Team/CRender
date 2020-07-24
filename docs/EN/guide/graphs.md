# Basic graphics

The plugin has a rich set of basic graphics built in. Here are the related examples, you can also try to drag them.

## circle

**shape attribute**

<full-width-table>
| Attribute name |   Type   | Default |        Annotation         |
| :------------: | :------: | :-----: | :-----------------------: |
|       rx       | `Number` |   `0`   | Center x-axis coordinate. |
|       ry       | `Number` |   `0`   | Center r-axis coordinate. |
|       r        | `Number` |   `0`   |      Circle radius.       |
</full-width-table>

<demo :config="circle" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/circle.js
</fold-box>

## ellipse

**shape attribute**

<full-width-table>
| Attribute name |   Type   | Default |        Annotation         |
| :------------: | :------: | :-----: | :-----------------------: |
|       rx       | `Number` |   `0`   | Center x-axis coordinate. |
|       ry       | `Number` |   `0`   | Center y-axis coordinate. |
|       hr       | `Number` |   `0`   |  Horizontal axis radius.  |
|       vr       | `Number` |   `0`   |   Vertical axis radius.   |
</full-width-table>

<demo :config="ellipse" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/ellipse.js
</fold-box>

## rect

**shape attribute**

<full-width-table>
| Attribute name |   Type   | Default |                        Annotation                         |
| :------------: | :------: | :-----: | :-------------------------------------------------------: |
|       x        | `Number` |   `0`   | The x coordinate of the top left corner of the rectangle. |
|       y        | `Number` |   `0`   | The y coordinate of the top left corner of the rectangle. |
|       w        | `Number` |   `0`   |                     Rectangle width.                      |
|       h        | `Number` |   `0`   |                     Rectangle height.                     |
</full-width-table>

<demo :config="rect" />

<fold-box  title="Click to expand or collapse">
<<< @/docs/guide/graphData/rect.js
</fold-box>

## ring

**shape attribute**

<full-width-table>
| Attribute name |   Type   | Default |        Annotation         |
| :------------: | :------: | :-----: | :-----------------------: |
|       rx       | `Number` |   `0`   | Center x-axis coordinate. |
|       ry       | `Number` |   `0`   | Center y-axis coordinate. |
|       r        | `Number` |   `0`   |       Ring radius.        |
</full-width-table>

<demo :config="ring" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/ring.js
</fold-box>

## arc

**shape attribute**

<full-width-table>
| Attribute name |   Type    | Default |        Annotation         |
| :------------: | :-------: | :-----: | :-----------------------: |
|       rx       | `Number`  |   `0`   | Center x-axis coordinate. |
|       ry       | `Number`  |   `0`   | Center y-axis coordinate. |
|       r        | `Number`  |   `0`   |        Arc radius.        |
|   startAngle   | `Number`  |   `0`   |     Arc start angle.      |
|    endAngle    | `Number`  |   `0`   |      Arc end angle.       |
|   clockWise    | `Boolean` | `true`  |         Clockwise         |
</full-width-table>

<demo :config="arc" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/arc.js
</fold-box>

## sector

**shape attribute**

<full-width-table>
| Attribute name |   Type    | Default |        Annotation         |
| :------------: | :-------: | :-----: | :-----------------------: |
|       rx       | `Number`  |   `0`   | Center x-axis coordinate. |
|       ry       | `Number`  |   `0`   | Center y-axis coordinate. |
|       r        | `Number`  |   `0`   |      Sector radius.       |
|   startAngle   | `Number`  |   `0`   |    Sector start angle.    |
|    endAngle    | `Number`  |   `0`   |     Sector end angle.     |
|   clockWise    | `Boolean` | `true`  |         Clockwise         |
</full-width-table>

<demo :config="sector" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/sector.js
</fold-box>

## regPolygon

**shape attribute**

<full-width-table>
| Attribute name |   Type   | Default |        Annotation         |
| :------------: | :------: | :-----: | :-----------------------: |
|       rx       | `Number` |   `0`   | Center x-axis coordinate. |
|       ry       | `Number` |   `0`   | Center y-axis coordinate. |
|       r        | `Number` |   `0`   |       Circumradius.       |
|      side      | `Number` |   `0`   |       Edge number.        |
</full-width-table>

<demo :config="regPolygon" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/regPolygon.js
</fold-box>

## polyline

**shape attribute**

<full-width-table>
| Attribute name |   Type    | Default |               Annotation               |
| :------------: | :-------: | :-----: | :------------------------------------: |
|     points     |  `Array`  |  `[]`   | The points that makes up the polyline. |
|     close      | `Boolean` | `false` |     Whether to close the polyline.     |
</full-width-table>

<demo :config="polyline" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/polyline.js
</fold-box>

## polyline (closed)

<demo :config="polylineClosed" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/polylineClosed.js
</fold-box>

## smoothline

**shape attribute**

<full-width-table>
| Attribute name |   Type    | Default |                Annotation                |
| :------------: | :-------: | :-----: | :--------------------------------------: |
|     points     |  `Array`  |  `[]`   | The points that makes up the smoothline. |
|     close      | `Boolean` | `false` |     Whether to close the smoothline.     |
</full-width-table>

<demo :config="smoothline" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/smoothline.js
</fold-box>

## smoothline (closed)

<demo :config="smoothlineClosed" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/smoothlineClosed.js
</fold-box>

## bezierCurve

**shape attribute**

<full-width-table>
| Attribute name |   Type    | Default |                Annotation                 |
| :------------: | :-------: | :-----: | :---------------------------------------: |
|     points     |  `Array`  |  `[]`   | The points that makes up the bezierCurve. |
|     close      | `Boolean` | `false` |     Whether to close the bezierCurve.     |
</full-width-table>

<demo :config="bezierCurve" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/bezierCurve.js
</fold-box>

## bezierCurve (closed)

<demo :config="bezierCurveClosed" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/bezierCurveClosed.js
</fold-box>

## text

**shape attribute**

<full-width-table>
| Attribute name |   Type   |   Default   |         Annotation         |
| :------------: | :------: | :---------: | :------------------------: |
|    content     | `String` |    `''`     |       Text content.        |
|    position    | `Array`  |  `[0, 0]`   |    Text start position.    |
|    maxWidth    | `Number` | `Undefined` | Maximum width of the text. |
|     rowGap     | `Number` |     `0`     |  Gap between row and row.  |
</full-width-table>

<demo :config="text" />

<fold-box title="Click to expand or collapse">
<<< @/docs/guide/graphData/text.js
</fold-box>

::: tip TIP
Graph of **text** should be configured with `hoverRect` to support mouse events.You can use `\n` to implement multiple lines of text.
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