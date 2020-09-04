import { StyleConfig, LineCap, LineJoin, HoverCursor, FontStyle, FontVarient, FontWeight, TextAlign, TextBaseLine, GradientType, GradientParams, GradientWith, GradientStops } from '../types/core/style';
import { RgbaValue } from '@jiaminghi/color/types/types';
import CRender from './crender.class';
export default class Style {
    /**
     * @description Rgba value of graph fill color
     */
    fill: RgbaValue;
    /**
     * @description Rgba value of graph stroke color
     */
    stroke: RgbaValue;
    /**
     * @description Opacity of graph
     */
    opacity: number;
    /**
     * @description LineCap of Ctx
     */
    lineCap: LineCap;
    /**
     * @description Linejoin of Ctx
     */
    lineJoin: LineJoin;
    /**
     * @description LineDash of Ctx
     */
    lineDash: number[];
    /**
     * @description LineDashOffset of Ctx
     */
    lineDashOffset: number;
    /**
     * @description ShadowBlur of Ctx
     */
    shadowBlur: number;
    /**
     * @description Rgba value of graph shadow color
     */
    shadowColor: RgbaValue;
    /**
     * @description ShadowOffsetX of Ctx
     */
    shadowOffsetX: number;
    /**
     * @description ShadowOffsetY of Ctx
     */
    shadowOffsetY: number;
    /**
     * @description LineWidth of Ctx
     */
    lineWidth: number;
    /**
     * @description Center point of the graph
     */
    graphCenter?: [number, number];
    /**
     * @description Graph scale
     */
    scale?: [number, number];
    /**
     * @description Graph rotation degree
     */
    rotate?: number;
    /**
     * @description Graph translate distance
     */
    translate?: [number, number];
    /**
     * @description Cursor status when hover
     */
    hoverCursor: HoverCursor;
    /**
     * @description Font style of Ctx
     */
    fontStyle: FontStyle;
    /**
     * @description Font varient of Ctx
     */
    fontVarient: FontVarient;
    /**
     * @description Font weight of Ctx
     */
    fontWeight: FontWeight;
    /**
     * @description Font size of Ctx
     */
    fontSize: number;
    /**
     * @description Font family of Ctx
     */
    fontFamily: string;
    /**
     * @description TextAlign of Ctx
     */
    textAlign: TextAlign;
    /**
     * @description TextBaseline of Ctx
     */
    textBaseline: TextBaseLine;
    /**
     * @description The color used to create the gradient
     */
    gradientColor?: RgbaValue[];
    /**
     * @description Gradient type
     */
    gradientType: GradientType;
    /**
     * @description Gradient params
     */
    gradientParams?: GradientParams;
    /**
     * @description When to use gradients
     */
    gradientWith: GradientWith;
    /**
     * @description Gradient color stops
     */
    gradientStops: GradientStops;
    constructor(style?: StyleConfig<string | RgbaValue>);
    update(style: StyleConfig<string | RgbaValue>): void;
    static colorProcessor(style: StyleConfig<string | RgbaValue>, reverse?: false): StyleConfig<RgbaValue>;
    static colorProcessor(style: StyleConfig<string | RgbaValue>, reverse: true): StyleConfig<string>;
    setCtx(render: CRender): void;
    static setCtxTransform(style: Style, { ctx, dpr }: CRender): void;
    static setCtxStyle({ ctx }: CRender, style: Style): void;
    static setCtxGradientColor({ ctx }: CRender, style: Style): void;
    restoreCtx({ ctx }: CRender): void;
}
