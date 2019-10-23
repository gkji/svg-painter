import {PointModel} from './Point';
import {SvgBaseProps} from '../const/index';
import {BaseModel} from './BaseModel';
import {GraphType} from '../const/enum';
import {SvgRound} from '../components'
import {log, abs} from "../common/utils";
import {Pen} from "../pen";


export class RoundModel extends BaseModel {
    static  type = GraphType.round
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

    static modelWithPen(pen: Pen) {
        const {x, y} = pen.toData()
        const center = new PointModel(x, y);
        return new RoundModel(center);
    }

    update(end?: PointModel) {
        if (end) {
            const [ex, ey] = end.toData()
            const rx = ex - this.cx
            const ry = ey - this.cy
            const r = Math.max(abs(rx), abs(ry))
            this.r = abs(r)
        }
    }

    updateWithPen(pen: Pen) {
        const d = pen.toData()
        const end: PointModel = new PointModel(d.x, d.y)
        this.update(end)
    }


    toData() {
        const {cx, cy, r} = this
        const {props: {stroke, fill, strokeWidth}} = super.toData();
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
