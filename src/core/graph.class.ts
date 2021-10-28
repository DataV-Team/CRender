import {
  HoverRect,
  Status,
  GraphConfig,
  Point,
  AnimationKey,
  AnimationQueueItem,
  AnimationFrameStateItem,
} from '../types/core/graph'
import { StyleConfig } from '../types/core/style'
import Style from './style.class'
import CRender from './crender.class'
import { delay } from '../utils/graph'
import { deepClone } from '../utils/common'
import transition from '@jiaminghi/transition'
import { RgbaValue } from '@jiaminghi/color/types/types'
import { EaseCurve } from '@jiaminghi/transition/types/types/core/index'

// eslint-disable-next-line
export default class Graph<Shape = any> {
  /**
   * @description Graph Name
   */
  name!: string
  /**
   * @description Graph Render
   */
  render!: CRender
  /**
   * @description Graph shape
   */
  shape!: Shape
  /**
   * @description Graph style
   */
  style!: Style
  /**
   * @description Weather to render graph
   */
  visible: boolean = true
  /**
   * @description Whether to enable drag
   */
  drag: boolean = false
  /**
   * @description Whether to enable hover
   */
  hover: boolean = false
  /**
   * @description Graph rendering index
   *  Give priority to index high graph in rendering
   */
  index: number = 1
  /**
   * @description Animation delay time(ms)
   */
  animationDelay: number = 0
  /**
   * @description Number of animation frames
   */
  animationFrame: number = 30
  /**
   * @description Animation dynamic curve (Supported by transition)
   * @link https://github.com/jiaming743/Transition
   */
  animationCurve: EaseCurve = 'linear'
  /**
   * @description Weather to pause graph animation
   */
  animationPause: boolean = false
  /**
   * @description Rectangular hover detection zone
   *  Use this method for hover detection first
   * @example hoverRect = [0, 0, 100, 100] // [Rect start x, y, Rect width, height]
   */
  hoverRect?: HoverRect
  /**
   * @description Mouse enter event handler
   */
  // eslint-disable-next-line
  onMouseEnter?: (e: MouseEvent) => any
  /**
   * @description Mouse outer event handler
   */
  // eslint-disable-next-line
  onMouseOuter?: (e: MouseEvent) => any
  /**
   * @description Mouse click event handler
   */
  // eslint-disable-next-line
  onClick?: (e: MouseEvent) => any
  /**
   * @description Graph current status
   */
  status: Status = Status.STATIC
  /**
   * @description Graph animation frame state
   */
  animationQueue: AnimationQueueItem<Shape>[] = []
  /**
   * @description Funciton of draw graph
   */
  // eslint-disable-next-line
  draw(): void {}
  /**
   * @description Function of set Graph center
   */
  // eslint-disable-next-line
  setGraphCenter(_e?: MouseEvent): void {}
  /**
   * @description Funciton of check graph is hovered
   */
  hoverCheck(_point: Point): boolean {
    return false
  }
  /**
   * @description Function of Graph move
   */
  // eslint-disable-next-line
  move(_e: MouseEvent): void {}
  /**
   * @LifeCyle
   * @description Life Cycle hooks, will all be called in render
   */
  /**
   * @description Life Cycle when graph before add
   */
  // eslint-disable-next-line
  beforeAdd?: (graph: Graph) => any
  /**
   * @description Life Cycle when graph added
   */
  // eslint-disable-next-line
  added?: (graph: Graph) => any
  /**
   * @description Life Cycle when graph before draw
   */
  // eslint-disable-next-line
  beforeDraw?: (graph: Graph) => any
  /**
   * @description Life Cycle when graph drawed
   */
  // eslint-disable-next-line
  drawed?: (graph: Graph) => any
  /**
   * @description Life Cycle when graph before move
   */
  // eslint-disable-next-line
  beforeMove?: (e: MouseEvent, graph: Graph) => any
  /**
   * @description Life Cycle when graph moved
   */
  // eslint-disable-next-line
  moved?: (e: MouseEvent, graph: Graph) => any
  /**
   * @description Life Cycle when graph before delete
   */
  // eslint-disable-next-line
  beforeDelete?: (graph: Graph) => any
  /**
   * @description Life Cycle when graph deleted
   */
  // eslint-disable-next-line
  deleted?: (graph: Graph) => any

