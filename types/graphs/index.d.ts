import { GraphModel } from 'types/graphs'
declare const GRAPHS: Map<string, GraphModel<any, any>>
export declare function extendNewGraph<Shape, Cache>(
  name: string,
  graphModel: GraphModel<Shape, Cache>
): void
export default GRAPHS
