# 扩展

你可以通过扩展**Graph**基类来自定义新图形。建议查看[基础图形](/guide/graphs)中的具体实现以供参考。在子类实现中，你可能需要实现下列几项属性或方法：

## constructor

在子类中的构造函数中建议使用 Graph 的静态方法**mergeDefaultShape**来提供默认 shape 形状数据及 shape 数据合法性检查。

```typescript
/**
 * @description 提供默认shape数据 shape数据合法性检查
 * @param {Shape} shape 预先定义的图形shape形状类型
 * @param {GraphConfig<Partial<Shape>>} config 实例化图形的配置
 * @param {Checker} checker shape合法性检查函数
 */
type Checker = (config: GraphConfig<Shape>) => void

static mergeDefaultShape<Shape>(
  defaultShape: Shape,
  config: GraphConfig<Partial<Shape>>,
  checker?: Checker
): GraphConfig<Shape>
```

## name

```typescript
name: string
```

图形的名称。每个图形都应该有一个唯一的名称，便于调试。

## draw

```typescript
draw: () => void
```

图形的绘制方法。根据你预设的**shape**图形形状数据绘制图形的方法。不实现此方法，图形无法被渲染。

## hoverCheck

```typescript
hoverCheck?: (point: Point) => boolean
```

图形的悬浮检测方法。根据你预设的**shape**图形形状数据及鼠标坐标判断鼠标是否悬浮于图形上。不实现此方法将无法判断图形是否处于悬浮状态，onMouseEnter、onMouseOuter、onClick 事件将无法激活，图形也无法被拖拽。

## setGraphCenter

```typescript
setGraphCenter?: (e?: MouseEvent) => void
```

图形中心点设置方法。该方法用于设置 style 的**graphCenter**属性，图形的 rotate、translate、scale 属性都依赖**graphCenter**。不实现此方法，图形的旋转位移缩放配置将失效。添加图形后，CRender 实例会调用一次该方法用于初始化（此时不会传递任何参数），move 事件触发后也会被 CRender 实例调用（此时将会传递鼠标事件参数）。

## move

```typescript
move?: (e: MouseEvent) => void
```

图形的移动方法。CRender 实例检测到拖拽行为的时候，将调用该方法移动图形。不实现此方法，将无法拖拽图形。
