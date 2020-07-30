import { RectShape } from '../types/graphs/shape'
import Graph from '../core/graph.class'
import { GraphConfig, Point } from '../types/core/graph'
declare class Rect extends Graph<RectShape> {
  name: string
  constructor(config: GraphConfig<Partial<RectShape>>)
  draw(): void
  hoverCheck(point: Point): boolean
  setGraphCenter(): void
  move({ movementX, movementY }: MouseEvent): void
}
export default Rect
