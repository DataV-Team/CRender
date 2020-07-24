---
sidebarDepth: 2
---

# Graph

Here we will introduce the **Graph** class, such as instance properties, prototype methods, and lifecycle.

## properties

Here is an introduction to the **Graph** instance properties, which you can configure when adding graphics.

### visible

```js
/**
 * @description Weather to render graph
 * @type {Boolean}
 * @default visible = true
 */
```

### shape

```js
/**
 * @description Graph shape data
 * @type {Object}
 */
```

### [style](/guide/style.md)

```js
/**
 * @description Graph style data (Instance of Style)
 * @type {Style}
 */
```

### drag

```js
/**
 * @description Whether to enable drag
 * @type {Boolean}
 * @default drag = false
 */
```

### hover

```js
/**
 * @description Whether to enable hover
 * @type {Boolean}
 * @default hover = false
 */
```

### index

```js
/**
 * @description Graph rendering index
 *  Give priority to index high graph in rendering
 * @type {Number}
 * @default index = 1
 */
```

### animationDelay

```js
/**
 * @description Animation delay time(ms)
 * @type {Number}
 * @default animationDelay = 0
 */
```

### animationFrame

```js
/**
 * @description Number of animation frames
 * @type {Number}
 * @default animationFrame = 30
 */
```

### [animationCurve](http://transition.jiaminghi.com/EN/)

```js
/**
 * @description Animation easing curve
 * @type {String}
 * @default animationCurve = 'linear'
 */
```

### animationPause

```js
/**
 * @description Weather to pause graph animation
 * @type {Boolean}
 * @default animationPause = false
 */
```

### hoverRect

```js
/**
 * @description Rectangular hover detection zone
 *  Use this method for hover detection first
 * @type {Null|Array<Number>}
 * @default hoverRect = null
 * @example hoverRect = [0, 0, 100, 100] // [Rect start x, y, Rect width, height]
 */
```

### mouseEnter

```js
/**
 * @description Mouse enter event handler
 * @type {Null|Function}
 * @default mouseEnter = null
 */
```

### mouseOuter

```js
/**
 * @description Mouse outer event handler
 * @type {Null|Function}
 * @default mouseOuter = null
 */
```

### click

```js
/**
 * @description Mouse click event handler
 * @type {Null|Function}
 * @default click = null
 */
```

::: tip TIP
Enable **mouseEnter**, **mouseOuter**, **click** event support requires configuring the `hover` property of the graph to `true`. Extended new graph require the **hoverCheck** method to be configured to provide event support.
:::

## prototype

Here is an introduction to the **Graph** prototype method.

### attr

```js
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

### animation

```js
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

### animationEnd

```js
/**
 * @description Skip to the last frame of animation
 * @return {Undefined} Void
 */
Graph.prototype.animationEnd = function () {
    // ...
}
```

### pauseAnimation

```js
/**
 * @description Pause animation behavior
 * @return {Undefined} Void
 */
Graph.prototype.pauseAnimation = function () {
    // ...
}
```

### playAnimation

```js
/**
 * @description Try animation behavior
 * @return {Undefined} Void
 */
Graph.prototype.playAnimation = function () {
    // ...
}
```

## Life Cycle

When you add graph to the render, you can configure the following functions in the configuration, they will be called at a specific time.

### added

```javascript
/**
 * @description Called after the graphics are added
 * @param {Graph} Graph instance
 */
config = {
  //...,
  added ({ shape, style }) {
    // do something...
  }
}
```

### beforeDraw

```javascript
/**
 * @description Called before the drawing is drawn,
 *  the graphic style has been initialized.
 *  You can modify the ctx property before drawing.
 * @param {Graph} Graph instance
 * @param {CRender} CRender instance
 */
config = {
  //...,
  beforeDraw ({ shape, style }, { ctx }) {
    // do something...
    ctx.stroke = 'transparent'
  }
}
```

### drawed

```javascript
/**
 * @description Called after the drawing is completed
 * @param {Graph} Graph instance
 * @param {CRender} CRender instance
 */
config = {
  //...,
  drawed ({ shape, style }, { ctx }) {
    // do something...
  }
}
```

### beforeMove

```javascript
/**
 * @description Called before moving the graphic,
 *  before the drag behavior occurs
 * @param {Event} Mouse event
 * @param {Graph} Graph instance
 */
config = {
  //...,
  beforeMove ({ offsetX, offsetY }, { shape, style }) {
    // do something...
  }
}
```

### moved

```javascript
/**
 * @description Called after moving the graphic,
 *  after the drag behavior occurs
 * @param {Event} Mouse event
 * @param {Graph} Graph instance
 */
config = {
  //...,
  moved ({ offsetX, offsetY }, { shape, style }) {
    // do something...
  }
}
```

### beforeDelete

```javascript
/**
 * @description Called before deleting the graphic
 * @param {Graph} Graph instance
 */
config = {
  //...,
  beforeDelete ({ shape, style }) {
    // do something...
  }
}
```

### deleted

```javascript
/**
 * @description Called after the graphic is deleted
 * @param {Graph} Graph instance
 */
config = {
  //...,
  deleted ({ shape, style }) {
    // do something...
  }
}
```
