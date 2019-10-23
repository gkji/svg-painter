import {GraphType, PenData, PenStatus, SvgBaseProps} from "./const";
import * as Models from './model'
import {BaseModel} from "./model";
import {log} from "./common/utils";

/**
 * 导出单例 pen
 */

export class Pen {
    private x: number = 0
    private y: number = 0
    private type: GraphType = GraphType.round
    private status: PenStatus = PenStatus.up

    private svg: SvgBaseProps = {
        stroke: 'orange',
        fill: 'transparent',
        strokeWidth: '5',
    }

    setPenType(t: GraphType) {
        this.type = t
    }

    draw(): BaseModel | undefined {
        const type = this.type
        return this.generateModel(type)
    }

    private generateModel(t: GraphType): BaseModel | undefined {
        let model: BaseModel | undefined
        const arr: any[] = Object.values(Models)
        for (let v of arr) {
            let {type: type}: any = v
            if (type as GraphType) {
                if (type === t) {
                    if (v.modelWithPen) {
                        model = v.modelWithPen(this)
                        return model
                    }
                }
            }
        }
    }

    updatePen(x: number, y: number, status?: PenStatus, svg?: SvgBaseProps) {
        this.x = x
        this.y = y
        if (status) {
            this.status = status
        }
        if (svg) {
            this.svg = svg
        }
    }

    toData(): PenData {
        const {x, y, status, svg} = this
        return {
            x, y, status, svg
        }
    }
}

export default new Pen()
