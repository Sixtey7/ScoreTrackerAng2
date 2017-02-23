import { Component, OnInit, ViewChild } from '@angular/core';
import AgricolaPlayerComponent from '../player/agricola_player.component';
import { AgricolaServerPlayerResult, AgricolaPlayer }from '../agricola';
import AgricolaService from '../service/agricola_service';
import { GameList ,Modal, PromptUsername, ServerGame, ServerPlayer } from '../../shared/shared';
import { Http } from '@angular/http';
import { RouteParams} from '@angular/router-deprecated';
import { AgricolaServerGame } from '../agricola';
import { PlayerService } from '../../players/players';

@Component({
    selector: 'agricola-game',
    directives: [ AgricolaPlayerComponent, Modal ],
    providers: [ AgricolaService, PlayerService ],
    styleUrls: [ 'app/style/app.style.css', 'app/agricola/game/agricola_game.component.css' ],
    templateUrl: 'app/agricola/game/agricola_game.component.html'
})
export default class AgricolaGameComponent implements OnInit {
    currentPlayers: AgricolaPlayer[];
    gameId: string;
    @ViewChild(Modal) modal;

    constructor(private agricolaService: AgricolaService, private routeParams: RouteParams, private playerService: PlayerService) {
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
            console.log('ngOninit did not find a game id');

            this.agricolaService.beginGame()
                    .subscribe(
                        response => this.extractGameId(response),
                        error => console.log('ERROR: ' + error));
        }
        
    }

    playerScoreUpdated(index: number, updatedPlayer: AgricolaPlayer):void {
        if (this.currentPlayers[index].name === updatedPlayer.name) {
            //we could copy the entire object here, but for now, just copying the value out
            this.currentPlayers[index].score = updatedPlayer.score;

            console.log('calling the backend to update the score');

            this.agricolaService.updateScoreForPlayer(this.gameId, updatedPlayer)
                .subscribe(response => console.log('Sucessfully updated score on backend'), 
                            error => console.error('error updating the backend: ' + error));
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
                        playerObj => {
                            //TODO: Need to fix this to not look this ugly
                            console.log('Got from server: ' + JSON.stringify(playerObj));
                            if (!playerObj.fieldsNum) {
                                playerObj.fieldsNum = 0;
                            }
                            if (!playerObj.pastureNum) {
                                playerObj.pastureNum = 0;
                            }
                            if (!playerObj.grainNum) {
                                playerObj.grainNum = 0;
                            }
                            if (!playerObj.vegNum) {
                                playerObj.vegNum = 0;
                            }
                            if (!playerObj.sheepNum) {
                                playerObj.sheepNum = 0;
                            }
                            if (!playerObj.pigNum) {
                                playerObj.pigNum = 0;
                            }
                            if (!playerObj.cowNum) {
                                playerObj.cowNum = 0;
                            }
                            if (!playerObj.unusedNum) {
                                playerObj.unusedNum = 0;
                            }
                            if (!playerObj.stableNum) {
                                playerObj.stableNum = 0;
                            }
                            if (!playerObj.clayNum) {
                                playerObj.clayNum = 0;
                            }
                            if (!playerObj.stoneNum) {
                                playerObj.stoneNum = 0;
                            }
                            if (!playerObj.familyNum) {
                                playerObj.familyNum = 2;
                            }
                            if (!playerObj.cardNum) {
                                playerObj.cardNum = 0;
                            }
                            if (!playerObj.bonusNum) {
                                playerObj.bonusNum = 0;
                            }
                            
                            this.playerService.addPlayer(playerObj.playerId.toString(), playerName);
                            playerObj.name = playerName;
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

            let newPlayer: AgricolaPlayer = new AgricolaPlayer(gameResponse.playerResults[x].playerId.toString(), 
                this.playerForId(gameResponse.playerResults[x].playerId.toString()), 
                gameResponse.playerResults[x].score);
            
            //TODO: Somewhere around here I'm adding 10,000 new players
            console.log('created the new player: ' + JSON.stringify(newPlayer));
            this.currentPlayers.push(newPlayer);

        }
    }

    private playerForId(_id: string): string {
        console.log('getting player for id: ' + _id);
        return this.playerService.getName(_id);
    }
}
