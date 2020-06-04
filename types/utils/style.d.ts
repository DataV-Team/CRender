import { RgbaValue } from '@jiaminghi/color/types/types'
import Style from '../core/style'
/**
 * reverse: false | string    -> RgbaValue
 * reverse: true  | RgbaValue -> string
 */
export declare function transformColor(reverse?: boolean): (color: any) => string | RgbaValue
export declare function getCtxRealColorWithOpacity(opacity: number): (color: RgbaValue) => string
export declare function gradientColorValidator(style: Style): boolean
export declare function getAutoColorStops(color: string[]): number[]
