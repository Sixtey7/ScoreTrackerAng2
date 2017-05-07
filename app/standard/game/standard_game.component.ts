import { Component, OnInit, ViewChild, Input } from '@angular/core';
import StandardPlayerComponent from '../player/standard_player.component';
import {
    Modal, 
    Player, 
    PromptUsername, 
    ServerGame, 
    ServerPlayer, 
    ServerGameDef,
    GameList } from '../../shared/shared';
import { Http } from '@angular/http';
import { StandardService } from '../service/standard.service';
import { RouteParams } from '@angular/router-deprecated';
import { GameDefService } from '../../gamedefs/gamedefs';
import { PlayerService } from '../../players/players';
import { Router } from '@angular/router-deprecated';


@Component({
    selector: 'standard-game',
    directives: [ StandardPlayerComponent, Modal ],
    providers: [ StandardService ],
    styleUrls: ['app/style/app.style.css', 'app/standard/game/standard_game.component.css'],
    templateUrl: 'app/standard/game/standard_game.component.html'
})
export default class StandardGameComponent implements OnInit {
    currentPlayers: Player[];
    gameId: string;
    activeGameDef: ServerGameDef;
    activeGameDefName: string;
    @ViewChild(Modal) modal;

    constructor(private standardService: StandardService, private routeParams: RouteParams, private gameDefService: GameDefService, private router: Router, private playerService: PlayerService) {
        this.currentPlayers = new Array<Player>();
    }

    ngOnInit(): void {
        let gameId = this.routeParams.params['id'];

        if (gameId !== undefined) {
            console.log('ngOnInit found the id: ' + gameId);
            this.standardService.getGame(gameId)
                .subscribe(
                    response => {
                        this.loadGame(response);
                    },
                    err => {
                        console.error('Got an error attempting to load game with id: ' + gameId + '\n' + err);
                    }
                )
        }
        else {
            console.log('ngOnInit did not find a game id!');

            let gameDefId = this.routeParams.params['gameDefId'];
            if (gameDefId !== undefined) {
                console.log('found the game def id : ' + gameDefId);
                this.setActiveGameDef(gameDefId);
                console.log('built the active game def: ' + JSON.stringify(this.activeGameDef));
                //TODO: Fix
                this.standardService.beginGameOld(this.activeGameDef._id)
                    .subscribe(
                        response => {
                            this.extractGameId(response)
                        },
                        error => {
                            console.error('Got an error attempting to start a new game of ' + this.activeGameDef.name + '\nerror');
                        }
                    );
            }
            else {
                console.error('No Route Id and No Game Def Id!')
            }
        }
    }

    playerScoreUpdated(index: number, updatedPlayer: Player) {
        if (this.currentPlayers[index].name === updatedPlayer.name) {
            this.currentPlayers[index].score = updatedPlayer.score;

            //this.standardService.updateScoreForPlayer(this.gameId, updatedPlayer.id, updatedPlayer.score)
             //   .subscribe();
        }
        else {
            //TODO: if we ever want to create a rename through this route, this is the place to do so
            console.error('Updated player name does not match the player name in array!');
        }
    }

    private promptForUsername(): void {
        this.modal.modalTitle = 'Enter Name';
        this.modal.modalFooter = false;
        this.modal.modalMessage = false;
        this.modal.open(PromptUsername);
    }

    private addNewPlayer(playerName: string): void {
        console.log('User selected to add a new Player!');

        this.standardService.addPlayer(this.gameId, playerName)
            .subscribe(response => {
                this.currentPlayers.push(new Player(response._id, response.name));
            },
            error => console.error('Error attempting to add player (' + playerName + ') to game: ' + this.gameId +'\n' + error)
        );
    }

    private extractGameId(responseString: string) {
        this.gameId = responseString;
    }

    private loadGame(gameResponse: ServerGame) {
        this.gameId = gameResponse._id;
        console.log('Got the game def id: ' + gameResponse.gameDefId);
        this.setActiveGameDef(gameResponse.gameDefId);
        let playerIds: string[] = new Array<string>();

        for (let x: number = 0; x < gameResponse.playerResults.length; x++) {
            playerIds.push(gameResponse.playerResults[x].playerId.toString());
        }

        if (playerIds.length > 0) {
            this.playerService.getPlayers(playerIds)
                .subscribe(
                    response => {
                        for (let y: number=0; y < response.length; y++) {
                            let playerResultPos = -1;
                            for (playerResultPos = 0; playerResultPos < gameResponse.playerResults.length; playerResultPos++) {
                                if (gameResponse.playerResults[playerResultPos].playerId === response[y]._id) {
                                    break;
                                }
                            }

                            let newPlayer: Player = new Player(response[y]._id, response[y].name, gameResponse.playerResults[playerResultPos].score);
                            this.currentPlayers.push(newPlayer);
                        }
                    },
                    error => {
                        console.error('Got an error attempting to retrieve players from the backend!');
                    }
                );
        }
    }

    private saveGame() {
        console.log('Saving the game!');

        this.standardService.saveGame(this.gameId, this.currentPlayers)
            .subscribe(result => {
                console.log('Got the result from saving: ' + result);
            },
            error => {
                console.error('Got the error from saving: ' + error);
            });
    }

    private goBack() {
        console.log('The user selected to go back!');
        this.router.navigate(['/LauncherComponent']);
    }

    private setActiveGameDef(_serverGameDefId: string) {
        console.log('Setting the active game def for string value: ' + _serverGameDefId);
        this.activeGameDef = this.gameDefService.getServerGameDef(_serverGameDefId);
        this.activeGameDefName = this.activeGameDef.name;
    }
}