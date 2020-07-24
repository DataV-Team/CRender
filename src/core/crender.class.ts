import Graph from './graph.class'
import { Status, AnimationQueueItem } from '../types/core/graph'
import { debounce } from '../utils/common'
import { Point } from '../types/core/graph'
import { CanvasCtx } from '../types/common'
import {
  getRotatePointPos,
  getScalePointPos,
  getTranslatePointPos,
  checkPointIsInRect,
} from '../utils/graph'
import { bound } from '../utils/decorator'

export default class CRender {
  /**
   * @description Device Pixel Ratio
   */
  readonly dpr: number = 1
  /**
   * @description Off Screen Rendering
   */
  readonly offScreenRendering: boolean = false
  /**
   * @description Canvas Element
   */
  readonly canvas!: HTMLCanvasElement
  /**
   * @description Off Screen Canvas Element
   */
  private readonly osCanvas?: OffscreenCanvas
  /**
   * @description Ctx for current rendering
   */
  public ctx!: CanvasCtx
  /**
   * @description Actual Canvas Context
   */
  private readonly actualCtx!: CanvasRenderingContext2D
  /**
   * @description Off Screen Canvas Context
   */
  private readonly osCtx?: OffscreenCanvasRenderingContext2D
  /**
   * @description Width and height of the canvas
   */
  readonly area: [number, number] = [0, 0]
  /**
   * @description Whether render is in animation rendering
   */
  private animationStatus: boolean = false
  /**
   * @description Added graph
   */
  readonly graphs: Graph[] = []

  constructor(canvas: HTMLCanvasElement, offScreenRendering: boolean = false) {
    if (!canvas) throw new Error('CRender: Missing parameters!')

    const dpr = devicePixelRatio || 1

    const ctx = canvas.getContext('2d')

    const { clientWidth, clientHeight } = canvas
    const width = clientWidth * dpr
    const height = clientHeight * dpr
    const area = [clientWidth, clientHeight]

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

    if (!offScreenRendering) return

    // Off Screen Canvas
    if (!OffscreenCanvas) {
      Object.assign(this, { offScreenRendering: false })
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
    const width = area[0] * this.dpr

    canvas.width = width
    if (offScreenRendering) osCanvas!.width = width
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

  private drawAllGraphDebounced = debounce(this.drawAllGraphImmediately, 0)

  @bound
  private drawAllGraphImmediately(): void {
    const { offScreenRendering, actualCtx, osCtx, osCanvas } = this

    this.clearArea()

    this.ctx = offScreenRendering ? osCtx! : actualCtx

    this.graphs.filter(graph => graph.visible).forEach(this.drawGraphProcessor)

    if (offScreenRendering) actualCtx.drawImage(osCanvas!, 0, 0)
  }

  @bound
  private drawGraphProcessor(graph: Graph): void {
    graph.style.setCtx(this)

    if (graph.beforeDraw) graph.beforeDraw()

    graph.draw()

    if (graph.drawed) graph.drawed()

    graph.style.restoreCtx(this)
  }

  add(graph: Graph | Graph[], wait: boolean = false): void {
    if (Array.isArray(graph)) {
      graph.forEach(this.graphAddProcessor)
    } else {
      this.graphAddProcessor(graph)
    }

    if (!wait) this.drawAllGraph()
  }

  @bound
  private graphAddProcessor(graph: Graph): void {
    if (graph.beforeAdd) graph.beforeAdd()

    graph.render = this
    graph.setGraphCenter()

    this.graphs.push(graph)
    this.sortGraphsByIndex()

    if (graph.added) graph.added()
  }

  delGraph(graph: Graph | Graph[], wait: boolean = false): void {
    if (Array.isArray(graph)) {
      ;[...graph].forEach(this.graphDelProcessor)
    } else {
      this.graphDelProcessor(graph)
    }

    if (!wait) this.drawAllGraph()
  }

  @bound
  private graphDelProcessor(graph: Graph): void {
    const { graphs } = this

    const index = graphs.findIndex(_ => _ === graph)
    if (index === -1) return

    if (graph.beforeDelete) graph.beforeDelete()

    graphs.splice(index, 1)

    if (graph.deleted) graph.deleted()
  }

  delAllGraph(): void {
    this.delGraph(this.graphs)

    this.clearArea()
  }

  /**
   * @description Animate the graph whose animation queue is not empty
   * and the animationPause is false
   */
  @bound
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

    graphs.forEach(graph => this.graphTrunNextAnimationFrame(graph, timeStamp))

    this.drawAllGraph()

    requestAnimationFrame(this.animate.bind(this, callback, timeStamp))
  }

  /**
   * @description Extract the next frame of data from the animation queue
   * and update the graph state
   * @param timeStamp {number} Animation start timestamp
   */
  private graphTrunNextAnimationFrame(graph: Graph, timeStamp: number): void {
    const { animationPause, animationDelay, animationQueue } = graph

    if (animationPause || Date.now() - timeStamp < animationDelay) return

    graph.animationQueue = animationQueue.reduce<AnimationQueueItem[]>(
      (queue, { key, frameState }) => {
        Object.assign(graph[key], frameState.shift())

        if (frameState.length) {
          return [...queue, { key, frameState }]
        } else {
          return queue
        }
      },
      []
    )
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
      this.graphMoveProcessor(activeGraph, e)
      activeGraph.status = Status.DRAG

      return
    }

    const hoverGraph = graphs.find(graph => graph.status === Status.HOVER)
    const hoverAbleGraphs = graphs.filter(
      graph => graph.hover && (graph.hoverCheck || graph.hoverRect)
    )

    const hoveredGraph = hoverAbleGraphs.find(graph =>
      this.graphHoverCheckProcessor(graph, position)
    )

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

  private graphMoveProcessor(graph: Graph, e: MouseEvent): void {
    if (!graph.move) return

    if (graph.beforeMove) graph.beforeMove(e)

    graph.move(e)

    if (graph.moved) graph.moved(e)

    graph.setGraphCenter(e)
  }

  private graphHoverCheckProcessor(graph: Graph, point: Point): boolean {
    const { hoverRect, style } = graph
    const { graphCenter, rotate, scale, translate } = style

    if (!graph.hoverCheck) return false

    if (graphCenter) {
      if (rotate) point = getRotatePointPos(-rotate, point, graphCenter)

      if (scale)
        point = getScalePointPos(scale.map(s => 1 / s) as [number, number], point, graphCenter)

      if (translate)
        point = getTranslatePointPos(translate.map(v => v * -1) as [number, number], point)
    }

    if (hoverRect) return checkPointIsInRect(point, ...hoverRect)

    return graph.hoverCheck(point)
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
