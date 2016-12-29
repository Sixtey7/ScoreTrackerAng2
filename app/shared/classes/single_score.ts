import { Scoreable }  from '../shared';

export default class SingleScore implements Scoreable {
    name: String;
    private multiplyBy: number;
    private currNum: number;

    constructor() {
        this.multiplyBy = 3;
    }

    setCurrNum(value: number): void {
        this.currNum = value;
    }
    
    calculateScore(value: number): number {
        this.currNum = value;
        return this.multiplyBy * value;
    }

    getScore(): number {
        return this.multiplyBy * this.currNum;
    }

}