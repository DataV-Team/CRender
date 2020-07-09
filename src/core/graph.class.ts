import {
  HoverRect,
  Status,
  GraphConfig,
  Point,
  AnimationKey,
  AnimationQueueItem,
  AnimationFrameStateItem,
} from '../types/core/graph'
import { GraphName } from '../types/graphs/index'
import { StyleConfig } from '../types/core/style'
import { Optional } from '../types/common'
import Style from './style.class'
import CRender from './crender.class'
import {
  getRotatePointPos,
  getScalePointPos,
  getTranslatePointPos,
  checkPointIsInRect,
  delay,
} from '../utils/graph'
import { deepClone } from '../utils/common'
import transition from '@jiaminghi/transition'
import { RgbaValue } from '@jiaminghi/color/types/types'
import { EaseCurve } from '@jiaminghi/transition/types/types/core/index'

// eslint-disable-next-line
export default class Graph<Shape = any> {
  /**
   * @description Graph Render
   */
  render!: CRender
  /**
   * @description Graph name
   */
  name!: GraphName
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
  setGraphCenter(): void {}
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
   * @description Life Cycle when graph added
   * Called in subclasses
   */
  // eslint-disable-next-line
  added?: () => any
  /**
   * @description Life Cycle when graph before draw
   */
  // eslint-disable-next-line
  beforeDraw?: () => any
  /**
   * @description Life Cycle when graph drawed
   */
  // eslint-disable-next-line
  drawed?: () => any
  /**
   * @description Life Cycle when graph before move
   */
  // eslint-disable-next-line
  beforeMove?: (e: MouseEvent) => any
  /**
   * @description Life Cycle when graph moved
   */
  // eslint-disable-next-line
  moved?: (e: MouseEvent) => any
  /**
   * @description Life Cycle when graph before delete
   */
  // eslint-disable-next-line
  beforeDelete?: () => any
  /**
   * @description Life Cycle when graph deleted
   */
  // eslint-disable-next-line
  deleted?: () => any

  constructor(config: GraphConfig<Shape>, render: CRender) {
    const style = new Style(config.style)

    Object.assign(this, config, {
      status: Status.STATIC,
      animationRoot: [],
      animationKeys: [],
      animationFrameState: [],
      style,
      render,
    })

    this.setGraphCenter()

    // life cycle added
    if (this.added) this.added()
  }

  static mergeDefaultShape<Shape>(
    defaultShape: Optional<Shape>,
    config: GraphConfig<Shape>,
    checker?: (config: GraphConfig<Shape>) => void
  ): GraphConfig<Shape> {
    const mergedConfig = {
      ...config,
      shape: Object.assign(defaultShape, config.shape || {}),
    }

    if (checker) checker(mergedConfig)

    return mergedConfig
  }

  drawProcessor(): void {
    const { render } = this
    const { ctx, dpr } = render

    this.style.setCtx(ctx, dpr)

    if (this.beforeDraw) this.beforeDraw()

    this.draw()

    if (this.drawed) this.drawed()

    this.style.restoreCtx(ctx)
  }

  hoverCheckProcessor(point: Point): boolean {
    const { hoverRect, style } = this
    const { graphCenter, rotate, scale, translate } = style

    if (!this.hoverCheck) return false

    if (graphCenter) {
      if (rotate) point = getRotatePointPos(-rotate, point, graphCenter)

      if (scale)
        point = getScalePointPos(scale.map(s => 1 / s) as [number, number], point, graphCenter)

      if (translate)
        point = getTranslatePointPos(translate.map(v => v * -1) as [number, number], point)
    }

    if (hoverRect) return checkPointIsInRect(point, ...hoverRect)

    return this.hoverCheck(point)
  }

  moveProcessor(e: MouseEvent): void {
    if (!this.move) return

    if (this.beforeMove) this.beforeMove(e)

    this.move(e)

    if (this.moved) this.moved(e)

    this.setGraphCenter()
  }

  /**
   * @description Update graph attribute
   */
  attr(
    key: keyof GraphConfig<Shape>,
    value: Optional<GraphConfig<Shape>[typeof key]>,
    reDraw: boolean = true
  ): void {
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
  async animation(key: 'shape', value: Optional<Shape>, wait?: boolean): Promise<void>
  async animation(
    key: 'style',
    value: StyleConfig<string | RgbaValue>,
    wait?: boolean
  ): Promise<void>
  async animation(
    key: AnimationKey,
    value: Optional<Shape> | StyleConfig<string | RgbaValue>,
    wait: boolean = false
  ): Promise<void> {
    if (key !== 'shape' && key !== 'style') {
      console.error('Graph animation: Only supported shape and style animation!')

      return
    }

    if (typeof value !== 'object') {
      console.error('Graph animation: Shape or style must be an object!')

      return
    }

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
   * @description Extract the next frame of data from the animation queue
   * and update the graph state
   * @param timeStamp {number} Animation start timestamp
   */
  turnNextAnimationFrame(timeStamp: number): void {
    const { animationPause, animationDelay, animationQueue } = this

    if (animationPause || Date.now() - timeStamp < animationDelay) return

    this.animationQueue = animationQueue.reduce<AnimationQueueItem<Shape>[]>(
      (queue, { key, frameState }) => {
        Object.assign(this[key], frameState.shift())

        if (frameState.length) {
          return [...queue, { key, frameState }]
        } else {
          return queue
        }
      },
      []
    )
  }

  /**
   * @description Skip to the last frame of animation
   */
  animationEnd(): void {
    const { animationQueue, render } = this

    animationQueue.forEach(({ key, frameState }) => Object.assign(this[key], frameState.pop()))

    this.animationQueue = []

    return render.drawAllGraph()
  }

  /**
   * @description Pause animation behavior
   */
  pauseAnimation(): void {
    this.attr('animationPause', true)
  }

  /**
   * @description Try animate
   */
  playAnimation(): Promise<void> {
    const { render } = this

    this.attr('animationPause', false)

    return new Promise(async resolve => {
      await render.launchAnimation()

      resolve()
    })
  }

  /**
   * @description Processor of delete
   */
  delProcessor(): void {
    const { graphs } = this.render

    const index = graphs.findIndex(graph => graph === this)
    if (index === -1) return

    if (this.beforeDelete) this.beforeDelete()

    graphs.splice(index, 1)

    if (this.deleted) this.deleted()
  }
}
