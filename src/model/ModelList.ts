import { BaseModel } from './BaseModel';
import { GraphType } from '../const';
import {LineModel, RectModel, PointModel, RoundModel, PathModel} from '.';


interface GraphItem {
    type: GraphType;
    // component: 



}
export class ModelList {
    private list: BaseModel[]= [];

    private add(g: BaseModel) {
        this.list.push(g);
    }

    remove() {

    }

    clearAll () {
        this.list = [];
    }

    currentGraph () {
      return this.list[this.list.length - 1];
    }

    startGraph = (type: GraphType, x: number, y: number) => {
        let g: BaseModel | undefined;
        if (type === GraphType.line) {
          g = LineModel.new(x, y);
        } else if (type === GraphType.rect) {
          g = RectModel.new(x, y);
        } else if (type === GraphType.round) {
          g = RoundModel.new(x,y );
        } else if (type === GraphType.path) {
            g = PathModel.new(x,y );
          }
        if (g) {
            this.add(g);
        }
    }

    endGraph = (type: GraphType, x: number, y: number) => {
        if (type === GraphType.line) {
            const g = this.currentGraph() as LineModel;
            g.update(undefined, new PointModel(x, y));
        } else if (type === GraphType.rect) {
            const g = this.currentGraph() as RectModel;
            const [w, h] = g.getSize();
            g.update(undefined, w + 3, h + 3);
        } else if (type === GraphType.round) {
            const g = this.currentGraph() as RoundModel;
            const end: PointModel = new PointModel(x, y)
            g.update(end);
        } else if (type === GraphType.path) {
            const g = this.currentGraph() as PathModel;
            const end: PointModel = new PointModel(x, y)
            g.update(undefined, end)
        }
    }

    toData () {
        return this.list.map( g => g.toData())
    }
}
