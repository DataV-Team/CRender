import { HoverRect, Status, GraphConfig, Point, AnimationQueueItem } from '../types/core/graph'
import {
  GraphModel,
  Draw,
  SetGraphCenter,
  HoverCheck,
  Move,
  GraphName,
} from '../types/graphs/index'
import { StyleConfig } from '../types/core/style'
import { Optional } from '../types/common'
import { RgbaValue } from '@jiaminghi/color/types/types'
import { EaseCurve } from '@jiaminghi/transition/types/types/core/index'
import Style from './style'
import CRender from './crender.class'
export default class Graph<Shape = any, Cache = any> {
  /**
   * @description Graph Render
   */
  render: CRender
  /**
   * @description Graph name
   */
  name: GraphName
  /**
   * @description Graph shape
   */
  shape: Shape
  /**
   * @description Graph style
   */
  style: Style
  /**
   * @description Weather to render graph
   */
  visible: boolean
  /**
   * @description Whether to enable drag
   */
  drag: boolean
  /**
   * @description Whether to enable hover
   */
  hover: boolean
  /**
   * @description Graph rendering index
   *  Give priority to index high graph in rendering
   */
  index: number
  /**
   * @description Animation delay time(ms)
   */
  animationDelay: number
  /**
   * @description Number of animation frames
   */
  animationFrame: number
  /**
   * @description Animation dynamic curve (Supported by transition)
   * @link https://github.com/jiaming743/Transition
   */
  animationCurve: EaseCurve
  /**
   * @description Weather to pause graph animation
   */
  animationPause: boolean
  /**
   * @description Rectangular hover detection zone
   *  Use this method for hover detection first
   * @example hoverRect = [0, 0, 100, 100] // [Rect start x, y, Rect width, height]
   */
  hoverRect?: HoverRect
  /**
   * @description Mouse enter event handler
   */
  onMouseEnter?: (e: MouseEvent) => any
  /**
   * @description Mouse outer event handler
   */
  onMouseOuter?: (e: MouseEvent) => any
  /**
   * @description Mouse click event handler
   */
  onClick?: (e: MouseEvent) => any
  /**
   * @description Graph current status
   */
  status: Status
  /**
   * @description Graph animation frame state
   */
  animationQueue: AnimationQueueItem<Shape>[]
  /**
   * @description Graph animation cache
   */
  cache: Cache
  /**
   * @description Funciton of draw graph
   */
  draw: Draw<Shape, Cache>
  /**
   * @description Function of set Graph center
   */
  setGraphCenter?: SetGraphCenter<Shape, Cache>
  /**
   * @description Funciton of check graph is hovered
   */
  hoverCheck?: HoverCheck<Shape, Cache>
  /**
   * @description Function of Graph move
   */
  move?: Move<Shape, Cache>
  /**
   * @description Life Cycle when graph added
   */
  added?: Function
  /**
   * @description Life Cycle when graph before draw
   */
  beforeDraw?: (render: CRender) => any
  /**
   * @description Life Cycle when graph drawed
   */
  drawed?: (render: CRender) => any
  /**
   * @description Life Cycle when graph before move
   */
  beforeMove?: (e: MouseEvent) => any
  /**
   * @description Life Cycle when graph moved
   */
  moved?: (e: MouseEvent) => any
  /**
   * @description Life Cycle when graph before delete
   */
  beforeDelete?: () => any
  /**
   * @description Life Cycle when graph deleted
   */
  deleted?: () => any
  constructor(graphModel: GraphModel<Shape>, config: GraphConfig<Shape>, render: CRender)
  drawProcessor(): void
  hoverCheckProcessor(point: Point): boolean
  moveProcessor(e: MouseEvent): void
  /**
   * @description Update graph attribute
   */
  attr(
    key: keyof GraphConfig<Shape>,
    value: Optional<GraphConfig<Shape>[typeof key]>,
    reDraw?: boolean
  ): void
  /**
   * @description Update graphics state (with animation)
   * Only shape and style attributes are supported
   */
  animation(key: 'shape', value: Optional<Shape>, wait: boolean): Promise<void>
  animation(key: 'style', value: StyleConfig<string | RgbaValue>, wait: boolean): Promise<void>
  /**
   * @description Extract the next frame of data from the animation queue
   * and update the graph state
   * @param timeStamp {number} Animation start timestamp
   */
  turnNextAnimationFrame(timeStamp: number): void
  /**
   * @description Skip to the last frame of animation
   */
  animationEnd(): void
  /**
   * @description Pause animation behavior
   */
  pauseAnimation(): void
  /**
   * @description Try animate
   */
  playAnimation(): Promise<void>
  /**
   * @description Processor of delete
   */
  delProcessor(): void
}
