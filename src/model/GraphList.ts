import { BaseGraph } from './BaseGraph';
import { GraphType } from '../const';
import {Line, Rect, Point, Round} from '../model';

const log = console.log;

export class GraphList {
    private list: BaseGraph[]= [];

    private add(g: BaseGraph) {
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
        let g: BaseGraph | undefined;
        if (type === GraphType.line) {
          g = Line.new(x, y);
        } else if (type === GraphType.rect) {
          g = Rect.new(x, y);
        } else if (type === GraphType.round) {
          g = Round.new(x, y);
        }
        if (g) {
            this.add(g);
        }
    }

    endGraph = (type: GraphType, x: number, y: number) => {
        if (type === GraphType.line) {
            const g = this.currentGraph() as Line;
            g.update(undefined, new Point(x, y));
        } else if (type === GraphType.rect) {
            const g = this.currentGraph() as Rect;
            const [w, h] = g.getSize();
            g.update(undefined, w + 3, h + 3);
        } else if (type === GraphType.round) {
            const g = this.currentGraph() as Round;
            g.update(new Point(x, y))
        }
    }

    toData () {
        return this.list.map( g => g.toSvgData())
    }
}
