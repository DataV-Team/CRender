import { Point } from '../types/core/graph';
import { CanvasCtx } from '../types/common';
/**
 * @description Draw a polyline path
 */
export declare function drawPolylinePath(ctx: CanvasCtx, points: Point[], beginPath?: boolean, closePath?: boolean): void;
/**
 * @description Draw a bezier curve path
 */
export declare function drawBezierCurvePath(ctx: CanvasCtx, points: Point[][], moveTo?: false | Point, beginPath?: boolean, closePath?: boolean): void;
