import {PointModel} from './Point';
import {SvgRectProps, SvgBaseProps} from '../const/index';
import {BaseModel} from './BaseModel';
import {GraphType} from '../const/enum';
import {SvgRect} from '../components';
import {Pen} from "../pen";


export class RectModel extends BaseModel {
    private type = GraphType.rect;
    static type = GraphType.rect;
    private component = SvgRect;
    private center: PointModel;
    private width: number;
    private height: number;

    constructor(center: PointModel, width: number, height: number, config: SvgBaseProps = {}) {
        super(config)
        this.center = center;
        this.width = width;
        this.height = height;
    }

    static modelWithPen(pen: Pen) {
        const {x, y} = pen.toData()
        const center = new PointModel(x, y);
        return new RectModel(center, 0, 0)
    }

    updateWithPen(pen: Pen) {
        const [w, h] = this.getSize();
        this.update(undefined, w + 3, h + 3);
    }

    static new(x: number, y: number) {
        const center = new PointModel(x, y);
        return new RectModel(center, 0, 0)
    }

    update(center?: PointModel, width?: number, height?: number, config?: SvgBaseProps) {
        if (center) {
            this.center = center;
        }
        if (width) {
            this.width = width;
        }
        if (height) {
            this.height = height;
        }
    }

    getSize() {
        return [this.width, this.height]
    }

    toData() {
        const [x, y] = this.center.toData()
        const {width, height} = this;
        const {props: {stroke, fill, strokeWidth}} = super.toData();
        return {
            type: this.type,
            component: this.component,
            props: {
                x,
                y,
                width,
                height,
                stroke,
                fill,
                strokeWidth,
            }
        }
    }
}
