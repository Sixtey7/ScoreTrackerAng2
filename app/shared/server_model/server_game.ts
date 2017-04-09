import ServerPlayerResult from './server_player_result';
import { GameList } from '../../shared/shared';

export default class ServerGame {
    public _id: string;
    public gameDefId: string;
    public playerResults: ServerPlayerResult[];
    public date: Date;
    public gameString;
    public expansions: string[];

    constructor() {
        console.log('Running constructor');
    }
}