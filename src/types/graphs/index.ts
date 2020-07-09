import Arc from '../../graphs/arc'
import BezierCurve from '../../graphs/bezierCurve'
import Circle from '../../graphs/circle'
import Ellipse from '../../graphs/ellipse'
import Polyline from '../../graphs/polyline'
import Rect from '../../graphs/rect'
import RegPolygon from '../../graphs/regPolygon'
import Ring from '../../graphs/ring'
import Sector from '../../graphs/sector'
import Smoothline from '../../graphs/smoothline'
import Text from '../../graphs/text'
import Graph from '../../core/graph.class'

export type GraphName =
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
  | 'text'

export type UnionGraph =
  | typeof Arc
  | typeof BezierCurve
  | typeof Circle
  | typeof Ellipse
  | typeof Polyline
  | typeof Rect
  | typeof RegPolygon
  | typeof Ring
  | typeof Sector
  | typeof Smoothline
  | typeof Text
  | typeof Graph

export type Graphs = {
  arc: Arc
  bezierCurve: BezierCurve
  circle: Circle
  ellipse: Ellipse
  polyline: Polyline
  rect: Rect
  regPolygon: RegPolygon
  ring: Ring
  sector: Sector
  smoothline: Smoothline
  text: Text
}

export type GraphNameInfer<T> = T extends { name: infer P } ? P : GraphName
