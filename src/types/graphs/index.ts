import CRender from '../../core/crender.class'
import { GraphConfig } from '../../types/core/graph'
import { Point } from '@jiaminghi/transition/types/types/core/curves'
import Graph from '../../core/graph.class'
import { LiteralUnion } from 'types/common'

export type Draw<Shape, Cache> = (render: CRender, graph: Graph<Shape, Cache>) => void

export type HoverCheck<Shape, Cache> = (point: Point, graph: Graph<Shape, Cache>) => boolean

export type SetGraphCenter<Shape, Cache> = (graph: Graph<Shape, Cache>) => void

export type Move<Shape, Cache> = (e: MouseEvent, graph: Graph<Shape, Cache>) => void

// eslint-disable-next-line
export type GraphModel<Shape = any, Cache = any> = {
  shape: Shape

  validator: (graphConfig: GraphConfig<Shape>) => boolean

  draw: Draw<Shape, Cache>

  hoverCheck?: HoverCheck<Shape, Cache>

  setGraphCenter?: SetGraphCenter<Shape, Cache>

  move?: Move<Shape, Cache>
}

export type GraphName = LiteralUnion<
  | 'arc'
  | 'bezierCurve'
  | 'circle'
  | 'ellipse'
  | 'polyline'
  | 'rect'
  | 'regPolygon'
  | 'ring'
  | 'sector'
  | 'smoothline'
  | 'text',
  string
>
