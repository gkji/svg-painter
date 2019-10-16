
import { Point } from './index';
import { SvgLineProps, SvgBaseProps } from '../const/index';
import { BaseGraph } from './BaseGraph';

export class Line extends BaseGraph {
    private startPoint: Point;
    private endPoint: Point;

    constructor(start: Point, end: Point, config: SvgBaseProps ={}) {
        super(config);
        this.startPoint = start;
        this.endPoint = end;
    }

    static new (x: number, y: number) {
        const start = new Point(x, y);
        return new Line(start, start);
    }

    update (start?: Point, end?: Point, config?: SvgBaseProps) {
        if (start) {
            this.startPoint = start;
        }
        if (end) {
            this.endPoint = end;
        }
        if (config) {
            // TODO
        }
    }

    toSvgData (): SvgLineProps {
        const [x1, y1] = this.startPoint.toData()
        const [x2, y2] = this.endPoint.toData();
        const { stroke, fill, strokeWidth } = super.toSvgData();
        return {
            x1, 
            y1,
            x2,
            y2,
            stroke,
            fill,
            strokeWidth,
        }
    }
}