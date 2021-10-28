import { StyleConfig } from './style';
import { EaseCurve } from '@jiaminghi/transition/types/types/core/index';
import { RgbaValue } from '@jiaminghi/color/types/types';
import { Graph } from '../..';
export declare type HoverRect = [number, number, number, number];
export declare type Point = [number, number];
export declare type HoverCheck = (point: Point) => boolean;
export declare type Move = (e: MouseEvent) => void;
export declare type GraphConfig<Shape = any> = {
    /**
     * @description Graph shape
     */
    shape: Shape;
    /**
     * @description Graph style
     */
    style?: StyleConfig<string | RgbaValue>;
    /**
     * @description Weather to render graph
     */
    visible?: boolean;
    /**
     * @description Whether to enable drag
     */
    drag?: boolean;
    /**
     * @description Whether to enable hover
     */
    hover?: boolean;
    /**
     * @description Graph rendering index
     *  Give priority to index high graph in rendering
     */
    index?: number;
    /**
     * @description Animation delay time(ms)
     */
    animationDelay?: number;
    /**
     * @description Number of animation frames
     */
    animationFrame?: number;
    /**
     * @description Animation dynamic curve (Supported by transition)
     * @link https://github.com/jiaming743/Transition
     */
    animationCurve?: EaseCurve;
    /**
     * @description Weather to pause graph animation
     */
    animationPause?: boolean;
    /**
     * @description Rectangular hover detection zone
     *  Use this method for hover detection first
     * @example hoverRect = [0, 0, 100, 100] // [Rect start x, y, Rect width, height]
     */
    hoverRect?: HoverRect;
    /**
     * @description Mouse enter event handler
     */
    onMouseEnter?: () => void;
    /**
     * @description Mouse outer event handler
     */
    onMouseOuter?: () => void;
    /**
     * @description Mouse click event handler
     */
    onClick?: () => void;
    /**
     * @description Funciton of draw graph
     */
    draw?: () => void;
    /**
     * @description Function of set Graph center
     */
    setGraphCenter?: (e?: MouseEvent) => void;
    /**
     * @description Funciton of check graph is hovered
     */
    hoverCheck?: (point: Point) => boolean;
    /**
     * @description Function of Graph move
     */
    move?: (e: MouseEvent) => void;
    /**
     * @description Life cycle beforeAdd
     */
    beforeAdd?: (graph: Graph) => any;
    /**
     * @description Life cycle added
     */
    added?: (graph: Graph) => any;
    /**
     * Life Cycle when graph before draw
     */
    beforeDraw?: (graph: Graph) => any;
    /**
     * Life Cycle when graph drawed
     */
    drawed?: (graph: Graph) => any;
    /**
     * Life Cycle when graph before move
     */
    beforeMove?: (e: MouseEvent, graph: Graph) => any;
    /**
     * @description Life Cycle when graph moved
     */
    moved?: (e: MouseEvent, graph: Graph) => any;
    /**
     * @description Life Cycle when graph before delete
     */
    beforeDelete?: (graph: Graph) => any;
    /**
     * @description Life Cycle when graph deleted
     */
    deleted?: (graph: Graph) => any;
};
export declare enum Status {
    STATIC = "STATIC",
    HOVER = "HOVER",
    ACTIVE = "ACTIVE",
    DRAG = "DRAG"
}
export declare type AnimationKey = 'shape' | 'style';
export declare type AnimationFrameStateItem<Shape> = Partial<Shape> | StyleConfig<RgbaValue>;
export declare type AnimationQueueItem<Shape = any> = {
    key: AnimationKey;
    frameState: AnimationFrameStateItem<Shape>[];
};
