// eslint-disable-next-line
export type GetFunctionParams<T> = T extends (...params: infer U) => any ? U : any[]

export type CanvasCtx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
