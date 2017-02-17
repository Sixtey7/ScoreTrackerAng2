import { Player } from '../../shared/shared';
export default class AgricolaPlayer  extends Player {

    fieldsNum: number;
    pastureNum: number;
    grainNum: number;
    vegNum: number;
    sheepNum: number;
    pigNum: number;
    cowNum: number;
    unusedNum: number;
    stableNum: number;
    clayNum: number;
    stoneNum: number;
    familyNum: number;
    cardNum: number;
    bonusNum: number;

    constructor(id: string, name: string, score?: number) {
        super(id, name, score);

        this.fieldsNum = 5;
        this.pastureNum = 8;
    }
}