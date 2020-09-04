import { Point } from '../core/graph';
import { BezierCurve } from '@jiaminghi/bezier-curve/types/types';
export declare type CircleShape = {
    rx: number;
    ry: number;
    r: number;
};
export declare type EllipseShape = {
    rx: number;
    ry: number;
    hr: number;
    vr: number;
};
export declare type RectShape = {
    x: number;
    y: number;
    w: number;
    h: number;
};
export declare type RingShape = {
    rx: number;
    ry: number;
    r: number;
};
export declare type ArcShape = {
    rx: number;
    ry: number;
    r: number;
    startAngle: number;
    endAngle: number;
    clockWise: boolean;
};
export declare type SectorShape = {
    rx: number;
    ry: number;
    r: number;
    startAngle: number;
    endAngle: number;
    clockWise: boolean;
};
export declare type RegPolygonShape = {
    rx: number;
    ry: number;
    r: number;
    side: number;
};
export declare type RegPolygonShapeCache = {
    points?: Point[];
} & Partial<RegPolygonShape>;
export declare type PolylineShape = {
    points: Point[];
    close: boolean;
};
export declare type SmoothlineShape = {
    points: Point[];
    close: boolean;
};
export declare type SmoothlineShapeCache = {
    points?: Point[];
    bezierCurve?: BezierCurve;
    hoverPoints?: Point[];
};
export declare type BezierCurveShape = {
    points: BezierCurve | [];
    close: boolean;
};
export declare type BezierCurveShapeCache = {
    points?: BezierCurve;
    hoverPoints?: Point[];
};
export declare type TextShape = {
    content: string;
    position: [number, number];
    maxWidth: undefined | number;
    rowGap: number;
};
export declare type TextShapeCache = {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
};
