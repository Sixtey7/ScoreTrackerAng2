import { Player } from '../../shared/shared';
export default class AgricolaPlayer  extends Player {

    _id: number | string;
    playerId: string;
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

    static fromServerObject(serverObj: any, playerId, playerName: string) : AgricolaPlayer {
        let returnVal: AgricolaPlayer = new AgricolaPlayer(playerId, playerName, serverObj['score']);

        if (serverObj['fieldsNum']) {
            returnVal.fieldsNum = serverObj['fieldsNum'];
        }
        else {
            returnVal.fieldsNum = 0;
        }

        if (serverObj['pastureNum']) {
            returnVal.pastureNum = serverObj['pastureNum'];
        }
        else {
            returnVal.pastureNum = 0;
        }

        if (serverObj['grainNum']) {
            returnVal.grainNum = serverObj['grainNum'];
        }
        else {
            returnVal.grainNum = 0;
        }

        if (serverObj['vegNum']) {
            returnVal.vegNum = serverObj['vegNum'];
        }
        else {
            returnVal.vegNum = 0;
        }

        if (serverObj['sheepNum']) {
            returnVal.sheepNum = serverObj['sheepNum'];
        }
        else {
            returnVal.sheepNum = 0;
        }

        if (serverObj['pigNum']) {
            returnVal.pigNum = serverObj['pigNum'];
        }
        else {
            returnVal.pigNum = 0;
        }

        if (serverObj['cowNum']) {
            returnVal.cowNum = serverObj['cowNum'];
        }
        else {
            returnVal.cowNum = 0;
        }

        if (serverObj['unusedNum']) {
            returnVal.unusedNum = serverObj['unusedNum'];
        }
        else {
            returnVal.unusedNum = 0;
        }

        if (serverObj['stableNum']) {
            returnVal.stableNum = serverObj['stableNum'];
        }
        else {
            returnVal.stableNum = 0;
        }

        if (serverObj['clayNum']) {
            returnVal.clayNum = serverObj['clayNum'];
        }
        else {
            returnVal.clayNum = 0;
        }

        if (serverObj['stoneNum']) {
            returnVal.stoneNum = serverObj['stoneNum'];
        }
        else {
            returnVal.stoneNum = 0;
        }
                            
        if (serverObj['familyNum']) {
            returnVal.familyNum = serverObj['familyNum'];
        }
        else {
            returnVal.familyNum = 2;
        }

        if (serverObj['cardNum']) {
            returnVal.cardNum = serverObj['cardNum'];
        }
        else {
            returnVal.cardNum = 0;
        }

        if (serverObj['bonusNum']) {
            returnVal.bonusNum = serverObj['bonusNum'];
        }
        else {
            returnVal.bonusNum = 0;
        }

        returnVal.playerId = playerId;

        return returnVal;
    }
}