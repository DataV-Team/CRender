import Arc from './arc'
import BezierCurve from './bezierCurve'
import Circle from './circle'
import Ellipse from './ellipse'
import Polyline from './polyline'
import Rect from './rect'
import RegPolygon from './regPolygon'
import Ring from './ring'
import Sector from './sector'
import Smoothline from './smoothline'
import Text from './text'
import { GraphName, UnionGraph } from '../types/graphs'

export const GRAPHS: Record<GraphName, UnionGraph> = {
  arc: Arc,
  bezierCurve: BezierCurve,
  circle: Circle,
  ellipse: Ellipse,
  polyline: Polyline,
  rect: Rect,
  regPolygon: RegPolygon,
  ring: Ring,
  sector: Sector,
  smoothline: Smoothline,
  text: Text,
}

// const GRAPHS = new Map<GraphName, GraphModel>([
//   ['arc', arc],
//   ['bezierCurve', bezierCurve],
//   ['circle', circle],
//   ['ellipse', ellipse],
//   ['polyline', polyline],
//   ['rect', rect],
//   ['regPolygon', regPolygon],
//   ['ring', ring],
//   ['sector', sector],
//   ['smoothline', smoothline],
//   ['text', text],
// ])

// export function extendNewGraph<Shape, Cache>(
//   name: string,
//   graphModel: GraphModel<Shape, Cache>
// ): void {
//   if (!name || !graphModel) {
//     console.error('CRender extendNewGraph: Missing Parameters!')

//     return
//   }

//   if (!graphModel.shape) {
//     console.error('CRender extendNewGraph: Required attribute of shape to extendNewGraph!')

//     return
//   }

//   if (!graphModel.validator) {
//     console.error('CRender extendNewGraph: Required function of validator to extendNewGraph!')

//     return
//   }

//   if (!graphModel.draw) {
//     console.error('CRender extendNewGraph: Required function of draw to extendNewGraph!')

//     return
//   }

//   GRAPHS.set(name, graphModel)
// }

export default GRAPHS
