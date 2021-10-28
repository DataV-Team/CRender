/// <reference types="offscreencanvas" />
export declare type GetFunctionParams<T> = T extends (...params: infer U) => any ? U : any[];
export declare type CanvasCtx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
