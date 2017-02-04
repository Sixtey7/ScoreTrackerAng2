import Scoreable from './interfaces/scoreable';

import SingleScore from './classes/single_score';
import RangeScore from './classes/range_score';

import ServerGame from './server_model/server_game';
import ServerPlayer from './server_model/server_player';
import ServerPlayerResult from './server_model/server_player_result';

import Modal from './modal/modal.component';

import { GameList } from './enums/game_list.enum';

export {
    Scoreable,
    
    SingleScore,
    RangeScore,

    ServerGame,
    ServerPlayer,
    ServerPlayerResult,

    Modal,

    GameList
};