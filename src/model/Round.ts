import {PointModel} from './Point';
import {SvgRoundProps, SvgBaseProps} from '../const/index';
import {BaseModel} from './BaseModel';
import {log} from '../common/utils';
import { GraphType } from '../const/enum';


export class RoundModel extends BaseModel {
    private type = GraphType.round
    private cx: number
    private cy: number
    private r: number

    constructor(center: PointModel, config: SvgBaseProps = {}) {
        super(config)
        const [x, y] = center.toData()
        this.cx = x
        this.cy = y
        this.r = 0
    }

    static new (x: number, y: number) {
        const center = new PointModel(x, y);
        return new RoundModel(center);
    }

    update (end?: PointModel) {
        if(end) {
            const [ex] = end.toData()
            this.r = ex - this.cx
        }
    }


    toData() {
        const {cx, cy, r} = this
        const { props: { stroke, fill, strokeWidth } } = super.toData();
        return {
            type: this.type,
            props: {
                cx,
                cy,
                r,
                stroke,
                fill,
                strokeWidth,
            }
        }
    }
}
