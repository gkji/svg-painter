
import { Point } from './index';
import { SvgPathProps, SvgBaseProps, PathData } from '../const/index';
import { BaseGraph } from './BaseGraph';

export class Path extends BaseGraph {
    private startPoint: Point;
    private points: Point[];

    constructor(start: Point, point: Point, config: SvgBaseProps ={}) {
        super(config);
        this.startPoint = start;
        this.points = [point];
    }

    static new (x: number, y: number) {
        const start = new Point(x, y);
        return new Path(start, start);
    }

    update (start?: Point, point?: Point, config?: SvgBaseProps) {
        console.log('udpate')
        if (start) {
            this.startPoint = start;
        }
        if (point) {
            this.points.push(point);
        }
        if (config) {
            // TODO
        }
    }

    toSvgData (): SvgPathProps {
        const { stroke, fill, strokeWidth } = super.toSvgData();
        const d: PathData = {
            moveTo: this.startPoint,
            lineTo: this.points[this.points.length - 1],
        }
        return {
            d,
            stroke, 
            fill, 
            strokeWidth
        }
    }
}