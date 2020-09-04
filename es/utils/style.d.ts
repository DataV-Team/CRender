import Style from '../core/style.class';
import { RgbaValue } from '@jiaminghi/color/types/types';
/**
 * reverse: false | string    -> RgbaValue
 * reverse: true  | RgbaValue -> string
 */
export declare function transformColor(reverse?: boolean): (color: string | RgbaValue) => string | RgbaValue;
export declare function getCtxRealColorWithOpacity(opacity: number): (color: RgbaValue) => string;
export declare function gradientColorValidator(style: Style): boolean;
export declare function getAutoColorStops(color: string[]): number[];
