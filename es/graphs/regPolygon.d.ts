import { RegPolygonShape } from '../types/graphs/shape';
import Graph from '../core/graph.class';
import { GraphConfig, Point } from '../types/core/graph';
declare class RegPolygon extends Graph<RegPolygonShape> {
    name: string;
    private cache;
    constructor(config: GraphConfig<Partial<RegPolygonShape>>);
    draw(): void;
    hoverCheck(point: Point): boolean;
    setGraphCenter(): void;
    move({ movementX, movementY }: MouseEvent): void;
}
export default RegPolygon;
