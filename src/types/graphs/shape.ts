import { Point } from '../core/graph'
import { Optional, LiteralUnion } from '../common'
import { BezierCurve } from '@jiaminghi/bezier-curve/types/types'

export type CircleShape = {
  rx: number
  ry: number
  r: number
}

export type EllipseShape = {
  rx: number
  ry: number
  hr: number
  vr: number
}

export type RectShape = {
  x: number
  y: number
  w: number
  h: number
}

export type RingShape = {
  rx: 0
  ry: 0
  r: 0
}

export type ArcShape = {
  rx: number
  ry: number
  r: number
  startAngle: number
  endAngle: number
  clockWise: boolean
}

export type SectorShape = {
  rx: number
  ry: number
  r: number
  startAngle: number
  endAngle: number
  clockWise: boolean
}

export type RegPolygonShape = {
  rx: number
  ry: number
  r: number
  side: number
}

export type RegPolygonShapeCache = {
  points?: Point[]
} & Optional<RegPolygonShape>

export type PolylineShape = {
  points: Point[]
  close: boolean
}

export type SmoothlineShape = {
  points: Point[]
  close: boolean
}

export type SmoothlineShapeCache = {
  points: Point[]
  bezierCurve: BezierCurve
  hoverPoints: Point[]
}

export type BezierCurveShape = {
  points: BezierCurve | []
  close: boolean
}

export type BezierCurveShapeCache = {
  points: BezierCurve
  hoverPoints: Point[]
}

export type TextShape = {
  content: string
  position: [number, number]
  maxWidth: undefined | number
  rowGap: number
}

export type Shapes = LiteralUnion<
  | ArcShape
  | BezierCurveShape
  | CircleShape
  | EllipseShape
  | PolylineShape
  | RectShape
  | RegPolygonShape
  | RingShape
  | SectorShape
  | SmoothlineShape
  | TextShape,
  // eslint-disable-next-line
  any
>
