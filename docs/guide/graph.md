---
sidebarDepth: 2
---

# Graph

这里将介绍**Graph**基类的实例化、实例属性、实例方法及生命周期等，所有内置图形都扩展自它，你也可以基于它扩展新的图形，[扩展新图形](/extend/)。

::: warning 宽高异常
实例化图形后，没有添加至 CRender 实例时，调用任何实例方法都会抛出异常。
:::

## 实例化

```typescript
/**
 * @description Graph 基类
 * @param {GraphConfig<Shape>} config 图形配置
 */
class Graph {
  constructor(config: GraphConfig<Shape>) {
    // ...
  }
}
```

<fold-box title="点击以展示/隐藏 GraphConfig 类型详情">
<<< @/src/types/core/graph.ts
</fold-box>

## 实例属性

这里是**Graph**实例属性的介绍。

### render

```typescript
/**
 * @description 所属的CRender实例
 */
render!: CRender
```

### shape

```typescript
/**
 * @description 图形形状信息
 */
shape!: Shape
```

### [style](/guide/style.md)

```typescript
/**
 * @description 图形样式信息
 */
style!: Style
```

### visible

```typescript
/**
 * @description 是否渲染图形
 */
visible: boolean = true
```

### drag

```typescript
/**
 * @description 是否允许拖拽
 *
 * 启用拖拽的前置条件是启用hover检测
 */
drag: boolean = false
```

### hover

```typescript
/**
 * @description 是否启用hover检测
 *
 * 不启用将无法触发onMouseEnter / onMouseOuter / onClick事件
 * 也不能进行拖拽操作
 */
hover: boolean = false
```

### index

```typescript
/**
 * @description index越高 层级越高
 *
 * 优先渲染层级高者
 */
index: number = 1
```

### animationDelay

```typescript
/**
 * @description 动画延迟(毫秒)
 */
animationDelay: number = 0
```

### animationFrame

```typescript
/**
 * @description 每次动画的帧数
 *
 * 帧数越多 动画时长越长
 */
animationFrame: number = 30
```

### [animationCurve](http://transition.jiaminghi.com/)

```typescript
/**
 * @description 动画动效曲线
 * @link https://github.com/jiaming743/Transition
 */
animationCurve: EaseCurve = 'linear'
```

### animationPause

```typescript
/**
 * @description 是否处于暂停动画状态
 */
animationPause: boolean = false
```

### hoverRect

```typescript
/**
 * @description 矩形悬浮检测盒
 * 如果配置该项 将优先使用检测盒进行悬浮检测
 * @example hoverRect = [0, 0, 100, 100] // [Rect start x, y, Rect width, height]
 */
hoverRect?: HoverRect
```

### onMouseEnter

```typescript
/**
 * @description Mouse enter事件处理器
 */
onMouseEnter?: (e: MouseEvent) => any
```

### onMouseOuter

```typescript
/**
 * @description Mouse outer事件处理器
 */
onMouseOuter?: (e: MouseEvent) => any
```

### onClick

```typescript
/**
 * @description Mouse click事件处理器
 */
onClick?: (e: MouseEvent) => any
```

### status

```typescript
/**
 * @description 图形当前状态
 */
status: Status = Status.STATIC
```

### animationQueue

```typescript
/**
 * @description 图形动画队列数据
 */
animationQueue: AnimationQueueItem<Shape>[] = []
```

::: tip TIP
启用图形的**mouseEnter**，**mouseOuter**，**click**等事件支持需要将`hover`属性配置为`true`。扩展的新图形需要配置**hoverCheck**方法以提供事件支持。
:::

## 实例方法

这里是**Graph**基类实例方法的介绍。

### attr

```typescript
/**
 * @description 修改图形状态
 * @param {keyof GraphConfig<Shape>} key 要修改的属性键
 * @param {Partial<GraphConfig<Shape>[typeof key]>} value 修改的目标状态
 * @param {boolean} reDraw 是否重新渲染
 */
attr(
  key: keyof GraphConfig<Shape>,
  value: Partial<GraphConfig<Shape>[typeof key]>,
  reDraw: boolean = true
): void {
  // ...
}
```

### animation

```typescript
/**
 * @description 修改图形形状或样式(伴随动画)
 * @param {AnimationKey} key 要修改的属性键 ('shape' | 'style')
 * @param {Partial<Shape> | StyleConfig<string | RgbaValue>} value 修改的目标状态
 * @param {boolean} 是否等待后续操作 暂不渲染
 */
async animation(key: 'shape', value: Partial<Shape>, wait?: boolean): Promise<void>
async animation(
  key: 'style',
  value: StyleConfig<string | RgbaValue>,
  wait?: boolean
): Promise<void>
async animation(
  key: AnimationKey,
  value: Partial<Shape> | StyleConfig<string | RgbaValue>,
  wait: boolean = false
): Promise<void> {
  // ...
}
```

### animationEnd

```typescript
/**
 * @description 直接跳至最后一帧动画
 */
animationEnd(): void {
  // ...
}
```

### pauseAnimation

```typescript
/**
 * @description 暂停动画
 */
pauseAnimation(): void {
  // ...
}
```

### playAnimation

```typescript
/**
 * @description 尝试进行动画
 */
playAnimation(): Promise<void> {
  // ...
}
```

### clone

```typescript
/**
 * @description 克隆图形
 * @param {boolean} 是否自动添加至所属CRender实例
 */
clone(add: boolean = true): this {
  // ...
}
```

## 生命周期

### beforeAdd

```typescript
/**
 * @description 图形添加前被调用
 */
beforeAdd?: () => any
```

### added

```typescript
/**
 * @description 图形添加后被调用
 */
added?: () => any
```

### beforeDraw

```typescript
/**
 * @description 图形渲染前被调用
 */
beforeDraw?: () => any
```

### drawed

```typescript
/**
 * @description 图形渲染后被调用
 */
drawed?: () => any
```

### beforeMove

```typescript
/**
 * @description 图形移动前被调用
 * @param {MouseEvent} e 鼠标事件
 */
beforeMove?: (e: MouseEvent) => any
```

### moved

```typescript
/**
 * @description 图形移动后被调用
 * @param {MouseEvent} e 鼠标事件
 */
moved?: (e: MouseEvent) => any
```

### beforeDelete

```typescript
/**
 * @description 图形删除前被调用
 */
beforeDelete?: () => any
```

### deleted

```typescript
/**
 * @description 图形删除后被调用
 */
deleted?: () => any
```

## 覆盖默认行为

实例化时，你可以配置下列方法，覆盖默认行为。

### draw

```typescript
/**
 * @description 图形的绘制方法
 */
draw?: Function
```

### setGraphCenter

```typescript
/**
 * @description 设置图形中心点的方法
 */
setGraphCenter?: (e?: MouseEvent) => void
```

### hoverCheck

```typescript
/**
 * @description 图形的悬浮检测方法
 */
hoverCheck?: (point: Point) => boolean
```

### move

```typescript
/**
 * @description 图形的移动方法
 */
move?: (e: MouseEvent) => void
```
