import Graph from './graph.class'
import { GraphConfig, Status } from '../types/core/graph'
import { deepClone, debounce } from '../utils/common'
import { Point } from '../types/core/graph'
import { CanvasCtx } from '../types/common'
import { Graphs, GraphName } from '../types/graphs/index'
import GRAPHS from '../graphs'
import Arc from '../graphs/arc'
import BezierCurve from '../graphs/bezierCurve'
import Circle from '../graphs/circle'
import Ellipse from '../graphs/ellipse'
import Polyline from '../graphs/polyline'
import RegPolygon from '../graphs/regPolygon'
import Rect from '../graphs/rect'
import Ring from '../graphs/ring'
import Sector from '../graphs/sector'
import Smoothline from '../graphs/smoothline'
import Text from '../graphs/text'

export default class CRender {
  /**
   * @description Device Pixel Ratio
   */
  dpr: number = 1
  /**
   * @description Off Screen Rendering
   */
  offScreenRendering: boolean = false
  /**
   * @description Canvas Element
   */
  canvas!: HTMLCanvasElement
  /**
   * @description Off Screen Canvas Element
   */
  osCanvas?: OffscreenCanvas
  /**
   * @description Ctx for current rendering
   */
  ctx!: CanvasCtx
  /**
   * @description Actual Canvas Context
   */
  actualCtx!: CanvasRenderingContext2D
  /**
   * @description Off Screen Canvas Context
   */
  osCtx!: OffscreenCanvasRenderingContext2D
  /**
   * @description Width and height of the canvas
   */
  area: [number, number] = [0, 0]
  /**
   * @description Whether render is in animation rendering
   */
  animationStatus: boolean = false
  /**
   * @description Added graph
   */
  graphs: Graph[] = []

  constructor(canvas: HTMLCanvasElement, offScreenRendering: boolean = false) {
    if (!canvas) throw new Error('CRender: Missing parameters!')

    const dpr = devicePixelRatio || 1

    const ctx = canvas.getContext('2d')

    const { clientWidth, clientHeight } = canvas
    const width = clientWidth * dpr
    const height = clientHeight * dpr
    const area = [width, height]

    canvas.setAttribute('width', width + '')
    canvas.setAttribute('height', height + '')

    Object.assign(this, {
      dpr,
      area,
      canvas,
      ctx,
      actualCtx: ctx,
    })

    canvas.addEventListener('mousedown', this.mouseDown.bind(this))
    canvas.addEventListener('mousemove', this.mouseMove.bind(this))
    canvas.addEventListener('mouseup', this.mouseUp.bind(this))

    // Off Screen Canvas
    if (!OffscreenCanvas && offScreenRendering) {
      console.warn('Your browser does not support off-screen rendering!')

      return
    }

    const osCanvas = new OffscreenCanvas(width, height)
    const osCtx = osCanvas!.getContext('2d')

    Object.assign(this, {
      osCanvas,
      osCtx,
      offScreenRendering,
    })
  }

  clearArea(): void {
    const { canvas, osCanvas, area, offScreenRendering } = this

    canvas.width = area[0]
    if (offScreenRendering) osCanvas!.width = area[0]
  }

  /**
   * @description Sort the graphs by index
   * Give priority to index high graph in rendering
   */
  sortGraphsByIndex(): void {
    const { graphs } = this

    graphs.sort(({ index: a }, { index: b }) => a - b)
  }

  drawAllGraph(immediately: boolean = false): void {
    if (immediately) {
      this.drawAllGraphImmediately()
    } else {
      this.drawAllGraphDebounced()
    }
  }

  private drawAllGraphDebounced = debounce(this.drawAllGraphImmediately.bind(this), 0)

  private drawAllGraphImmediately(): void {
    const { offScreenRendering, actualCtx, osCtx, osCanvas } = this

    this.clearArea()

    this.ctx = offScreenRendering ? osCtx! : actualCtx

    this.graphs.filter(graph => graph.visible).forEach(graph => graph.drawProcessor())

    if (offScreenRendering) actualCtx.drawImage(osCanvas!, 0, 0)
  }

  add<T extends GraphConfig & { name: 'arc' }>(config: T, wait?: boolean): Arc
  add<T extends GraphConfig & { name: 'bezierCurve' }>(config: T, wait?: boolean): BezierCurve
  add<T extends GraphConfig & { name: 'circle' }>(config: T, wait?: boolean): Circle
  add<T extends GraphConfig & { name: 'ellipse' }>(config: T, wait?: boolean): Ellipse
  add<T extends GraphConfig & { name: 'polyline' }>(config: T, wait?: boolean): Polyline
  add<T extends GraphConfig & { name: 'rect' }>(config: T, wait?: boolean): Rect
  add<T extends GraphConfig & { name: 'regPolygon' }>(config: T, wait?: boolean): RegPolygon
  add<T extends GraphConfig & { name: 'ring' }>(config: T, wait?: boolean): Ring
  add<T extends GraphConfig & { name: 'sector' }>(config: T, wait?: boolean): Sector
  add<T extends GraphConfig & { name: 'smoothline' }>(config: T, wait?: boolean): Smoothline
  add<T extends GraphConfig & { name: 'text' }>(config: T, wait?: boolean): Text
  add<T extends GraphConfig & { name: GraphName }>(
    config: T,
    wait: boolean = false
  ): Graphs[GraphName] {
    const { name } = config

    if (!name) throw new Error('CRender add: Missing parameters!')

    const Graph = GRAPHS[name]
    if (!Graph) throw new Error(`CRender add: Graph ${name} has not been registered!`)

    const graph = new Graph(config, this)

    this.addGraph(graph, wait)

    return graph
  }

