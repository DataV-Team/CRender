---
sidebarDepth: 2
---

# CRender

Here is an introduction to the **CRender**, such as instantiation, instance properties, and prototype methods.

## Class

```js
/**
 * @description Class of CRender
 * @param {Object} canvas Canvas DOM
 * @return {CRender} Instance of CRender
 */
class CRender {
  // ...
}
```

## Instantiation

```js
import CRender from '@jiaminghi/c-render'

const canvas = document.getElementById('canvas')

const render = new CRender(canvas)
```

## properties

Here is an introduction to the **CRender** instance property.

### ctx

```js
/**
 * @description Context of the canvas
 * @type {Object}
 * @example ctx = canvas.getContext('2d')
 */
```

### area

```js
/**
 * @description Width and height of the canvas
 * @type {Array<Number>}
 * @example area = [300，100]
 */
```

### animationStatus

```js
/**
 * @description Whether render is in animation rendering
 * @type {Boolean}
 * @example animationStatus = true|false
 */
```

### graphs

```js
/**
 * @description Added graph
 * @type {Array<Graph>}
 * @example graphs = [Graph, Graph, ...]
 */
```

### [color](https://github.com/jiaming743/color/blob/master/README_EN.md)

```js
/**
 * @description Color plugin
 * @type {Object}
 */
```

### [bezierCurve](https://github.com/jiaming743/BezierCurve/blob/master/README_EN.md)

```js
/**
 * @description Bezier Curve plugin
 * @type {Object}
 */
```

## prototype

Here is an introduction to the **CRender** prototype method.

### add

```js
/**
 * @description Add graph to render
 * @param {Object} config Graph configuration
 * @return {Graph} Graph instance
 */
CRender.prototype.add = function (config = {}) {
  // ...
}
```

### clone

```js
/**
 * @description Clone Graph
 * @param {Graph} graph The target to be cloned
 * @return {Graph} Cloned graph
 */
CRender.prototype.clone = function (graph) {}
```

### delGraph

```js
/**
 * @description Delete graph in render
 * @param {Graph} graph The graph to be deleted
 * @return {Undefined} Void
 */
CRender.prototype.delGraph = function (graph) {
  // ...
}
```

### delAllGraph

```js
/**
 * @description Delete all graph in render
 * @return {Undefined} Void
 */
CRender.prototype.delAllGraph = function () {
  // ...
}
```

### drawAllGraph

```js
/**
 * @description Draw all the graphs in the render
 * @return {Undefined} Void
 */
CRender.prototype.drawAllGraph = function () {
  // ...
}
```

### clearArea

```js
/**
 * @description Clear canvas drawing area
 * @return {Undefined} Void
 */
CRender.prototype.clearArea = function () {
  // ...
}
```

### launchAnimation

```js
/**
 * @description Animate the graph whose animation queue is not empty
 *  and the animationPause is equal to false
 * @return {Promise} Animation Promise
 */
CRender.prototype.launchAnimation = function () {
  // ...
}
```
