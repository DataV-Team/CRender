---
sidebarDepth: 2
---

# CRender

这里将介绍**CRender**类，例如实例化、实例属性以及原型方法。

## 类

```typescript
/**
 * @description CRender类
 * @param {HTMLCanvasElement} canvas Canvas Element
 * @param {boolean} offScreenRendering 是否启用离屏渲染 (实验性功能)
 * @return {CRender} CRender 实例
 *
 * 启用离屏渲染的性能提升可能会很有限
 */
class CRender {
  constructor(canvas: HTMLCanvasElement, offScreenRendering: boolean = false) {
    // ...
  }
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

### dpr

```typescript
/**
 * @description Device Pixel Ratio
 */
readonly dpr: number = 1
```

### offScreenRendering

```typescript
/**
 * @description 当前是否启用离屏渲染
 */
readonly offScreenRendering: boolean = false
```

### canvas

```typescript
/**
 * @description CRender实例绑定的Canvas
 */
readonly canvas!: HTMLCanvasElement
```

### ctx

```typescript
/**
 * @description 当前用于渲染的Canvas Context
 */
public ctx!: CanvasCtx
```

### area

```typescript
/**
 * @description Canvas 宽高
 */
readonly area: [number, number] = [0, 0]
```

### graphs

```typescript
/**
 * @description 已经添加的图形
 */
readonly graphs: Graph[] = []
```

## 原型方法

这里是**CRender**原型方法的介绍。

### add

```typescript
/**
 * @description 向CRender实例中添加图形
 * @param {Graph | Graph[]} graph 要添加的图形
 * @param {boolean} wait 是否等待后续操作 暂不渲染
 *
 * 如果需要添加大量的图形 应尽量一次完成添加 避免多次重复渲染
 */
add(graph: Graph | Graph[], wait: boolean = false): void {
  // ...
}
```

### delGraph

```typescript
/**
 * @description 删除CRender实例中添加的图形
 * @param {Graph | Graph[]} graph 要删除的图形
 * @param {boolean} wait 是否等待后续操作 暂不渲染
 *
 * 如果需要删除大量的图形 应尽量一次完成添加 避免多次重复渲染
 */
delGraph(graph: Graph | Graph[], wait: boolean = false): void {
  // ...
}
```

### delAllGraph

```typescript
/**
 * @description 删除所有图形
 */
delAllGraph(): void {
  // ...
}
```

### launchAnimation

```typescript
/**
 * @description 如果graphs中存在动画队列不为空且不处于暂停动画状态的图形
 * 将进行动画渲染
 */
launchAnimation(): void | Promise<void> {
  // ...
}
```

### animateAble

```js
/**
 * @description 是否存在动画队列不为空且不处于暂停动画状态的图形
 */
animateAble(): boolean {
  // ...
}
```

### clearArea

```js
/**
 * @description 清空Canvas画布
 */
clearArea(): void {
  // ...
}
```