  addGraph(graph: Graph, wait: boolean): void {
    this.graphs.push(graph)

    this.sortGraphsByIndex()

    if (!wait) this.drawAllGraph()
  }

  delGraph(graph: Graph): void {
    graph.delProcessor()

    this.drawAllGraph()
  }

  delAllGraph(): void {
    this.graphs.forEach(graph => graph.delProcessor())

    this.clearArea()
  }

  clone(graph: Arc, wait?: boolean): Arc
  clone(graph: BezierCurve, wait?: boolean): BezierCurve
  clone(graph: Circle, wait?: boolean): Circle
  clone(graph: Ellipse, wait?: boolean): Ellipse
  clone(graph: Polyline, wait?: boolean): Polyline
  clone(graph: Rect, wait?: boolean): Rect
  clone(graph: RegPolygon, wait?: boolean): RegPolygon
  clone(graph: Ring, wait?: boolean): Ring
  clone(graph: Sector, wait?: boolean): Sector
  clone(graph: Smoothline, wait?: boolean): Smoothline
  clone(graph: Text, wait?: boolean): Text
  clone<T extends Graph>(graph: T, wait: boolean = false): T {
    const config = deepClone({ ...graph })

    // @ts-ignore
    return this.add(config, wait)
  }

  /**
   * @description Animate the graph whose animation queue is not empty
   * and the animationPause is false
   */
  launchAnimation(): void | Promise<void> {
    const { animationStatus } = this

    if (animationStatus) return

    this.animationStatus = true

    return new Promise(resolve => {
      this.animate(() => {
        this.animationStatus = false

        resolve()
      }, Date.now())
    })
  }

  private animate(callback: Function, timeStamp: number): void {
    const { graphs } = this

    if (!this.animateAble()) {
      callback()

      return
    }

    graphs.forEach(graph => graph.turnNextAnimationFrame(timeStamp))

    this.drawAllGraph()

    requestAnimationFrame(this.animate.bind(this, callback, timeStamp))
  }

  animateAble(): boolean {
    const { graphs } = this

    return !!graphs.find(graph => !graph.animationPause && graph.animationQueue.length)
  }

  /**
   * @description Handler of CRender mousedown event
   */
  private mouseDown(): void {
    const { graphs } = this

    const hoverGraph = graphs.find(graph => graph.status === Status.HOVER)

    if (!hoverGraph) return

    hoverGraph.status = Status.ACTIVE
  }

  /**
   * @description Handler of CRender mousemove event
   */
  private mouseMove(e: MouseEvent): void {
    const { offsetX, offsetY } = e
    const position: Point = [offsetX, offsetY]

    const { graphs } = this

    const activeGraph = graphs.find(
      graph => graph.status === Status.ACTIVE || graph.status === Status.DRAG
    )

    // Active Graph | Drag Able | Move Able
    if (activeGraph && activeGraph.drag && activeGraph.move) {
      activeGraph.moveProcessor(e)
      activeGraph.status = Status.DRAG

      return
    }

    const hoverGraph = graphs.find(graph => graph.status === Status.HOVER)
    const hoverAbleGraphs = graphs.filter(
      graph => graph.hover && (graph.hoverCheck || graph.hoverRect)
    )

    const hoveredGraph = hoverAbleGraphs.find(graph => graph.hoverCheckProcessor(position))

    // Hover Graph
    if (hoveredGraph) {
      document.body.style.cursor = hoveredGraph.style.hoverCursor
    } else {
      document.body.style.cursor = 'default'
    }

    // No hover graph
    if (!hoveredGraph && !hoverGraph) return
    // Same hover graph
    if (hoveredGraph === hoverGraph) return

    // No hoverd graph But before had
    if (!hoveredGraph && hoverGraph) {
      if (hoverGraph.onMouseOuter) hoverGraph.onMouseOuter(e)

      hoverGraph.status = Status.STATIC

      return
    }

    // Only has hovered graph
    if (hoveredGraph && !hoverGraph) {
      if (hoveredGraph.onMouseEnter) hoveredGraph.onMouseEnter(e)

      hoveredGraph.status = Status.HOVER

      return
    }

    // Not a same graph
    if (hoverGraph!.onMouseOuter) hoverGraph!.onMouseOuter(e)
    hoverGraph!.status = Status.STATIC

    if (hoveredGraph!.onMouseEnter) hoveredGraph!.onMouseEnter(e)
    hoveredGraph!.status = Status.HOVER
  }

  /**
   * @description Handler of CRender mouseup event
   */
  private mouseUp(e: MouseEvent): void {
    const { graphs } = this

    const activeGraph = graphs.find(graph => graph.status === Status.ACTIVE)
    const dragGraph = graphs.find(graph => graph.status === Status.DRAG)

    if (activeGraph && activeGraph.onClick) activeGraph.onClick(e)

    graphs.forEach(graph => (graph.status = Status.STATIC))

    if (activeGraph) activeGraph.status = Status.HOVER
    if (dragGraph) dragGraph.status = Status.HOVER
  }
}
