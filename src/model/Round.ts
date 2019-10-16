import {PointModel} from './Point';
import {SvgBaseProps} from '../const/index';
import {BaseModel} from './BaseModel';
import { GraphType } from '../const/enum';
import { SvgRound } from '../components'


export class RoundModel extends BaseModel {
    private type = GraphType.round
    private component = SvgRound;
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
            component: this.component,
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
