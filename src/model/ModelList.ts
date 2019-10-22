import {GraphType, PenStatus} from '../const';
import {LineModel, RectModel, PointModel, RoundModel, PathModel, BaseModel} from './index';
import {ModelData} from '../const/interface';
import {EllipseModel} from "./Ellipse";
import {Pen} from '../pen'
import {log} from '../common/utils';

interface GraphItem {
    type: GraphType;
    component: any,
    data: any,
}


export class ModelList {
    private list: BaseModel[] = [];
    private pen: Pen;

    constructor(pen: Pen) {
        this.pen = pen
    }


    private add(g: BaseModel) {
        this.list.push(g);
    }

    remove() {

    }

    clearAll() {
        this.list = [];
    }

    currentGraph() {
        return this.list[this.list.length - 1];
    }

    startGraph = (type: GraphType, x: number, y: number) => {
        let g: BaseModel | undefined;
        g = this.pen.draw()
        // g = BaseModel.modelWithPen(this.pen, type)

        // g = new T()
        // if (type === GraphType.line) {
        //   g = LineModel.new(x, y);
        // } else if (type === GraphType.rect) {
        //   g = RectModel.new(x, y);
        // } else if (type === GraphType.round) {
        //   g = RoundModel.new(x,y );
        // } else if (type === GraphType.path) {
        //     g = PathModel.new(x,y );
        // } else if (type === GraphType.ellipse) {
        //     g = EllipseModel.new(x,y );
        // }
        log('debug g', g)
        if (g) {
            this.add(g);
        }
    }

    endGraph = (type: GraphType, x: number, y: number) => {
        const g = this.currentGraph();
        if (g) {
            // g.update(x, y)
            g.updateWithPen(this.pen)
        }
        // if (type === GraphType.line) {
        //     const g = this.currentGraph();
        //     g.update(undefined, new PointModel(x, y));
        // } else if (type === GraphType.rect) {
        //     const g = this.currentGraph() as RectModel;
        //     const [w, h] = g.getSize();
        //     g.update(undefined, w + 3, h + 3);
        // } else if (type === GraphType.round) {
        //     const g = this.currentGraph() as RoundModel;
        //     const end: PointModel = new PointModel(x, y)
        //     g.update(end);
        // } else if (type === GraphType.ellipse) {
        //     const g = this.currentGraph() as EllipseModel;
        //     const end: PointModel = new PointModel(x, y)
        //     g.update(end)
        // } else if (type === GraphType.path) {
        //     const g = this.currentGraph() as PathModel;
        //     const end: PointModel = new PointModel(x, y)
        //     g.update(undefined, end)
        // }
    }

    toData(): ModelData[] {
        return this.list.map(g => g.toData())
    }
}
