import Graph from './graph.class'
import { CanvasCtx } from '../types/common'
export default class CRender {
  /**
   * @description Device Pixel Ratio
   */
  dpr: number
  /**
   * @description Off Screen Rendering
   */
  offScreenRendering: boolean
  /**
   * @description Canvas Element
   */
  canvas: HTMLCanvasElement
  /**
   * @description Off Screen Canvas Element
   */
  osCanvas?: OffscreenCanvas
  /**
   * @description Ctx for current rendering
   */
  ctx: CanvasCtx
  /**
   * @description Actual Canvas Context
   */
  actualCtx: CanvasRenderingContext2D
  /**
   * @description Off Screen Canvas Context
   */
  osCtx: OffscreenCanvasRenderingContext2D
  /**
   * @description Width and height of the canvas
   */
  area: [number, number]
  /**
   * @description Whether render is in animation rendering
   */
  animationStatus: boolean
  /**
   * @description Added graph
   */
  graphs: Graph[]
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
