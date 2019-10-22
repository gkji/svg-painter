import {GraphType, PenStatus} from './enum';
export interface SvgBaseProps {
    stroke?: string;
    fill?: string;
    strokeWidth?: string;
}
export interface SvgLineProps extends SvgBaseProps {
    x1: number,
    y1: number,
    x2: number,
    y2: number,
}

export interface SvgRectProps extends SvgBaseProps {
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface SvgRoundProps extends SvgBaseProps {
    cx: number,
    cy: number,
    r: number,
}

export interface SvgPolygonProps extends SvgBaseProps {
    points: string
}

export interface SvgTriangleProps extends SvgPolygonProps {
}

export interface SvgEllipseProps extends SvgBaseProps {
    cx: number,
    cy: number,
    rx: number,
    ry: number,
}

export interface Point {
    x: number,
    y: number,
}

export interface PathData {
    moveTo: Point,
    lineToList: Point[],
}

export interface SvgPathProps extends SvgBaseProps {
    d: PathData,
}

export interface ModelData {
    type: GraphType,
    component: any,
    props: SvgBaseProps,
}

export interface PenData {
    x: number
    y: number
    status: PenStatus
    svg: SvgBaseProps
}
