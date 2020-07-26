export type LiteralUnion<T extends U, U> = T | (U & {})

// eslint-disable-next-line
export type UnFunctionParams<T> = T extends (params: infer U) => any ? U : any[]

export type CanvasCtx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
