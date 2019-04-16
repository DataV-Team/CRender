<h1 align="center">CRender</h1>

<p align="center">
    <a href="https://github.com/jiaming743/CRender/blob/master/LICENSE"><img src="https://img.shields.io/github/license/jiaming743/CRender.svg" alt="LICENSE" /> </a>
    <a href="https://www.npmjs.com/package/@jiaminghi/c-render"><img src="https://img.shields.io/npm/v/@jiaminghi/c-render.svg" alt="LICENSE" /> </a>
</p>

### What is CRender?

- It's a **vector** graphics rendering plugin based on **canvas**.
- It provides **animation** and mouse **event** support for graphics.

### Install with npm

```shell
$ npm install @jiaminghi/c-render
```

Detailed documents and examples can be viewed on the [HomePage](http://crender.jiaminghi.com).

- [Usage](#usage)
- [Class CRender](#class-crender)
- [Class Graph](#class-graph)
- [Class Style](#class-style)
- [Examples](#examples)
- [Extend New Graph](#Extend-New-Graph)
- [Related support](#Related-support)

------

<h3 align="center">Usage</h3>

```javascript
import CRender from '@jiaminghi/c-redner'

const canvas = document.getElementById('canvas')

// Instantiate CRender
const render = new CRender(canvas)

// Add graph to render
const circle = render.add({ name: 'circle', ... })
```

<h3 align="center">Class CRender</h3>

### Instantiation

```javascript
/**
 * @description           Class of CRender
 * @param {Object} canvas Canvas DOM
 * @return {CRender}      Instance of CRender
 */
class CRender {
    // ...
}
```

### attribute

- [ctx](#ctx)
- [area](#area)
- [animationStatus](#animationStatus)
- [graphs](#graphs)
- [color](#color)
- [bezierCurve](#bezierCurve)

#### ctx

```javascript
/**
 * @description Context of the canvas
 * @type {Object}
 * @example ctx = canvas.getContext('2d')
 */
```

#### area

```javascript
/**
 * @description Width and height of the canvas
 * @type {Array}
 * @example area = [300，100]
 */
```

#### animationStatus

```javascript
/**
 * @description Whether render is in animation rendering
 * @type {Boolean}
 * @example animationStatus = true|false
 */
```

#### graphs

```javascript
/**
 * @description Added graph
 * @type {[Graph]}
 * @example graphs = [Graph, Graph, ...]
 */
```

#### [color](#https://github.com/jiaming743/color)

```javascript
/**
 * @description Color plugin
 * @type {Object}
 */
```

#### [bezierCurve](https://github.com/jiaming743/BezierCurve)

```javascript
/**
 * @description Bezier Curve plugin
 * @type {Object}
 */
```

### prototype

- [add](#add)

  Add graph to render.

- [delGraph](#delGraph)

  Delete graph in render.

- [delAllGraph](#delAllGraph)

  Delete all graph in render.

- [drawAllGraph](#drawAllGraph)

  Draw all the graphs in the render.

- [clearArea](#clearArea)

  Clear canvas drawing area.

- [launchAnimation](#launchAnimation)

  Animate the graph whose animation queue is not empty and the animationPause is equal to false.

#### add

```javascript
/**
 * @description           Add graph to render
 * @param {Object} config Graph configuration
 * @return {Graph}        Graph instance
 */
CRender.prototype.add = function (config = {}) {
	// ...
}
```

#### delGraph

```javascript
/**
 * @description         Delete graph in render
 * @param {Graph} graph The graph to be deleted
 * @return {Undefined}  Void
 */
CRender.prototype.delGraph = function (graph) {
	// ...
}
```

#### delAllGraph

```javascript
/**
 * @description        Delete all graph in render
 * @return {Undefined} Void
 */
CRender.prototype.delAllGraph = function () {
	// ...
}
```

#### drawAllGraph

```javascript
/**
 * @description        Draw all the graphs in the render
 * @return {Undefined} Void
 */
CRender.prototype.drawAllGraph = function () {
    // ...
}
```

#### clearArea

```javascript
/**
 * @description        Clear canvas drawing area
 * @return {Undefined} Void
 */
CRender.prototype.clearArea = function () {
	// ...
}
```

#### launchAnimation

```javascript
/**
 * @description      Animate the graph whose animation queue is not empty
 *                   and the animationPause is equal to false
 * @return {Promise} Animation Promise
 */
CRender.prototype.launchAnimation = function () {
	// ...
}
```

<h3 align="center">Class Graph</h3>

### attribute

- [visible](#visible)
- [shape](#shape)
- [style](#style)
- [drag](#drag)
- [hover](#hover)
- [index](#index)
- [animationDelay](#animationDelay)
- [animationFrame](#animationFrame)
- [animationCurve](#animationCurve)
- [animationPause](#animationPause)
- [hoverRect](#hoverRect)

#### visible

```javascript
/**
 * @description Weather to render graph
 * @type {Boolean}
 * @default visible = true
 */
```

#### shape

```javascript
/**
 * @description Graph shape data
 * @type {Object}
 */

```

#### [style](#Class-Style)

```javascript
/**
 * @description Graph style data (Instance of Style)
 * @type {Style}
 */

```

#### drag

```javascript
/**
 * @description Whether to enable drag
 * @type {Boolean}
 * @default drag = false
 */

```

#### hover

```javascript
/**
 * @description Whether to enable hover
 * @type {Boolean}
 * @default hover = false
 */

```

#### index

```javascript
/**
 * @description Graph rendering index
 *  Give priority to index high graph in rendering
 * @type {Number}
 * @default index = 1
 */
```

#### animationDelay

```javascript
/**
 * @description Animation delay time(ms)
 * @type {Number}
 * @default animationDelay = 0
 */
```

#### animationFrame

```javascript
/**
 * @description Number of animation frames
 * @type {Number}
 * @default animationFrame = 30
 */
```

#### [animationCurve](#https://github.com/jiaming743/transition)

```javascript
/**
 * @description Animation dynamic curve
 * @type {String}
 * @default animationCurve = 'linear'
 */
```

#### animationPause

```javascript
/**
 * @description Weather to pause graph animation
 * @type {Boolean}
 * @default animationPause = false
 */
```

#### hoverRect

```javascript
/**
 * @description Rectangular hover detection zone
 *  Use this method for hover detection first
 * @type {Null|Array}
 * @default hoverRect = null
 * @example hoverRect = [0, 0, 100, 100] // [Rect start x, y, Rect width, height]
 */
```

### prototype

- [attr](#attr)

  Update graph state.

- [animation](#animation)

  Update graphics state (with animation).

- [animationEnd](#animationEnd)

  Skip to the last frame of animation.

- [pauseAnimation](#pauseAnimation)

  Pause animation behavior.

- [playAnimation](#playAnimation)

  Try animation behavior.

#### attr

```javascript
/**
 * @description Update graph state
 * @param {String} attrName Updated attribute name
 * @param {Any} change      Updated value
 * @return {Undefined} Void
 */
Graph.prototype.attr = function (attrName, change = undefined) {
	// ...
}
```

#### animation

```javascript
/**
 * @description Update graphics state (with animation)
 *  Only shape and style attributes are supported
 * @param {String} attrName Updated attribute name
 * @param {Any} change      Updated value
 * @param {Boolean} wait    Whether to store the animation waiting
 * 							for the next animation request
 * @return {Promise} Animation Promise
 */
Graph.prototype.animation = async function (attrName, change, wait = false) {
	// ...
}
```

#### animationEnd

```javascript
/**
 * @description Skip to the last frame of animation
 * @return {Undefined} Void
 */
Graph.prototype.animationEnd = function () {
    // ...
}
```

#### pauseAnimation

```javascript
/**
 * @description Pause animation behavior
 * @return {Undefined} Void
 */
Graph.prototype.pauseAnimation = function () {
    // ...
}
```

#### playAnimation

```javascript
/**
 * @description Try animation behavior
 * @return {Undefined} Void
 */
Graph.prototype.playAnimation = function () {
    // ...
}
```

### Life Cycle

When you add graph to the render, you can configure the following functions in the configuration, they will be called at a specific time.

- added
- beforeDraw
- drawed
- beforeMove
- moved
- beforeDelete
- deleted

#### Tip

The current graph instance will be passed in as a parameter,and the mousemove event will also be passed to beforeMove and moved.

<h3 align="center">Class Style</h3>

### attribute

- [fill](#fill)
- [stroke](#stroke)
- [opacity](#opacity)
- [lineCap](#lineCap)
- [lineJoin](#)
- [lineDash](#lineDash)
- [lineDashOffset](#lineDashOffset)
- [shadowBlur](#shadowBlur)
- [shadowColor](#shadowColor)
- [shadowOffsetX](#shadowOffsetX)
- [shadowOffsetY](#shadowOffsetY)
- [lineWidth](#lineWidth)
- [strokeNoScale](#strokeNoScale)
- [graphCenter](#graphCenter)
- [scale](#scale)
- [rotate](#rotate)
- [translate](#translate)
- [hoverCursor](#hoverCursor)
- [fontStyle](#fontStyle)
- [fontVarient](#fontVarient)
- [fontWeight](#fontWeight)
- [fontSize](#fontSize)
- [fontFamily](#fontFamily)
- [textAlign](#textAlign)
- [textBaseline](#textBaseline)

#### fill

```javascript
/**
* @description Rgba value of graph fill color 
* @type {Array}
* @default fill = [0, 0, 0, 1]
*/
```

#### stroke

```javascript
/**
* @description Rgba value of graph stroke color 
* @type {Array}
* @default stroke = [0, 0, 0, 1]
*/
```

#### opacity

```javascript
/**
* @description Opacity of graph
* @type {Number}
* @default opacity = 1
*/
```

#### lineCap

```javascript
/**
* @description LineCap of Ctx
* @type {String}
* @default lineCap = null
* @example lineCap = 'butt'|'round'|'square'
*/
```

#### lineJoin

```javascript
/**
* @description Linejoin of Ctx
* @type {String}
* @default lineJoin = null
* @example lineJoin = 'round'|'bevel'|'miter'
*/
```

#### lineDash

```javascript
/**
* @description LineDash of Ctx
* @type {Array}
* @default lineDash = null
* @example lineDash = [10, 10]
*/
```

#### lineDashOffset

```javascript
/**
* @description LineDashOffset of Ctx
* @type {Number}
* @default lineDashOffset = null
* @example lineDashOffset = 10
*/
```

#### shadowBlur

```javascript
/**
* @description ShadowBlur of Ctx
* @type {Number}
* @default shadowBlur = 0
*/
```

#### shadowColor

```javascript
/**
* @description Rgba value of graph shadow color 
* @type {Array}
* @default shadowColor = [0, 0, 0, 0]
*/
```

#### shadowOffsetX

```javascript
/**
* @description ShadowOffsetX of Ctx
* @type {Number}
* @default shadowOffsetX = 0
*/
```

#### shadowOffsetY

```javascript
/**
* @description ShadowOffsetY of Ctx
* @type {Number}
* @default shadowOffsetY = 0
*/
```

#### lineWidth

```javascript
/**
* @description LineWidth of Ctx
* @type {Number}
* @default lineWidth = 0
*/
```

#### strokeNoScale

```javascript
/**
* @description Stroke width is not scaled
* @type {Boolean}
* @default strokeNoScale = false
*/
```

#### graphCenter

```javascript
/**
* @description Center point of the graph
* @type {Array}
* @default graphCenter = null
* @example graphCenter = [10, 10]
*/
```

#### scale

```javascript
/**
* @description Graph scale
* @type {Array}
* @default scale = null
* @example scale = [1.5, 1.5]
*/
```

#### rotate

```javascript
/**
* @description Graph rotation degree
* @type {Number}
* @default rotate = null
* @example rotate = 10
*/
```

#### translate

```javascript
/**
* @description Graph translate distance
* @type {Array}
* @default translate = null
* @example translate = [10, 10]
*/
```

#### hoverCursor

```javascript
/**
* @description Cursor status when hover
* @type {String}
* @default hoverCursor = 'pointer'
* @example hoverCursor = 'default'|'pointer'|'auto'|'crosshair'|'move'|'wait'|...
*/
```

#### fontStyle

```javascript
/**
* @description Font style of Ctx
* @type {String}
* @default fontStyle = 'normal'
* @example fontStyle = 'normal'|'italic'|'oblique'
*/
```

#### fontVarient

```javascript
/**
* @description Font varient of Ctx
* @type {String}
* @default fontVarient = 'normal'
* @example fontVarient = 'normal'|'small-caps'
*/
```

#### fontWeight

```javascript
/**
* @description Font weight of Ctx
* @type {String|Number}
* @default fontWeight = 'normal'
* @example fontWeight = 'normal'|'bold'|'bolder'|'lighter'|Number
*/
```

#### fontSize

```javascript
/**
* @description Font size of Ctx
* @type {Number}
* @default fontSize = 10
*/
```

#### fontFamily

```javascript
/**
* @description Font family of Ctx
* @type {String}
* @default fontFamily = 'Arial'
*/
```

#### textAlign

```javascript
/**
* @description TextAlign of Ctx
* @type {String}
* @default textAlign = 'center'
* @example textAlign = 'start'|'end'|'left'|'right'|'center'
*/
```

#### textBaseline

```javascript
/**
* @description TextBaseline of Ctx
* @type {String}
* @default textBaseline = 'middle'
* @example textBaseline = 'top'|'bottom'|'middle'|'alphabetic'|'hanging'
*/
```

<h3 align="center">Examples</h3>

CRender provides some basic vector graph, examples are as follows.

- [circle](#circle)
- [ellipse](#ellipse)
- [rect](#rect)
- [ring](#ring)
- [arc](#arc)
- [sector](#sector)
- [regPolygon](#regPolygon)
- [polyline](#polyline)
- [polyline (closed)](#polyline-closed)
- [smoothline](#smoothline)
- [smoothline (closed)](#smoothline-closed)
- [bezierCurve](#bezierCurve)
- [bezierCurve (closed)](#bezierCurve-closed)
- [text](#text)

#### circle

```javascript
const { area: [w, h] } = render

const circleConfig = {
  name: 'circle',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    rx: w / 2,
    ry: h / 2,
    r: 50
  },
  style: {
    fill: '#9ce5f4',
    shadowBlur: 0,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('shape', { r: 70 }, true)
    this.animation('style', { shadowBlur: 20 })
  },
  mouseOuter (e) {
    this.animation('shape', { r: 50 }, true)
    this.animation('style', { shadowBlur: 0 })
  }
}

const circle = render.add(circleConfig)
```

#### ellipse

```javascript
const { area: [w, h] } = render

const ellipseConfig = {
  name: 'ellipse',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    rx: w / 2,
    ry: h / 2,
    hr: 80,
    vr: 30
  },
  style: {
    fill: '#9ce5f4',
    shadowBlur: 0,
    shadowColor: '#66eece',
    scale: [1, 1],
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('style', { scale: [1.5, 1.5], shadowBlur: 20 })
  },
  mouseOuter (e) {
    this.animation('style', { scale: [1, 1], shadowBlur: 0 })
  }
}

const ellipse = render.add(ellipseConfig)
```

#### rect

```javascript
const { area: [w, h] } = render

const rectConfig = {
  name: 'rect',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
  x: w / 2 - rectWidth / 2,
  y: h / 2 - rectHeight / 2,
  w: rectWidth,
  h: rectHeight
  },
  style: {
  fill: '#9ce5f4',
  shadowBlur: 0,
  shadowColor: '#66eece',
  hoverCursor: 'pointer',
  translate: [0, 0]
  },
  mouseEnter (e) {
  this.animation('shape', { w: 400 }, true)
  this.animation('style', { shadowBlur: 20, translate: [-100, 0] })
  },
  mouseOuter (e) {
  this.animation('shape', { w: 200 }, true)
  this.animation('style', { shadowBlur: 0, translate: [0, 0] })
  }
}

const rect = render.add(rectConfig)
```

#### ring

```javascript
const { area: [w, h] } = render

const ringConfig = {
  name: 'ring',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    rx: w / 2,
    ry: h / 2,
    r: 50
  },
  style: {
    stroke: '#9ce5f4',
    lineWidth: 20,
    hoverCursor: 'pointer',
    shadowBlur: 0,
    shadowColor: '#66eece'
  },
  mouseEnter (e) {
    this.animation('style', { shadowBlur: 20, lineWidth: 30 })
  },
  mouseOuter (e) {
    this.animation('style', { shadowBlur: 0, lineWidth: 20 })
  }
}

const ring = render.add(ringConfig)
```

#### arc

```javascript
const { area: [w, h] } = render

const arcConfig = {
  name: 'arc',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    rx: w / 2,
    ry: h / 2,
    r: 60,
    startAngle: 0,
    endAngle: Math.PI / 3
  },
  style: {
    stroke: '#9ce5f4',
    lineWidth: 20,
    shadowBlur: 0,
    rotate: 0,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('shape', { endAngle: Math.PI }, true)
    this.animation('style', { shadowBlur: 20, rotate: -30, lineWidth: 30 })
  },
  mouseOuter (e) {
    this.animation('shape', { endAngle: Math.PI / 3 }, true)
    this.animation('style', { shadowBlur: 0, rotate: 0, lineWidth: 20 })
  }
}

const arc = render.add(arcConfig)
```

#### sector

```javascript
const { area: [w, h] } = render

const sectorConfig = {
  name: 'sector',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    rx: w / 2,
    ry: h / 2,
    r: 60,
    startAngle: 0,
    endAngle: Math.PI / 3
  },
  style: {
    fill: '#9ce5f4',
    shadowBlur: 0,
    rotate: 0,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('shape', { endAngle: Math.PI, r: 70 }, true)
    this.animation('style', { shadowBlur: 20, rotate: -30, lineWidth: 30 })
  },
  mouseOuter (e) {
    this.animation('shape', { endAngle: Math.PI / 3, r: 60 }, true)
    this.animation('style', { shadowBlur: 0, rotate: 0, lineWidth: 20 })
  }
}

const sector = render.add(sectorConfig)
```

#### regPolygon

```javascript
const { area: [w, h] } = render

const regPolygonConfig = {
  name: 'regPolygon',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    rx: w / 2,
    ry: h / 2,
    r: 60,
    side: 6
  },
  style: {
    fill: '#9ce5f4',
    hoverCursor: 'pointer',
    shadowBlur: 0,
    rotate: 0,
    shadowColor: '#66eece'
  },
  mouseEnter (e) {
    this.animation('shape', { endAngle: Math.PI, r: 100 }, true)
    this.animation('style', { shadowBlur: 20, rotate: 180 })
  },
  mouseOuter (e) {
    this.animation('shape', { endAngle: Math.PI / 3, r: 60 }, true)
    this.animation('style', { shadowBlur: 0, rotate: 0 })
  }
}

const regPolygon = render.add(regPolygonConfig)
```

#### polyline

```javascript
const { area: [w, h] } = render

const top = h / 3
const bottom = h / 3 * 2
const gap = w / 10

const beginX = w / 2 - gap * 2

const points = new Array(5).fill('').map((t, i) =>
  [beginX + gap * i, i % 2 === 0 ? top : bottom])

const polylineConfig = {
  name: 'polyline',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    points
  },
  style: {
    stroke: '#9ce5f4',
    shadowBlur: 0,
    lineWidth: 10,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('style', { lineWidth: 20, shadowBlur: 20 })
  },
  mouseOuter (e) {
    this.animation('style', { lineWidth: 10, shadowBlur: 0 })
  }
}

const polyline = render.add(polylineConfig)
```

#### polyline (closed)

```javascript
const { area: [w, h] } = render

const top = h / 3
const bottom = h / 3 * 2
const gap = w / 10

const beginX = w / 2 - gap * 2

const points = new Array(5).fill('').map((t, i) =>
  [beginX + gap * i, i % 2 === 0 ? top : bottom])

points[2][1] += top * 1.3

const polylineClosedConfig = {
  name: 'polyline',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    points,
    close: true
  },
  style: {
    fill: '#9ce5f4',
    shadowBlur: 0,
    lineWidth: 10,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('style', { shadowBlur: 20 }, true)
    const pointsCloned = deepClone(this.shape.points)
    pointsCloned[2][1] += top * 0.3
    this.animation('shape', { points: pointsCloned })
  },
  mouseOuter (e) {
    this.animation('style', { shadowBlur: 0 }, true)
    const pointsCloned = deepClone(this.shape.points)
    pointsCloned[2][1] -= top * 0.3
    this.animation('shape', { points: pointsCloned })
  }
}

const polylineClosed = render.add(polylineClosedConfig)
```

#### smoothline

```javascript
const { area: [w, h] } = render

const top = h / 3
const bottom = h / 3 * 2
const gap = w / 10

const beginX = w / 2 - gap * 2

const points = new Array(5).fill('').map((t, i) =>
  [beginX + gap * i, i % 2 === 0 ? top : bottom])

const smoothlineConfig = {
  name: 'smoothline',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    points
  },
  style: {
    stroke: '#9ce5f4',
    shadowBlur: 0,
    lineWidth: 10,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('style', { lineWidth: 20, shadowBlur: 20 })
  },
  mouseOuter (e) {
    this.animation('style', { lineWidth: 10, shadowBlur: 0 })
  }
}

const smoothline = render.add(smoothlineConfig)
```

#### smoothline (closed)

```javascript
import { getCircleRadianPoint } from '../../CRender/lib/util'

function getPoints (radius, centerPoint, pointNum) {
  const PIDived = Math.PI * 2 / pointNum

  const points = new Array(pointNum).fill('')
    .map((foo, i) =>
      getCircleRadianPoint(...centerPoint, radius, PIDived * i)
    )

  return points
}

const { area: [w, h] } = render

const radius = h / 3
const centerPoint = [w / 2, h / 2]

const smoothlineClosedConfig = {
  name: 'smoothline',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    points: getPoints(radius, centerPoint, 3),
    close: true
  },
  style: {
    fill: '#9ce5f4',
    shadowBlur: 0,
    lineWidth: 10,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('style', { lineWidth: 20, shadowBlur: 20, rotate: 120 })
  },
  mouseOuter (e) {
    this.animation('style', { lineWidth: 10, shadowBlur: 0, rotate: 0 })
  },
  setGraphCenter (e, { style }) {
    if (e) {
      const { movementX, movementY } = e
      const [cx, cy] = style.graphCenter

      style.graphCenter = [cx + movementX, cy + movementY]
    } else {
      style.graphCenter = [...centerPoint]
    }
  }
}

const smoothlineClosed = render.add(smoothlineClosedConfig)
```

#### bezierCurve

```javascript
const { area: [w, h] } = render

const offsetX = w / 2
const offsetY = h / 2

const points = [
  [-100 + offsetX, -50 + offsetY],
  [
    [0  + offsetX, -50 + offsetY],
    [0  + offsetX, 50 + offsetY],
    [100  + offsetX, 50 + offsetY]
  ]
]

const bezierCurveConfig = {
  name: 'bezierCurve',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    points
  },
  style: {
    lineWidth: 10,
    stroke: '#9ce5f4',
    shadowBlur: 0,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e) {
    this.animation('style', { lineWidth: 20, shadowBlur: 20 })
  },
  mouseOuter (e) {
    this.animation('style', { lineWidth: 10, shadowBlur: 0 })
  }
}

const bezierCurve = render.add(bezierCurveConfig)
```

#### bezierCurve (closed)

```javascript
import { getCircleRadianPoint } from '../../CRender/lib/util'

function getPetalPoints (insideRadius, outsideRadius, petalNum, petalCenter) {
  const PI2Dived = Math.PI * 2 / (petalNum * 3)

  let points = new Array(petalNum * 3).fill('')
  .map((foo, i) => 
    getCircleRadianPoint(...petalCenter,
      i % 3 === 0 ? insideRadius : outsideRadius,
      PI2Dived * i)
  )

  const startPoint = points.shift()
  points.push(startPoint)

  points = new Array(petalNum).fill('')
  .map(foo => points.splice(0, 3))

  points.unshift(startPoint)

  return points
}

const { area: [w, h] } = render

const petalCenter = [w / 2, h / 2]
const [raidus1, raidus2, raidus3, raidus4] = [h / 6, h / 2.5, h / 3, h / 2]

const bezierCurveClosedConfig = {
  name: 'bezierCurve',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  shape: {
    points: getPetalPoints(raidus1, raidus2, 6, petalCenter),
    close: true
  },
  style: {
    fill: '#9ce5f4',
    shadowBlur: 0,
    shadowColor: '#66eece',
    hoverCursor: 'pointer'
  },
  mouseEnter (e, { style: { graphCenter } }) {
    this.animation('style', { lineWidth: 20, shadowBlur: 20 }, true)
    this.animation('shape', { points: getPetalPoints(raidus3, raidus4, 6, graphCenter) })
  },
  mouseOuter (e, { style: { graphCenter } }) {
    this.animation('style', { lineWidth: 10, shadowBlur: 0 }, true)
    this.animation('shape', { points: getPetalPoints(raidus1, raidus2, 6, graphCenter) })
  },
  setGraphCenter (e, { style }) {
    if (e) {
      const { movementX, movementY } = e
      const [cx, cy] = style.graphCenter

      style.graphCenter = [cx + movementX, cy + movementY]
    } else {
      style.graphCenter = [...petalCenter]
    }
  }
}

const bezierCurveClosed = render.add(bezierCurveClosedConfig)
```

#### text

```javascript
const { area: [w, h] } = render

const centerPoint = [w / 2, h / 2]

const hoverRect = [w / 2 - 100, h / 2 - 30 ,200, 60]

const textConfig = {
  name: 'text',
  animationCurve: 'easeOutBack',
  hover: true,
  drag: true,
  hoverRect,
  shape: {
    content: 'CRender',
    position: centerPoint,
    maxWidth: 200
  },
  style: {
    fill: '#9ce5f4',
    fontSize: 50,
    shadowBlur: 0,
    rotate: 0,
    shadowColor: '#66eece',
    hoverCursor: 'pointer',
    scale: [1, 1],
    rotate: 0
  },
  mouseEnter (e) {
    this.animation('style', { shadowBlur: 20, scale: [1.5, 1.5], rotate: 30 })
  },
  mouseOuter (e) {
    this.animation('style', { shadowBlur: 0, scale: [1, 1], rotate: 0 })
  },
  moved (e, { hoverRect }) {
    const { movementX, movementY } = e

    hoverRect[0] += movementX
    hoverRect[1] += movementY
  }
}

const text = render.add(textConfig)
```

<h3 align="center">Extend New Graph</h3>

CRender provides a Function to extend new graph,you can **customize** the graphics you want.

```javascript
import { extendNewGraph } from '@jiaminghi/c-render'

const graphName = 'newGraph'
const graphConfig = {
    shape: { ... },
    // ...
}

extendNewGraph(graphName, graphConfig)
```

#### extendNewGraph

```javascript
/**
 * @description Extend new graph
 * @param {String} name   Name of Graph
 * @param {Object} config Configuration of Graph
 * @return {Undefined} Void
 */
function extendNewGraph (name, config) {
    // ...
}
```

#### Graph Configuration Attribute

- [shape](#shape-required)
- [validator](#validator-required)
- [draw](#draw-required)
- [hoverCheck](#hoverCheck)
- [setGraphCenter](#setGraphCenter)
- [move](#move)
- [example of extend new graph](#example-of-extend-new-graph)

#### shape (required)

```javascript
/**
 * @type {Object}
 * @description Graph shape data
 */
```

#### validator (required)

```javascript
/**
 * @type {Function}
 * @description Graph configuration check
 *              Automatically invoked when the graph is added,
 *              and when the return value is false,
 *              the add behavior is terminated
 * @param {Graph} Current graph instance
 * @return {Boolean} Whether the configuration is legal
 */
```

#### draw (required)

```javascript
/**
 * @type {Function}
 * @description Graph plotter
 * @param {CRender} Current CRender instance
 * @param {Graph}   Current graph instance
 * @return {Undefined} Void
 */
```

#### hoverCheck

```javascript
/**
 * @type {Function}
 * @description According to the mouse event to detect
 *              whether the current graphics are in the hover state,
 *              support for mouseEnter, mouseOuter, drag, click
 * @param {[Number]} Position of mouse
 * @param {Graph}    Current graph instance
 * @return {Boolean} Whether it is in hover
 */
```

#### setGraphCenter

```javascript
/**
 * @type {Function}
 * @description Set the center point of the graph to
 *              support rotate, scale and translate.
 *              Add graph and drag behavior will be called.
 * @param {Event} Mouse move Event (Called when adding a graphic, the value is null)
 * @param {Graph} Current graph instance
 * @return {Undefined} Void
 */
```

#### move

```javascript
/**
 * @type {Function}
 * @description Moving graph,support for drag
 * @param {Event} Mouse move Event
 * @param {Graph} Current graph instance
 * @return {Undefined} Void
 */
```

#### example of extend new graph

```javascript
import { extendNewGraph } from '@jiaminghi/c-render'

const circle = {
  shape: {
    rx: 0,
    ry: 0,
    r: 0
  },

  validator ({ shape }) {
    const { rx, ry, r } = shape

    if (typeof rx !== 'number' || typeof ry !== 'number' || typeof r !== 'number') {
      console.error('Shape configuration is abnormal!')

      return false
    }

    return true
  },

  draw ({ ctx }, { shape }) {
    ctx.beginPath()

    const { rx, ry, r } = shape

    ctx.arc(rx, ry, r, 0, Math.PI * 2)

    ctx.fill()
    ctx.stroke()

    ctx.closePath()
  },

  hoverCheck (position, { shape }) {
    const { rx, ry, r } = shape

    return checkPointIsInCircle(rx, ry, r, position)
  },

  setGraphCenter (e, { shape, style }) {
    const { rx, ry } = shape

    style.graphCenter = [rx, ry]
  },

  move ({ movementX, movementY }, { shape }) {
    this.attr('shape', {
      rx: shape.rx + movementX,
      ry: shape.ry + movementY
    })
  }
}

extendNewGraph('circle', circle)
```

<h3 align="center">Related support</h3>

- [Transition](#https://github.com/jiaming743/transition)

  Provide animation transition data(animationCurve).

  If you want to extend the new animation curve, you can use the method provided by transition.

  ```javascript
  import { injectNewCurve } from '@jiaminghi/c-render'
  
  injectNewCurve('newCurve', curveData)
  ```

- [BezierCurve](#https://github.com/jiaming743/bezierCurve)

  Provides support for bezierCurve, such as curve length calculation, conversion between curve and polyline.

- [Color](#https://github.com/jiaming743/Color)

  Provides calculation of color values.