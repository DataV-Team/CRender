import { RingShape } from '../types/graphs/shape';
import Graph from '../core/graph.class';
import { GraphConfig, Point } from '../types/core/graph';
import { Optional } from '../types/common';
declare class Ring extends Graph<RingShape> {
    name: string;
    constructor(config: GraphConfig<Optional<RingShape>>);
    draw(): void;
    hoverCheck(point: Point): boolean;
    setGraphCenter(): void;
    move({ movementX, movementY }: MouseEvent): void;
}
export default Ring;
