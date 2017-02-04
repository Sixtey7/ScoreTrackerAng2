import ServerPlayerResult from './server_player_result';
import { GameList } from '../../shared/shared';

export default class ServerGame {
    public _id: string;
    public game: GameList;
    public playerResults: ServerPlayerResult[];
    public date: Date;
    public gameString;

    constructor() {
        console.log('Running constructor');
    }
}