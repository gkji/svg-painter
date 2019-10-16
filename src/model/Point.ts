

export class PointModel {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toData () {
        return [this.x, this.y]
    }
}