
import { Point } from './Point';
import { SvgRectProps, SvgBaseProps } from '../const/index';
import { BaseGraph } from './BaseGraph';


export class Rect extends BaseGraph {
    private center: Point;
    private width: number;
    private height: number;

    constructor(center: Point, width: number, height: number, config: SvgBaseProps = {}) {
        super(config)
        this.center = center;
        this.width = width;
        this.height = height;
    }

    static new (x: number, y: number) {
        const center = new Point(x, y);
        return new Rect(center, 0, 0)
    }

    update (center?: Point, width?: number, height?: number, config?: SvgBaseProps) {
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

    getSize () {
        return [this.width, this.height]
    }

    toSvgData (): SvgRectProps {
        const [x, y] = this.center.toData()
        const { width, height } = this;
        const { stroke, fill, strokeWidth } = super.toSvgData();
        return {
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