import { Point, GraphConfig } from '../types/core/graph'
import { BezierCurveShape } from '../types/graphs/shape'
import Graph from '../core/graph.class'
import { Optional } from '../types/common'
declare class BezierCurve extends Graph<BezierCurveShape> {
  name: string
  private cache
  constructor(config: GraphConfig<Optional<BezierCurveShape>>)
  draw(): void
  hoverCheck(point: Point): boolean
  setGraphCenter(): void
  move({ movementX, movementY }: MouseEvent): void
}
export default BezierCurve
