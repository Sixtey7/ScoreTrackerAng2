import { Player } from '../../shared/shared';
export default class AgricolaServerPlayerResult  extends Player {

    playerId: string | number;
    score: number;
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