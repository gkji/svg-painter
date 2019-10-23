import {PointModel} from './index';
import {PenData, SvgBaseProps} from '../const/index';
import {SvgLine} from '../components';
import {BaseModel} from './BaseModel';
import {GraphType} from '../const/enum';
import {Pen} from "../pen";
import {log} from "../common/utils";

export class LineModel extends BaseModel {
    static type = GraphType.line;
    private type = GraphType.line;
    private component = SvgLine;
    private startPoint: PointModel;
    private endPoint: PointModel;

    constructor(start: PointModel, end: PointModel, config: SvgBaseProps = {}) {
        super(config);
        this.startPoint = start;
        this.endPoint = end;
    }

    static new(x: number, y: number) {
        const start = new PointModel(x, y)
        return new LineModel(start, start)
    }

    static modelWithPen(pen: Pen) {
        const {x, y}: PenData = pen.toData()
        return this.new(x, y)
    }

    updateWithPen(pen: Pen) {
        const {x, y}: PenData = pen.toData()

        this.update(undefined, new PointModel(x, y));
    }

    update(start?: PointModel, end?: PointModel, config?: SvgBaseProps) {
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

    toData() {
        const [x1, y1] = this.startPoint.toData()
        const [x2, y2] = this.endPoint.toData();
        const {props: {stroke, fill, strokeWidth}} = super.toData();
        return {
            type: this.type,
            component: this.component,
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
