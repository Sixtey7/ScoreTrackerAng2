import AgricolaServerPlayerResult from './agricola_server_player_result';
import { GameList } from '../../shared/shared';

export default class AgricolaServerGame  {
    public _id: string;
    public game: GameList;
    public playerResults: AgricolaServerPlayerResult[];
    public date: Date;
    public gameString;
}