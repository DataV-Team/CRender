---
sidebarDepth: 2
---

# Extend

CRender provides a Function to extend new graph,you can **customize** the graphics you want.

## extendNewGraph

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

## Graph Configuration Properties

The graphics configuration is an object that has the following properties and methods to configure.

### shape (Required)

```js
/**
 * @type {Object}
 * @description Graph shape data
 */
config = {
  // ...,
  shape: {
    // some property...
  }
}
```

### validator (Required)

```js
/**
 * @type {Function}
 * @description Graph configuration check
 * Automatically invoked when the graph is added,
 * and when the return value is false,
 * the add behavior is terminated.
 * @param {Graph} Current graph instance
 * @return {Boolean} Whether the configuration is legal
 */
config = {
  // ...,
  validator ({ shape }) {
    // check configuration...
    // return true | false
  }
}
```

### draw (Required)

```js
/**
 * @type {Function}
 * @description Graph plotter
 * @param {CRender} Current CRender instance
 * @param {Graph}   Current graph instance
 * @return {Undefined} Void
 */
config = {
  // ...,
  draw ({ ctx }, { shape }) {
    // drawing...
  }
}
```

### hoverCheck (Optional)

```js
/**
 * @type {Function}
 * @description According to the mouse event to detect
 *  whether the current graphics are in the hover state,
 *  support for mouseEnter, mouseOuter, drag, click.
 * @param {Array<Number>} Position of mouse
 * @param {Graph}         Current graph instance
 * @return {Boolean} Whether it is in hover
 */
config = {
  // ...,
  validator ([offsetX, offsetY], { shape }) {
    // Check if it is in hover state...
    // return true | false
  }
}
```

### setGraphCenter (Optional)

```js
/**
 * @type {Function}
 * @description Set the center point of the graph to
 *  support rotate, scale and translate.
 *  Add graph and drag behavior will be called.
 * @param {Event} Mouse move Event (Called when adding a graphic, the value is null)
 * @param {Graph} Current graph instance
 * @return {Undefined} Void
 */
config = {
  // ...,
  setGraphCenter ([offsetX, offsetY], { style }) {
    // style.graphCenter = [offsetX, offsetY]
  }
}
```

### move (Optional)

```js
/**
 * @type {Function}
 * @description Moving graph,support for drag
 * @param {Event} Mouse move Event
 * @param {Graph} Current graph instance
 * @return {Undefined} Void
 */
config = {
  // ...,
  move ([offsetX, offsetY], { shape }) {
    // do something...
  }
}
```

## example of extend new graph

```js
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