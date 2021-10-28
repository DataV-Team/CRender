import { StyleConfig } from './style'
import { EaseCurve } from '@jiaminghi/transition/types/types/core/index'
import { RgbaValue } from '@jiaminghi/color/types/types'
import { Graph } from '../..'

export type HoverRect = [number, number, number, number]

export type Point = [number, number]

export type HoverCheck = (point: Point) => boolean

export type Move = (e: MouseEvent) => void

// eslint-disable-next-line
export type GraphConfig<Shape = any> = {
  /**
   * @description Graph shape
   */
  shape: Shape
  /**
   * @description Graph style
   */
  style?: StyleConfig<string | RgbaValue>
  /**
   * @description Weather to render graph
   */
  visible?: boolean
  /**
   * @description Whether to enable drag
   */
  drag?: boolean
  /**
   * @description Whether to enable hover
   */
  hover?: boolean
  /**
   * @description Graph rendering index
   *  Give priority to index high graph in rendering
   */
  index?: number
  /**
   * @description Animation delay time(ms)
   */
  animationDelay?: number
  /**
   * @description Number of animation frames
   */
  animationFrame?: number
  /**
   * @description Animation dynamic curve (Supported by transition)
   * @link https://github.com/jiaming743/Transition
   */
  animationCurve?: EaseCurve
  /**
   * @description Weather to pause graph animation
   */
  animationPause?: boolean
  /**
   * @description Rectangular hover detection zone
   *  Use this method for hover detection first
   * @example hoverRect = [0, 0, 100, 100] // [Rect start x, y, Rect width, height]
   */
  hoverRect?: HoverRect
  /**
   * @description Mouse enter event handler
   */
  onMouseEnter?: () => void
  /**
   * @description Mouse outer event handler
   */
  onMouseOuter?: () => void
  /**
   * @description Mouse click event handler
   */
  onClick?: () => void
  /**
   * @description Funciton of draw graph
   */
  draw?: () => void
  /**
   * @description Function of set Graph center
   */
  setGraphCenter?: (e?: MouseEvent) => void
  /**
   * @description Funciton of check graph is hovered
   */
  hoverCheck?: (point: Point) => boolean
  /**
   * @description Function of Graph move
   */
  move?: (e: MouseEvent) => void
  /**
   * @description Life cycle beforeAdd
   */
  // eslint-disable-next-line
  beforeAdd?: (graph: Graph) => any
  /**
   * @description Life cycle added
   */
  // eslint-disable-next-line
  added?: (graph: Graph) => any
  /**
   * Life Cycle when graph before draw
   */
  // eslint-disable-next-line
  beforeDraw?: (graph: Graph) => any
  /**
   * Life Cycle when graph drawed
   */
  // eslint-disable-next-line
  drawed?: (graph: Graph) => any
  /**
   * Life Cycle when graph before move
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
}

export enum Status {
  STATIC = 'STATIC',
  HOVER = 'HOVER',
  ACTIVE = 'ACTIVE',
  DRAG = 'DRAG',
}

export type AnimationKey = 'shape' | 'style'

export type AnimationFrameStateItem<Shape> = Partial<Shape> | StyleConfig<RgbaValue>

// eslint-disable-next-line
export type AnimationQueueItem<Shape = any> = {
  key: AnimationKey
  frameState: AnimationFrameStateItem<Shape>[]
}
