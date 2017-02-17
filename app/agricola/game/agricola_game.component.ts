import { Component, OnInit, ViewChild } from '@angular/core';
import AgricolaPlayerComponent from '../player/agricola_player.component';
import { AgricolaServerPlayerResult, AgricolaPlayer }from '../agricola';
import AgricolaService from '../service/agricola_service';
import { GameList ,Modal, PromptUsername, ServerGame, ServerPlayer } from '../../shared/shared';
import { Http } from '@angular/http';
import { RouteParams} from '@angular/router-deprecated';
import { AgricolaServerGame } from '../agricola';

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
    @ViewChild(Modal) modal;

    constructor(private agricolaService: AgricolaService, private routeParams: RouteParams) {
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

            this.agricolaService.updateScoreForPlayer(this.gameId, updatedPlayer);
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
                        response => {
                            console.log('Got from server: ' + JSON.stringify(response));
                            this.currentPlayers.push(new AgricolaPlayer(response._id, response.name));
                        },
                        error => console.log('ERROR: ' + error));

        //let data = this.agricolaService.beginGame();

        //console.log('Data: ' + JSON.stringify(data));
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
        }

        this.agricolaService.getPlayers(playerIds)
            .subscribe(response => {
                for (let y: number = 0; y < response.length; y++) {
                    //find the matching playerResults
                    let playerResultPos: number = -1;
                    //TODO: could cache a map of player ids to positions above, or make an array, or something to make this faster
                    for (playerResultPos = 0; playerResultPos < gameResponse.playerResults.length; playerResultPos++) {
                        if (gameResponse.playerResults[playerResultPos].playerId === response[y]._id) {
                            break;
                        }
                    }

                    let newPlayer: AgricolaPlayer = new AgricolaPlayer(response[y]._id, response[y].name, gameResponse.playerResults[playerResultPos].score);
                    this.currentPlayers.push(newPlayer);
                }
            }, 
            error => console.error('GOT AN ERROR: ' + error));
    }
}
