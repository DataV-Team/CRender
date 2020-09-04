import { TextShape } from '../types/graphs/shape';
import { Point, GraphConfig } from '../types/core/graph';
import Graph from '../core/graph.class';
declare class Text extends Graph<TextShape> {
    name: string;
    private cache;
    constructor(config: GraphConfig<Partial<TextShape>>);
    draw(): void;
    private setCache;
    setGraphCenter(): void;
    move({ movementX, movementY }: MouseEvent): void;
    hoverCheck(point: Point): boolean;
}
export default Text;
