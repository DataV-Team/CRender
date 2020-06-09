import Graph from './graph.class'
import GRAPHS from '../graphs/index'
import { GraphConfig, Status } from '../types/core/graph'
import { deepClone } from '../utils/common'
import { Point } from '../types/core/graph'

export default class CRender {
  /**
   * @description Canvas Element
   */
  canvas!: HTMLCanvasElement
  /**
   * @description Context of the canvas
   */
  ctx!: CanvasRenderingContext2D
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

  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) {
      console.error('CRender: Missing parameters!')

      return
    }

    const ctx = canvas.getContext('2d')

    const { clientWidth, clientHeight } = canvas
    const area = [clientWidth, clientHeight]

    canvas.setAttribute('width', clientWidth + '')
    canvas.setAttribute('height', clientHeight + '')

    Object.assign(this, { canvas, ctx, area })

    canvas.addEventListener('mousedown', this.mouseDown.bind(this))
    canvas.addEventListener('mousemove', this.mouseMove.bind(this))
    canvas.addEventListener('mouseup', this.mouseUp.bind(this))
  }

  clearArea(): void {
    const { canvas, area } = this

    canvas.width = area[0]
  }

  /**
   * @description Sort the graphs by index
   * Give priority to index high graph in rendering
   */
  sortGraphsByIndex(): void {
    const { graphs } = this

    graphs.sort(({ index: a }, { index: b }) => a - b)
  }

  drawAllGraph(): void {
    this.clearArea()

    this.graphs.filter(graph => graph.visible).forEach(graph => graph.drawProcessor())
  }

  add(config: GraphConfig, wait: boolean = false): null | Graph {
    const { name } = config

    if (!name) {
      console.error('CRender add: Missing parameters!')

      return null
    }

    const graphConfig = GRAPHS.get(name)

    if (!graphConfig) {
      console.warn('CRender add: No corresponding graph configuration found!')

      return null
    }

    if (!graphConfig.validator(config)) return null

    const graph = new Graph(graphConfig, config, this)

    this.graphs.push(graph)

    this.sortGraphsByIndex()

    if (!wait) this.drawAllGraph()

    return graph
  }

  delGraph(graph: Graph): void {
    graph.delProcessor()

    this.drawAllGraph()
  }

  delAllGraph(): void {
    this.graphs.forEach(graph => graph.delProcessor())

    this.clearArea()
  }

  clone(graph: Graph): Graph {
    const config = deepClone({ ...graph })

    return this.add((config as unknown) as GraphConfig)!
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
   * @return {Undefined} Void
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
