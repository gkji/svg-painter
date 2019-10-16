import { SvgBaseProps } from '../const'
import { GraphType } from '../const/enum';

export class BaseModel {
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

    toData () {
        const { stroke, fill, strokeWidth } = this;
        return {
            type: GraphType.base,
            props: {
                stroke,
                fill,
                strokeWidth
            }
        }
    }
}