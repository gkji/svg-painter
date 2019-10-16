import {Point} from './Point';
import {SvgRoundProps, SvgBaseProps} from '../const/index';
import {BaseGraph} from './BaseGraph';
import {log} from '../common/utils';


export class Round extends BaseGraph {
    private cx: number
    private cy: number
    private r: number

    constructor(center: Point, config: SvgBaseProps = {}) {
        super(config)
        const [x, y] = center.toData()
        this.cx = x
        this.cy = y
        this.r = 0
    }

    static new (x: number, y: number) {
        const center = new Point(x, y);
        return new Round(center);
    }

    update (end?: Point) {
        if(end) {
            const [ex] = end.toData()
            this.r = ex - this.cx
        }
    }


    toSvgData(): SvgRoundProps {
        const {cx, cy, r} = this
        const {stroke, fill, strokeWidth} = super.toSvgData();
        return {
            cx,
            cy,
            r,
            stroke,
            fill,
            strokeWidth,
        }
    }
}