  constructor(config: GraphConfig<Shape>) {
    config = deepClone(config)

    const style = new Style(config.style)

    Object.assign(this, config, {
      status: Status.STATIC,
      animationRoot: [],
      animationKeys: [],
      animationFrameState: [],
      style,
    })
  }

  static mergeDefaultShape<Shape>(
    defaultShape: Shape,
    config: GraphConfig<Partial<Shape>>,
    checker?: (config: GraphConfig<Shape>) => void
  ): GraphConfig<Shape> {
    const mergedConfig = {
      ...config,
      shape: Object.assign(defaultShape, config.shape || {}),
    }

    checker?.(mergedConfig)

    return mergedConfig
  }

  private checkRender(): void {
    if (!this.render) throw new Error('Graph has not been pushed into render!')
  }

  /**
   * @description Update graph attribute
   */
  attr(
    key: keyof GraphConfig<Shape>,
    value: Partial<GraphConfig<Shape>[typeof key]>,
    reDraw: boolean = true
  ): void {
    this.checkRender()

    const isObject = typeof this[key] === 'object'

    if (isObject) value = deepClone(value)

    const { render } = this

    if (key === 'style') {
      this.style.update(value as StyleConfig<string | RgbaValue>)
    } else if (isObject) {
      Object.assign(this[key], value)
    } else {
      // @ts-ignore
      this[key] = value
    }

    if (key === 'index') render.sortGraphsByIndex()

    if (reDraw) render.drawAllGraph()
  }

  /**
   * @description Update graphics state (with animation)
   * Only shape and style attributes are supported
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
    this.checkRender()

    if (key !== 'shape' && key !== 'style')
      throw new Error('Graph animation: Only supported shape and style animation!')

    if (typeof value !== 'object')
      throw new Error('Graph animation: Shape or style must be an object!')

    value = deepClone(value)
    if (key === 'style') value = Style.colorProcessor(value as StyleConfig<string | RgbaValue>)

    const valueRoot = this[key]
    const valueKeys = Object.keys(value!) as (keyof typeof value)[]

    const beforeValue = valueKeys.reduce<typeof value>(
      (state, currentKey) => ({
        ...state,
        [currentKey]: valueRoot[currentKey],
      }),
      Object.create(null)
    )

    const { animationFrame, animationCurve, animationDelay } = this

    const frameState = transition(animationCurve, beforeValue, value, animationFrame, true)
    this.animationQueue.push({ key, frameState: frameState as AnimationFrameStateItem<Shape>[] })

    if (wait) return

    if (animationDelay > 0) await delay(animationDelay)

    const { render } = this

    return new Promise(async resolve => {
      await render.launchAnimation()

      resolve()
    })
  }

  /**
   * @description Skip to the last frame of animation
   */
  animationEnd(): void {
    this.checkRender()

    const { animationQueue, render } = this

    animationQueue.forEach(({ key, frameState }) => Object.assign(this[key], frameState.pop()))

    this.animationQueue = []

    return render.drawAllGraph()
  }

  /**
   * @description Pause animation behavior
   */
  pauseAnimation(): void {
    this.checkRender()

    this.attr('animationPause', true)
  }

  /**
   * @description Try animate
   */
  playAnimation(): Promise<void> {
    this.checkRender()

    const { render } = this

    this.attr('animationPause', false)

    return new Promise(async resolve => {
      await render.launchAnimation()

      resolve()
    })
  }

  clone(add: boolean = true): this {
    this.checkRender()

    const { render } = this

    // @ts-ignore
    const Constructor = this.__proto__.constructor

    const config = { ...this }
    // @ts-ignore
    delete config.render

    const graph = new Constructor(config)
    if (add) render.add(graph)

    return graph
  }
}
