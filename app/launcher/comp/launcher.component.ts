import { Component, OnInit, ViewChild } from '@angular/core';
import { LauncherService } from '../service/launcher.service';
import { GameList, Modal, ServerGame } from '../../shared/shared';
import { Router } from '@angular/router-deprecated';
import PromptGameSelection from './game_select_modal';


@Component({
    selector: 'launcher-component',
    directives: [ Modal ],
    providers: [LauncherService],
    styleUrls: [ 'app/style/app.style.css', 'app/launcher/comp/launcher.component.css'],
    templateUrl: 'app/launcher/comp/launcher.component.html'
})
export default class LauncherComponent implements OnInit {
    private allGames : ServerGame[]; 

    @ViewChild(Modal) modal;

    constructor(private launcherService: LauncherService, private router: Router) {
        this.allGames = new Array<ServerGame>();
    }

    ngOnInit(): void {
        this.launcherService.getAllGames()
            .subscribe(
                response => this.extractAllGames(response),
                error => console.log('ERROR: ' + error));
    }


    private extractAllGames(response : ServerGame[]) {
        console.log('\n---------\nGOT ALL GAMES\n' + JSON.stringify(response) + '\n---------');

        console.log(typeof response);

        for (let x: number = 0; x < response.length; x++) {
            response[x].gameString = GameList[response[x].game].toString();
            this.allGames.push(response[x]);
        }
        
    }

    launchGame(gameId: string) {
        console.log('consoling the id: ' + gameId);

        this.router.navigate(['StandardGameRouterComponent', 'ResumeGame', { id: gameId }]);
    }

    promptForGame(): void {
        console.log('Prompting for which game!');

        this.modal.modalTitle = "Enter Name";
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

}