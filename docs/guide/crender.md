---
sidebarDepth: 2
---

# CRender

这里将介绍**CRender**类，例如实例化、实例属性以及原型方法。

## 类

```js
/**
 * @description           CRender类
 * @param {Object} canvas Canvas节点
 * @return {CRender}      CRender实例
 */
class CRender {
  // ...
}
```

## 实例化

```js
import CRender from '@jiaminghi/c-render'

const canvas = document.getElementById('canvas')

const render = new CRender(canvas)
```

## 实例属性

这里是**CRender**实例属性的介绍。

### ctx

```js
/**
 * @description canvas context
 * @type {Object}
 * @example ctx = canvas.getContext('2d')
 */
```

### area

```js
/**
 * @description canvas宽高
 * @type {Array<Number>}
 * @example area = [300，100]
 */
```

### animationStatus

```js
/**
 * @description render是否处于动画渲染中
 * @type {Boolean}
 * @example animationStatus = true|false
 */
```

### graphs

```js
/**
 * @description 已添加的图形
 * @type {Array<Graph>}
 * @example graphs = [Graph, Graph, ...]
 */
```

### [color](https://github.com/jiaming743/color)

```js
/**
 * @description 颜色插件
 * @type {Object}
 */
```

### [bezierCurve](https://github.com/jiaming743/BezierCurve)

```js
/**
 * @description 贝塞尔曲线插件
 * @type {Object}
 */
```

## 原型方法

这里是**CRender**原型方法的介绍。

### add

```js
/**
 * @description 向render中添加图形
 * @param {Object} config 图形配置
 * @return {Graph} 图形实例
 */
CRender.prototype.add = function (config = {}) {
  // ...
}
```

### clone

```js
/**
 * @description 克隆一个图形
 * @param {Graph} graph 将要被克隆的图形
 * @return {Graph} 克隆的图形
 */
CRender.prototype.clone = function (graph) {}
```

### delGraph

```js
/**
 * @description 删除render中的一个图形
 * @param {Graph} graph 将要删除的图形实例
 * @return {Undefined} 无返回值
 */
CRender.prototype.delGraph = function (graph) {
  // ...
}
```

### delAllGraph

```js
/**
 * @description 删除render中所有的图形
 * @return {Undefined} 无返回值
 */
CRender.prototype.delAllGraph = function () {
  // ...
}
```

### drawAllGraph

```js
/**
 * @description 渲染render中所有的图形
 * @return {Undefined} 无返回值
 */
CRender.prototype.drawAllGraph = function () {
  // ...
}
```

### clearArea

```js
/**
 * @description 擦除canvas绘制区域
 * @return {Undefined} 无返回值
 */
CRender.prototype.clearArea = function () {
  // ...
}
```

### launchAnimation

```js
/**
 * @description 使动画队列不为空且animationPause不为false的图形进行动画
 * @return {Promise} Animation Promise
 */
CRender.prototype.launchAnimation = function () {
  // ...
}
```
