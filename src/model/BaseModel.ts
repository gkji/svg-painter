import { SvgBaseProps } from '../const'
import { GraphType } from '../const/enum';
import { ModelData } from '../const/interface';

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

    update (arg: any, arg2: any) {
        
    }

    toData ():  ModelData{
        const { stroke, fill, strokeWidth } = this;
        return {
            type: GraphType.base,
            component: null,
            props: {
                stroke,
                fill,
                strokeWidth
            }
        }
    }
}