import { GraphModel, GraphName } from 'types/graphs'
import arc from './arc'
import bezierCurve from './bezierCurve'
import circle from './circle'
import ellipse from './ellipse'
import polyline from './polyline'
import rect from './rect'
import regPolygon from './regPolygon'
import ring from './ring'
import sector from './sector'
import smoothline from './smoothline'
import text from './text'

const GRAPHS = new Map<GraphName, GraphModel>([
  ['arc', arc],
  ['bezierCurve', bezierCurve],
  ['circle', circle],
  ['ellipse', ellipse],
  ['polyline', polyline],
  ['rect', rect],
  ['regPolygon', regPolygon],
  ['ring', ring],
  ['sector', sector],
  ['smoothline', smoothline],
  ['text', text],
])

export function extendNewGraph<Shape, Cache>(
  name: string,
  graphModel: GraphModel<Shape, Cache>
): void {
  if (!name || !graphModel) {
    console.error('CRender extendNewGraph: Missing Parameters!')

    return
  }

  if (!graphModel.shape) {
    console.error('CRender extendNewGraph: Required attribute of shape to extendNewGraph!')

    return
  }

  if (!graphModel.validator) {
    console.error('CRender extendNewGraph: Required function of validator to extendNewGraph!')

    return
  }

  if (!graphModel.draw) {
    console.error('CRender extendNewGraph: Required function of draw to extendNewGraph!')

    return
  }

  GRAPHS.set(name, graphModel)
}

export default GRAPHS
