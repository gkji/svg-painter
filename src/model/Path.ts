
import { PointModel } from './index';
import { SvgPathProps, SvgBaseProps, PathData } from '../const/index';
import { BaseModel } from './BaseModel';
import { GraphType } from '../const/enum';
import { SvgPath } from '../components';

export class PathModel extends BaseModel {
    private type = GraphType.path;
    private component = SvgPath;
    private startPoint: PointModel;
    private points: PointModel[];

    constructor(start: PointModel, point: PointModel, config: SvgBaseProps ={}) {
        super(config);
        this.startPoint = start;
        this.points = [point];
    }

    static new (x: number, y: number) {
        const start = new PointModel(x, y);
        return new PathModel(start, start);
    }

    update (start?: PointModel, point?: PointModel, config?: SvgBaseProps) {
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

    toData () {
        const { props: { stroke, fill, strokeWidth } } = super.toData();
        const d: PathData = {
            moveTo: this.startPoint,
            lineToList: this.points,
        }
        return {
            type: this.type,
            component: this.component,
            props: {
                d,
                stroke, 
                fill, 
                strokeWidth
            }
        }
    }
}