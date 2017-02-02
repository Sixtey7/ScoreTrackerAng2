import ServerPlayerResult from './server_player_result';
import { GameList } from '../../shared/shared';

export default class ServerGame {
    public game: GameList;
    public playerResults: ServerPlayerResult[];

    constructor(_game: GameList, _playerResults: ServerPlayerResult[]) {
        this.game = _game;
        this.playerResults = _playerResults;
    }
}