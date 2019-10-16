
import { PointModel } from './index';
import { SvgLineProps, SvgBaseProps } from '../const/index';
import { BaseModel } from './BaseModel';
import { GraphType } from '../const/enum';

export class LineModel extends BaseModel {
    private type = GraphType.line;
    private startPoint: PointModel;
    private endPoint: PointModel;

    constructor(start: PointModel, end: PointModel, config: SvgBaseProps ={}) {
        super(config);
        this.startPoint = start;
        this.endPoint = end;
    }

    static new (x: number, y: number) {
        const start = new PointModel(x, y);
        return new LineModel(start, start);
    }

    update (start?: PointModel, end?: PointModel, config?: SvgBaseProps) {
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

    toData () {
        const [x1, y1] = this.startPoint.toData()
        const [x2, y2] = this.endPoint.toData();
        const { props: {stroke, fill, strokeWidth } } = super.toData();
        return {
            type: this.type,
            props: {
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
}