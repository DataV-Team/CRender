import { EllipseShape } from '../types/graphs/shape'
import { Point, GraphConfig } from '../types/core/graph'
import Graph from '../core/graph.class'
declare class Ellipse extends Graph<EllipseShape> {
  name: string
  constructor(config: GraphConfig<Partial<EllipseShape>>)
  draw(): void
  hoverCheck(point: Point): boolean
  setGraphCenter(): void
  move({ movementX, movementY }: MouseEvent): void
}
export default Ellipse
