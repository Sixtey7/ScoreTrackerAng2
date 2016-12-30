import { Scoreable } from '../shared'

export default class RangeScore implements Scoreable {
    name: String;
    /*
    * key   - number required
    * value - score for number
    */
    private valueMap:Map<number, number>;
    private currNum: number;

    constructor(valueMap: Map<number, number>) {
        this.valueMap = valueMap;
    }

    setCurrNum(currNum: number): void {
        this.currNum = currNum;
    } 

    calculateScore(value: number): number {
        this.currNum = value;

        return this.determineScore();
    }

    getScore(): number {
        //TODO: We should probably update this to not redo the
        //determination of the score if the value has not changed
        return this.determineScore();
    }

    private determineScore(): number {
        
        let smallestDifference: number = 9999;
        let currentScore: number = 0;

        this.valueMap.forEach((value: number, key: number) => {

            console.log('Running for key: ' + key);
            if (key === this.currNum) {
                //we have an exact match
                currentScore = value;
                smallestDifference = 0;
            }
            else if (this.currNum > key) {
                if ((this.currNum - key) < smallestDifference) {
                    //we have a new smallest difference
                    smallestDifference = this.currNum - key;
                    currentScore = value;
                }
            }
        });

        return currentScore;
    }
}