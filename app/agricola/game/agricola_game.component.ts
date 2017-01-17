import { Component, OnInit, ViewChild } from '@angular/core';
import AgricolaPlayerComponent from '../player/agricola_player.component';
import AgricolaPlayer from '../player/agricola_player';
import { Modal } from '../../shared/shared';
import PromptUsername from './prompt_username.component';
import { Http } from '@angular/http';
import { AgricolaService } from '../service/agricola.service';

@Component({
    selector: 'agricola-game',
    directives: [ AgricolaPlayerComponent, Modal ],
    providers: [ AgricolaService ],
    styleUrls: [ 'app/agricola/game/agricola_game.component.css' ],
    templateUrl: 'app/agricola/game/agricola_game.component.html'
})
export default class AgricolaGameComponent implements OnInit {
    currentPlayers: AgricolaPlayer[];
    @ViewChild(Modal) modal;

    constructor(private agricolaService: AgricolaService) {
        this.currentPlayers = new Array<AgricolaPlayer>();
    }

    ngOnInit(): void {
        this.agricolaService.beginGame()
                    .subscribe(
                        response => console.log('Response: ' + response),
                        error => console.log('ERROR: ' + error));
    }

    playerScoreUpdated(index: number, updatedPlayer: AgricolaPlayer):void {
        //console.log('We were told that index: ' + index + ' with name: ' + updatedPlayer.name + ' has been updated');

        if (this.currentPlayers[index].name === updatedPlayer.name) {
            //console.log('Name matches - we\'re good!');
            //we could copy the entire object here, but for now, just copying the value out
            this.currentPlayers[index].score = updatedPlayer.score;
            //console.log('New Values: ' + this.currentPlayers[index].name + ' --- ' + this.currentPlayers[index].score);

            this.agricolaService.updateScoreForPlayer(updatedPlayer.id, updatedPlayer.score)
                .subscribe();
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

        //TODO: Need to handle the player object that is coming back
        this.agricolaService.addPlayer(playerName)
                    .subscribe(
                        response => {
                            console.log('Got from server: ' + JSON.stringify(response));
                            let testNewPlayer: AgricolaPlayer = new AgricolaPlayer(response.id, response.name);
                            console.log('Created the player: ' + JSON.stringify(testNewPlayer));
                            this.currentPlayers.push(new AgricolaPlayer(response.id, response.name));
                        },
                        error => console.log('ERROR: ' + error));

        //let data = this.agricolaService.beginGame();

        //console.log('Data: ' + JSON.stringify(data));
    }
}
