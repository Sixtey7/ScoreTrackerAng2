import { ScoringType } from '../../shared/shared';
import ServerGameDefExpansion from './server_game_def_expansion';

export default class ServerGameDef {
    public _id: string;
    public name: string;
    public scoringType: ScoringType;
    public expansion: ServerGameDefExpansion[];
}