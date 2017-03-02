import { Component, OnInit, ViewChild } from '@angular/core';
import { LauncherService } from '../service/launcher.service';
import { GameList, Modal, ServerGame, ServerPlayer, ServerTotal } from '../../shared/shared';
import { Router } from '@angular/router-deprecated';
import PromptGameSelection from './game_select_modal';

import { PlayerService } from '../../players/players';


@Component({
    selector: 'launcher-component',
    directives: [ Modal ],
    providers: [LauncherService, PlayerService],
    styleUrls: [ 'app/style/app.style.css', 'app/launcher/comp/launcher.component.css'],
    templateUrl: 'app/launcher/comp/launcher.component.html'
})
export default class LauncherComponent implements OnInit {
    private allGames : ServerGame[]; 
    private allPlayers: {[key: string]: string};

    @ViewChild(Modal) modal;

    constructor(private launcherService: LauncherService, private router: Router, private playerService: PlayerService) {
        this.allGames = new Array<ServerGame>();
        this.allPlayers = {};
    }

    ngOnInit(): void {
        this.launcherService.getAllGames()
            .subscribe(
                //TODO: this service call should probably not return all players now
                response => {
                    this.extractAllGames(response.gameResults);
                },
                error => console.log('ERROR: ' + error));
    }

    private extractAllGames(response : ServerGame[]) {
        console.log('\n---------\nGOT ALL GAMES\n' + JSON.stringify(response) + '\n---------');

        console.log(typeof response);

        for (let x: number = 0; x < response.length; x++) {
            response[x].gameString = GameList.toReadableString(GameList[GameList[response[x].game]]);
            this.allGames.push(response[x]);
        }
        
    }

    launchGame(game: ServerGame) {
        console.log('consoling the id: ' + game._id);

        if (game.game == GameList.AGRICOLA) {
            this.router.navigate(['AgricolaGameRouterComponent', 'ResumeGame', { id: game._id}]);
        }
        else {
            this.router.navigate(['StandardGameRouterComponent', 'ResumeGame', { id: game._id }]);
        }
    }

    promptForGame(): void {
        console.log('Prompting for which game!');

        this.modal.modalTitle = "Select Game To Begin";
        this.modal.modalFooter = false;
        this.modal.modalMessage = false;
        this.modal.open(PromptGameSelection); 
    }

    startNewGame(_gameName: string) {
        console.log('Got the response: ' + _gameName);
        console.log('Created the enum: ' + GameList.fromReadableString(_gameName).toString());
        let game: GameList = GameList.fromReadableString(_gameName);
        if (game === GameList.AGRICOLA) {
            //Agricola has its own game
            this.router.navigate(['AgricolaGameRouterComponent', 'NewGame']);
        }
        else {
            this.router.navigate(['StandardGameRouterComponent', 'NewGame', { gameName: game.toString()}]);
        }
    }

    playerForId(_id: string) : string {
        return this.playerService.getName(_id);
    }

}