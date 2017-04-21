import { Component, OnInit, ViewChild } from '@angular/core';
import AgricolaPlayerComponent from '../player/agricola_player.component';
import { AgricolaServerPlayerResult, AgricolaPlayer }from '../agricola';
import AgricolaService from '../service/agricola_service';
import { 
    GameList ,
    Modal, 
    PromptUsername, 
    ServerGame, 
    ServerPlayer,
    ServerGameDef } from '../../shared/shared';
import { RouteParams, Router } from '@angular/router-deprecated';
import { Http } from '@angular/http';
import { AgricolaServerGame } from '../agricola';
import { PlayerService } from '../../players/players';
import { GameDefService } from '../../gamedefs/gamedefs';


@Component({
    selector: 'agricola-game',
    directives: [ AgricolaPlayerComponent, Modal ],
    providers: [ AgricolaService ],
    styleUrls: [ 'app/style/app.style.css', 'app/agricola/game/agricola_game.component.css' ],
    templateUrl: 'app/agricola/game/agricola_game.component.html'
})
export default class AgricolaGameComponent implements OnInit {
    currentPlayers: AgricolaPlayer[];
    gameId: string;
    navBarTitle = 'Agricola Game';
    activeGameDef: ServerGameDef;
    activeGameDefName: string;
    @ViewChild(Modal) modal;

    constructor(private agricolaService: AgricolaService, private routeParams: RouteParams, private playerService: PlayerService, private gameDefService: GameDefService, private router: Router) {
        this.currentPlayers = new Array<AgricolaPlayer>();
    }

    ngOnInit(): void {
        let gameId = this.routeParams.params['id'];

        if (gameId !== undefined) {
            console.log('ngOnInit found the id: ' + gameId);
            this.agricolaService.getGame(gameId)
                .subscribe(
                    response => {
                        this.loadGame(response);
                    },
                    error => {
                        console.log('GOT THE ERROR: ' + error);
                    }
                )
        }
        else { 
            console.error('agricola game did not contain a gameId!');
        }
        
    }

    playerScoreUpdated(index: number, updatedPlayer: AgricolaPlayer): void {
        if (this.currentPlayers[index].name === updatedPlayer.name) {
            //we could copy the entire object here, but for now, just copying the value out
            this.currentPlayers[index].score = updatedPlayer.score;
        }
        else {
            //if we ever decide to implement a rename through this route, then this is a good place to update
            console.log('NAME DOES NOT MATCH!');
        }
    }

    private promptForUsername(): void {
        this.modal.modalTitle = "Enter Name";
        this.modal.modalFooter = false;
        this.modal.modalMessage = false;
        this.modal.open(PromptUsername); 
    }
    private addNewPlayer(playerName: string): void {
        console.log('User selected to add a new player!');

        //this.currentPlayers.push(newUser);
        console.log('calling the backend!');

        this.agricolaService.addPlayer(this.gameId, playerName)
                    .subscribe(
                        serverPlayerObj => {
                            let playerObj: AgricolaPlayer = AgricolaPlayer.fromServerObject(serverPlayerObj,serverPlayerObj['playerId'], playerName);
                            this.playerService.addPlayer(serverPlayerObj['playerId'], playerName);
                            console.log('pushing player: ' + JSON.stringify(playerObj));
                            this.currentPlayers.push(playerObj);
                        },
                        error => console.log('ERROR: ' + error));
    }

    private extractGameId(responseString: string) {
        this.gameId = responseString;
        console.log('Got the ID: ' + JSON.stringify(this.gameId));
    }

    private loadGame(gameResponse: AgricolaServerGame) {
        console.log('loading game with id: ' + gameResponse._id);

        this.gameId = gameResponse._id;

        let playerIds: string[] = new Array<string>();

        for (let x: number =0; x < gameResponse.playerResults.length; x++) {
            console.log('Adding the playerId: ' + gameResponse.playerResults[x].playerId.toString());
            playerIds.push(gameResponse.playerResults[x].playerId.toString());

            let newPlayer: AgricolaPlayer = AgricolaPlayer.fromServerObject(gameResponse.playerResults[x], 
                gameResponse.playerResults[x].playerId.toString(), 
                this.playerForId(gameResponse.playerResults[x].playerId.toString()));
            
            console.log('created the new player: ' + JSON.stringify(newPlayer));
            this.currentPlayers.push(newPlayer);

        }
    }

    private playerForId(_id: string): string {
        console.log('getting player for id: ' + _id);
        return this.playerService.getName(_id);
    }

    private saveGame() {
        console.log('Saving the game!');

        this.agricolaService.saveGame(this.gameId, this.currentPlayers)
            .subscribe(result => {
                console.log('Got the result from saving: ' + result);
            },
            error => {
                console.error('Got the error from saving: ' + error);
            });

        console.log('Have the following in the collection\n' + JSON.stringify(this.currentPlayers));
    }

    private goBack() {
        console.log('The user selected to go back!');
        this.router.navigate(['/LauncherComponent']);  
    }

    private setActiveGameDef(_serverGameDefId: string) {
        this.activeGameDef = this.gameDefService.getServerGameDef(_serverGameDefId);
        this.activeGameDefName = this.activeGameDef.name;
    }
}
