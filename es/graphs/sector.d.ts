import { SectorShape } from '../types/graphs/shape';
import Graph from '../core/graph.class';
import { GraphConfig, Point } from '../types/core/graph';
declare class Sector extends Graph<SectorShape> {
    name: string;
    constructor(config: GraphConfig<Partial<SectorShape>>);
    draw(): void;
    hoverCheck(point: Point): boolean;
    setGraphCenter(): void;
    move({ movementX, movementY }: MouseEvent): void;
}
export default Sector;
