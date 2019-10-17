import { PointModel } from './Point';
import {SvgBaseProps, SvgEllipseProps} from '../const/index';
import { BaseModel } from './BaseModel';
import { GraphType } from '../const/enum';
import { SvgEllipse } from '../components'
import {abs} from "../common/utils";


export class EllipseModel extends BaseModel {
    private type = GraphType.ellipse
    private component = SvgEllipse;
    private cx: number
    private cy: number
    private rx: number
    private ry: number

    constructor(center: PointModel, config: SvgBaseProps = {}) {
        super(config)
        const [x, y] = center.toData()
        this.cx = x
        this.cy = y
        this.rx = 0
        this.ry = 0
    }

    static new (x: number, y: number) {
        const center = new PointModel(x, y);
        return new this(center);
    }

    update (end?: PointModel) {
        if(end) {
            const [ex, ey] = end.toData()
            this.rx = abs(ex - this.cx)
            this.ry = abs(ey - this.cy)
        }
    }


    toData() {
        const {cx, cy, rx, ry} = this
        const { props: { stroke, fill, strokeWidth } } = super.toData();
        return {
            type: this.type,
            component: this.component,
            props: {
                cx,
                cy,
                rx,
                ry,
                stroke,
                fill,
                strokeWidth,
            }
        }
    }
}
