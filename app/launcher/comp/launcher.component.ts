import { Component, OnInit, ViewChild } from '@angular/core';
import { LauncherService } from '../service/launcher.service';
import { 
    GameList, 
    Modal, 
    ServerGame, 
    ServerPlayer, 
    ServerTotal, 
    ScoringType,
} from '../../shared/shared';
import { Router } from '@angular/router-deprecated';
import PromptGameSelection from './game_select_modal';

import { PlayerService } from '../../players/players';
import { GameDefService } from '../../gamedefs/gamedefs';
import { StandardService } from '../../standard/standard';
import { AgricolaService } from '../../agricola/agricola'


@Component({
    selector: 'launcher-component',
    directives: [ Modal ],
    providers: [LauncherService, StandardService, AgricolaService],
    styleUrls: [ 'app/style/app.style.css', 'app/launcher/comp/launcher.component.css'],
    templateUrl: 'app/launcher/comp/launcher.component.html'
})
export default class LauncherComponent implements OnInit {
    private allGames : ServerGame[]; 
    private allPlayers: {[key: string]: string};

    @ViewChild(Modal) modal;

    constructor(private launcherService: LauncherService, private standardService: StandardService, private agricolaService: AgricolaService, 
            private router: Router, private playerService: PlayerService, private gameDefsService: GameDefService) {
        this.allGames = new Array<ServerGame>();
        this.allPlayers = {};
    }

    ngOnInit(): void {
        this.launcherService.getAllGames()
            .subscribe(
                response => {
                    this.extractAllGames(response.gameResults);
                },
                error => console.log('ERROR: ' + error));
    }

    private extractAllGames(response : ServerGame[]) {
        console.log('\n---------\nGOT ALL GAMES\n' + JSON.stringify(response) + '\n---------');

        console.log(typeof response);

        for (let x: number = 0; x < response.length; x++) {
            response[x].gameString =  this.gameDefsService.getServerGameDef(response[x].gameDefId).name;
            this.allGames.push(response[x]);
        }
        
    }

    launchGame(game: ServerGame) {
        console.log('consoling the id: ' + game._id);

        if (this.gameDefsService.getServerGameDef(game.gameDefId).scoringType === ScoringType.AGRICOLA) {
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

    startNewGame(_gameToStart: ServerGame) {
        console.log('Got the game to start: ' + JSON.stringify(_gameToStart));
        //TODO: fix this
        if (this.gameDefsService.getServerGameDef(_gameToStart.gameDefId).scoringType === ScoringType.AGRICOLA) {
            //Agricola has its own game
            console.log('Determine the user wants to start an agricola scoring game!');
            this.router.navigate(['AgricolaGameRouterComponent', 'NewGame']);
        }
        else {
            console.log('Determined the user wants to start a standard scoring game!');
            this.standardService.beginGame(_gameToStart)
                .subscribe( createdGame => {
                    this.router.navigate(['AgricolaGameRouterComponent', 'ResumeGame', { id: createdGame._id}]);
                }, err => {
                    console.error('Got an error attempting to create a new Standard Game:\n' + err);
                });
            this.router.navigate(['StandardGameRouterComponent', 'NewGame', { gameDefId: _gameToStart.gameDefId}]);
        }
    }

    playerForId(_id: string) : string {
        return this.playerService.getName(_id);
    }

}