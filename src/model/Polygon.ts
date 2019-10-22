import {PointModel} from './Point';
import {SvgRectProps, SvgBaseProps, Point, PenData, SvgPolygonProps} from '../const/index';
import {BaseModel} from './BaseModel';
import {GraphType} from '../const/enum';
import {SvgPolygon} from "../components/svg-polygon";
import {Pen} from '../pen';
import {abs, log} from "../common/utils";


export class PolygonModal extends BaseModel {
    static type = GraphType.polygon;
    private type = GraphType.polygon;
    private component = SvgPolygon;
    private center: PointModel;
    private width: number = 0;
    private height: number = 0;
    private side: number = 3;
    private start: PointModel;
    protected points: string = '';
    protected ps: PointModel[] = [];

    constructor(start: PointModel, config: SvgBaseProps = {}) {
        super(config)
        this.center = start
        this.start = start
        this.ps = []
        for (let i = 0; i < this.side; i++) {
            this.ps.push(start)
        }
        this.points = this.ps.map((p: PointModel): string => {
            const [x, y] = p.toData()
            return `${x}, ${y}`
        }).join(' ')
    }

    static new(x: number, y: number) {
        const center = new PointModel(x, y);
        return new this(center)
    }

    static modelWithPen(pen: Pen) {
        const {x, y}: PenData = pen.toData()
        const s = new PointModel(x, y)
        return new this(s)
    }

    updateWithPen(pen: Pen) {
        const {x: px, y: py} = pen.toData()
        const [sx, sy] = this.start.toData()
        const mx = abs(sx - px) / 2
        const my = abs(sy - py) / 2
        const middle = new PointModel(mx, py)
        const end = new PointModel(px, py)
        this.ps = [this.start, middle, end]
        this.points = this.ps.map((p: PointModel): string => {
            const [x, y] = p.toData()
            return `${x}, ${y}`
        }).join(' ')
    }


    update(center ?: PointModel, width ?: number, height ?: number, config ?: SvgBaseProps) {
        if (center) {
            this.center = center;
        }
        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
        const {ps} = this
        this.points = ps.map((p: PointModel): string => {
            const [x, y] = p.toData()
            return `${x}, ${y}`
        }).join(' ')
    }

    toData() {
        const {ps} = this
        const [x, y] = this.center.toData()
        const {props: {stroke, fill, strokeWidth}} = super.toData();
        const {width, height} = this;
        // const {props: {stroke, fill, strokeWidth}} = super.toData();
        return {
            type: this.type,
            component: this.component,
            props: {
                points: this.points,
                x,
                y,
                width,
                height,
                stroke,
                fill,
                strokeWidth,
            },
        }
        // return {
        //     points: this.points
        // }
    }
}
