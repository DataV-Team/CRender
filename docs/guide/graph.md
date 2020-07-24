---
sidebarDepth: 2
---

# Graph

这里将介绍**Graph**类，例如实例属性、原型方法以及生命周期。

## 实例属性

这里是**Graph**实例属性的介绍，添加图形时，你可以对他们进行配置。

### visible

```js
/**
 * @description 该图形是否可被渲染
 * @type {Boolean}
 * @default visible = true
 */
```

### shape

```js
/**
 * @description 图形形状数据
 * @type {Object}
 */
```

### [style](/guide/style.md)

```js
/**
 * @description 图形样式数据 (Style实例)
 * @type {Style}
 */
```

### drag

```js
/**
 * @description 是否启用拖拽功能
 * @type {Boolean}
 * @default drag = false
 */
```

### hover

```js
/**
 * @description 是否启用悬浮检测
 * @type {Boolean}
 * @default hover = false
 */
```

### index

```js
/**
 * @description 图形渲染层级，层级高者优先渲染
 * @type {Number}
 * @default index = 1
 */
```

### animationDelay

```js
/**
 * @description 动画延迟时间(ms)
 * @type {Number}
 * @default animationDelay = 0
 */
```

### animationFrame

```js
/**
 * @description 动画帧数
 * @type {Number}
 * @default animationFrame = 30
 */
```

### [animationCurve](http://transition.jiaminghi.com/)

```js
/**
 * @description 动画缓动曲线
 * @type {String}
 * @default animationCurve = 'linear'
 */
```

### animationPause

```js
/**
 * @description 是否暂停图形动画
 * @type {Boolean}
 * @default animationPause = false
 */
```

### hoverRect

```js
/**
 * @description 矩形悬浮检测盒，配置该项则优先使用其进行鼠标悬浮检测
 * @type {Null|Array<Number>}
 * @default hoverRect = null
 * @example hoverRect = [0, 0, 100, 100] // [矩形起始点 x, y 坐标, 矩形宽, 高]
 */
```

### mouseEnter

```js
/**
 * @description 鼠标进入图形事件处理器
 * @type {Null|Function}
 * @default mouseEnter = null
 */
```

### mouseOuter

```js
/**
 * @description 鼠标移出图形事件处理器
 * @type {Null|Function}
 * @default mouseOuter = null
 */
```

### click

```js
/**
 * @description 鼠标点击图形事件处理器
 * @type {Null|Function}
 * @default click = null
 */
```

::: tip TIP
启用图形的**mouseEnter**，**mouseOuter**，**click**等事件支持需要将`hover`属性配置为`true`。扩展的新图形需要配置**hoverCheck**方法以提供事件支持。
:::

## 原型方法

这里是**Graph**原型方法的介绍。

### attr

```js
/**
 * @description 更新图形状态
 * @param {String} attrName 要更新的属性名
 * @param {Any} change      更新的值
 * @return {Undefined} 无返回值
 */
Graph.prototype.attr = function (attrName, change = undefined) {
	// ...
}
```

### animation

```js
/**
 * @description 更新图形状态（伴随动画），仅支持shape和style属性
 * @param {String} attrName 要更新的属性名
 * @param {Any} change      更新的值
 * @param {Boolean} wait    是否存储动画队列，等待下次动画请求
 * @return {Promise} Animation Promise
 */
Graph.prototype.animation = async function (attrName, change, wait = false) {
	// ...
}
```

### animationEnd

```js
/**
 * @description 跳至最后一帧动画
 * @return {Undefined} 无返回值
 */
Graph.prototype.animationEnd = function () {
    // ...
}
```

### pauseAnimation

```js
/**
 * @description 暂停动画行为
 * @return {Undefined} 无返回值
 */
Graph.prototype.pauseAnimation = function () {
    // ...
}
```

### playAnimation

```js
/**
 * @description 尝试动画行为
 * @return {Undefined} 无返回值
 */
Graph.prototype.playAnimation = function () {
    // ...
}
```

## 生命周期

当向**render**中添加图形时，你可以配置如下几个方法，它们将在特定时刻被调用。

### added

```javascript
/**
 * @description 图形添加时被调用
 * @param {Graph} 图形实例
 */
config = {
  //...,
  added ({ shape, style }) {
    // 一些操作...
  }
}
```

### beforeDraw

```javascript
/**
 * @description 图形绘制前被调用，图形样式已经初始化完毕
 *  你可以在此时修改ctx属性
 * @param {Graph} 图形实例
 * @param {CRender} CRender实例
 */
config = {
  //...,
  beforeDraw ({ shape, style }, { ctx }) {
    // 一些操作...
    ctx.stroke = 'transparent'
  }
}
```

### drawed

```javascript
/**
 * @description 图形绘制后被调用
 * @param {Graph} 图形实例
 * @param {CRender} CRender实例
 */
config = {
  //...,
  drawed ({ shape, style }, { ctx }) {
    // 一些操作...
  }
}
```

### beforeMove

```javascript
/**
 * @description 图形移动前被调用，移动行为发生前
 * @param {Event} 鼠标事件
 * @param {Graph} 图形实例
 */
config = {
  //...,
  beforeMove ({ offsetX, offsetY }, { shape, style }) {
    // 一些操作...
  }
}
```

### moved

```javascript
/**
 * @description 图形移动后被调用，移动行为发生后
 * @param {Event} 鼠标事件
 * @param {Graph} 图形实例
 */
config = {
  //...,
  moved ({ offsetX, offsetY }, { shape, style }) {
    // 一些操作...
  }
}
```

### beforeDelete

```javascript
/**
 * @description 图形删除前被调用
 * @param {Graph} 图形实例
 */
config = {
  //...,
  beforeDelete ({ shape, style }) {
    // 一些操作...
  }
}
```

### deleted

```javascript
/**
 * @description 图形删除后被调用
 * @param {Graph} 图形实例
 */
config = {
  //...,
  deleted ({ shape, style }) {
    // 一些操作...
  }
}
```
