import {PenData, SvgBaseProps} from '../const'
import {GraphType} from '../const/enum';
import {ModelData} from '../const/interface';
import {Pen} from "../pen";
import {log} from "../common/utils";
import {PointModel} from "./Point";

export class BaseModel {
    static type: GraphType
    private stroke: string;
    private fill: string;
    private strokeWidth: string;

    constructor({stroke = 'orange', fill = 'transparent', strokeWidth = '5'}: SvgBaseProps) {
        this.stroke = stroke;
        this.fill = fill;
        this.strokeWidth = strokeWidth
    }

    static modelWithPen(pen: Pen): BaseModel {
        const {svg} = pen.toData()
        return new this(svg)
    }

    // static new (args: SvgBaseProps) {
    //     return new this(args)
    // }

    update(arg: any, arg2: any) {

    }

    updateWithPen(pen: Pen) {

    }


    toData(): ModelData {
        const {stroke, fill, strokeWidth} = this;
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
