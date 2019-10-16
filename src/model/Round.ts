import {Point} from './Point';
import {SvgRoundProps, SvgBaseProps} from '../const/index';
import {BaseGraph} from './BaseGraph';


export class Round extends BaseGraph {
    private center: Point;
    private start: Point;
    private end: Point;

    constructor(start: Point, config: SvgBaseProps = {}) {
        super(config)
        this.start = start
        this.center = start;
        this.end = start;
    }

    static new (x: number, y: number) {
        const center = new Point(x, y);
        return new Round(center);
    }

    update () {
        
    }

    setEnd(p:Point) {
        this.end = p
    }

    getStart():Point {
        return this.start
    }

    toSvgData(): SvgRoundProps {
        const [x, y] = this.center.toData()
        const [ex] = this.end.toData()
        const r: number = (ex - x)
        const {stroke, fill, strokeWidth} = super.toSvgData();
        return {
            cx: x,
            cy: y,
            r,
            stroke,
            fill,
            strokeWidth,
        }
    }
}
