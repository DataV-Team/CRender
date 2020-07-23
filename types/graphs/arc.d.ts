import Graph from '../core/graph.class';
import { ArcShape } from '../types/graphs/shape';
import { GraphConfig, Point } from '../types/core/graph';
import { Optional } from '../types/common';
declare class Arc extends Graph<ArcShape> {
    name: string;
    constructor(config: GraphConfig<Optional<ArcShape>>);
    draw(): void;
    hoverCheck(point: Point): boolean;
    setGraphCenter(): void;
    move({ movementX, movementY }: MouseEvent): void;
}
export default Arc;
