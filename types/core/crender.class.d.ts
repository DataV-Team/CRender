import Graph from './graph.class'
import { GraphConfig } from '../types/core/graph'
export default class CRender {
  /**
   * @description Canvas Element
   */
  canvas: HTMLCanvasElement
  /**
   * @description Context of the canvas
   */
  ctx: CanvasRenderingContext2D
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
  constructor(canvas: HTMLCanvasElement)
  clearArea(): void
  /**
   * @description Sort the graphs by index
   * Give priority to index high graph in rendering
   */
  sortGraphsByIndex(): void
  drawAllGraph(): void
  add(config: GraphConfig): null | Graph
  delGraph(graph: Graph): void
  delAllGraph(): void
  clone(graph: Graph): Graph
  /**
   * @description Animate the graph whose animation queue is not empty
   * and the animationPause is false
   */
  launchAnimation(): void | Promise<void>
  private animate
  animateAble(): boolean
  /**
   * @description Handler of CRender mousedown event
   */
  private mouseDown
  /**
   * @description Handler of CRender mousemove event
   */
  private mouseMove
  /**
   * @description Handler of CRender mouseup event
   * @return {Undefined} Void
   */
  private mouseUp
}
