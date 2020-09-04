import { Point, GraphConfig } from '../types/core/graph';
import { SmoothlineShape } from '../types/graphs/shape';
import Graph from '../core/graph.class';
declare class Smoothline extends Graph<SmoothlineShape> {
    name: string;
    private cache;
    constructor(config: GraphConfig<Partial<SmoothlineShape>>);
    draw(): void;
    hoverCheck(point: Point): boolean;
    setGraphCenter(): void;
    move({ movementX, movementY }: MouseEvent): void;
}
export default Smoothline;
