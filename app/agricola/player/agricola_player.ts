import { Player } from '../../shared/shared';
export default class AgricolaPlayer  extends Player {

    constructor(id: string, name: string, score?: number) {
        super(id, name, score);
    }
}