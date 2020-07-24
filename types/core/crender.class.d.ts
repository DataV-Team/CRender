import Graph from './graph.class'
import { CanvasCtx } from '../types/common'
export default class CRender {
  /**
   * @description Device Pixel Ratio
   */
  readonly dpr: number
  /**
   * @description Off Screen Rendering
   */
  readonly offScreenRendering: boolean
  /**
   * @description Canvas Element
   */
  readonly canvas: HTMLCanvasElement
  /**
   * @description Off Screen Canvas Element
   */
  private readonly osCanvas?
  /**
   * @description Ctx for current rendering
   */
  ctx: CanvasCtx
  /**
   * @description Actual Canvas Context
   */
  private readonly actualCtx
  /**
   * @description Off Screen Canvas Context
   */
  private readonly osCtx?
  /**
   * @description Width and height of the canvas
   */
  readonly area: [number, number]
  /**
   * @description Whether render is in animation rendering
   */
  private animationStatus
  /**
   * @description Added graph
   */
  readonly graphs: Graph[]
  constructor(canvas: HTMLCanvasElement, offScreenRendering?: boolean)
  clearArea(): void
  /**
   * @description Sort the graphs by index
   * Give priority to index high graph in rendering
   */
  sortGraphsByIndex(): void
  drawAllGraph(immediately?: boolean): void
  private drawAllGraphDebounced
  private drawAllGraphImmediately
  private drawGraphProcessor
  add(graph: Graph | Graph[], wait?: boolean): void
  private graphAddProcessor
  delGraph(graph: Graph | Graph[], wait?: boolean): void
  private graphDelProcessor
  delAllGraph(): void
  /**
   * @description Animate the graph whose animation queue is not empty
   * and the animationPause is false
   */
  launchAnimation(): void | Promise<void>
  private animate
  /**
   * @description Extract the next frame of data from the animation queue
   * and update the graph state
   * @param timeStamp {number} Animation start timestamp
   */
  private graphTrunNextAnimationFrame
  animateAble(): boolean
  /**
   * @description Handler of CRender mousedown event
   */
  private mouseDown
  /**
   * @description Handler of CRender mousemove event
   */
  private mouseMove
  private graphMoveProcessor
  private graphHoverCheckProcessor
  /**
   * @description Handler of CRender mouseup event
   */
  private mouseUp
}
