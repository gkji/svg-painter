import { SvgBaseProps } from '../const'

export class BaseGraph {
    private stroke: string;
    private fill: string;
    private strokeWidth: string;

    constructor ({ stroke = 'orange', fill = 'transparent', strokeWidth = '5' }: SvgBaseProps) {
        this.stroke = stroke;
        this.fill = fill;
        this.strokeWidth = strokeWidth
    }

    // static new (args: SvgBaseProps) {
    //     return new this(args)
    // }

    toSvgData () : SvgBaseProps {
        const { stroke, fill, strokeWidth } = this;
        return {
            stroke,
            fill,
            strokeWidth
        }
    }
}