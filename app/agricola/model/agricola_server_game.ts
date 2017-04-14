import AgricolaServerPlayerResult from './agricola_server_player_result';
import { GameList } from '../../shared/shared';

export default class AgricolaServerGame  {
    public _id: string;
    public gameDefId: string;
    public playerResults: AgricolaServerPlayerResult[];
    public date: Date;
    public gameString;
    public expansions: string[];
}