export declare type Optional<T> = {
    [P in keyof T]?: T[P];
};
export declare type LiteralUnion<T extends U, U> = T | (U & {});
export declare type UnFunctionParams<T> = T extends (params: infer U) => any ? U : any[];
export declare type CanvasCtx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
