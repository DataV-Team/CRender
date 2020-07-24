---
sidebarDepth: 2
---

# 扩展

CRender提供了一个方法去扩展新的图形，你可以**自定义**想要的图形。

## extendNewGraph

```javascript
/**
 * @description 扩展新图形
 * @param {String} name   图形名称
 * @param {Object} config 图形配置
 * @return {Undefined} 无返回值
 */
function extendNewGraph (name, config) {
    // ...
}
```

## 图形基础配置属性

图形基础配置是一个对象，它具有如下几个属性和方法需要配置。

### shape (必须)

```js
/**
 * @type {Object}
 * @description 图形形状数据
 */
config = {
  // ...,
  shape: {
    // 一些属性...
  }
}
```

### validator (必须)

```js
/**
 * @type {Function}
 * @description 图形添加时将被调用，用于检测图形配置是否合法，
 *  若返回值为false则终止添加行为
 * @param {Graph} 当前图形实例
 * @return {Boolean} 配置是否合法
 */
config = {
  // ...,
  validator ({ shape }) {
    // 检查图形配置...
    // return true | false
  }
}
```

### draw (必须)

```js
/**
 * @type {Function}
 * @description 图形绘制器
 * @param {CRender} 当前CRender实例
 * @param {Graph}   当前图形实例
 * @return {Undefined} 无返回值
 */
config = {
  // ...,
  draw ({ ctx }, { shape }) {
    // 绘制...
  }
}
```

### hoverCheck (可选)

```js
/**
 * @type {Function}
 * @description 通过鼠标位置去判断当前图形是否处于鼠标悬浮状态，
 *  用于给mouseEnter, mouseOuter, drag, click事件提供支持。
 * @param {Array<Number>} 鼠标位置
 * @param {Graph}         当前图形实例
 * @return {Boolean} 是否处于鼠标悬浮状态
 */
config = {
  // ...,
  validator ([offsetX, offsetY], { shape }) {
    // 检测是否处于鼠标悬浮状态...
    // return true | false
  }
}
```

### setGraphCenter (可选)

```js
/**
 * @type {Function}
 * @description 设置图形中心点
 *  提供rotate, scale and translate支持
 *  添加图形及图形被拖动后将被调用
 * @param {Event} 鼠标事件 (图形被添加时调用，该参数为null)
 * @param {Graph} 当前图形实例
 * @return {Undefined} 无返回值
 */
config = {
  // ...,
  setGraphCenter ([offsetX, offsetY], { style }) {
    // style.graphCenter = [offsetX, offsetY]
  }
}
```

### move (可选)

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
    // 一些操作...
  }
}
```

## 扩展示例

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