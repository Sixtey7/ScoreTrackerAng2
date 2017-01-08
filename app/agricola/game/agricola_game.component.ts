import { Component, OnInit, ViewChild } from '@angular/core';
import AgricolaPlayerComponent from '../player/agricola_player.component';
import AgricolaPlayer from '../player/agricola_player';
import { Modal } from '../../shared/shared';
import PromptUsername from './prompt_username.component';

@Component({
    selector: 'agricola-game',
    directives: [ AgricolaPlayerComponent, Modal ],
    styleUrls: [ 'app/agricola/game/agricola_game.component.css' ],
    templateUrl: 'app/agricola/game/agricola_game.component.html'
})
export default class AgricolaGameComponent {
    currentPlayers: AgricolaPlayer[];
    @ViewChild(Modal) modal;

    constructor() {
        this.currentPlayers = new Array<AgricolaPlayer>();

        //TODO: Eventually remove these two sample users
        /*let user1: AgricolaPlayer = new AgricolaPlayer("Danny");
        this.currentPlayers.push(user1);

        let user2: AgricolaPlayer = new AgricolaPlayer("Patrick");
        this.currentPlayers.push(user2);*/
    }

    playerScoreUpdated(index: number, updatedPlayer: AgricolaPlayer):void {
        console.log('We were told that index: ' + index + ' with name: ' + updatedPlayer.name + ' has been updated');

        if (this.currentPlayers[index].name === updatedPlayer.name) {
            console.log('Name matches - we\'re good!');
            //we could copy the entire object here, but for now, just copying the value out
            this.currentPlayers[index].score = updatedPlayer.score;
            console.log('New Values: ' + this.currentPlayers[index].name + ' --- ' + this.currentPlayers[index].score);
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

        let newUser: AgricolaPlayer = new AgricolaPlayer(playerName);
        this.currentPlayers.push(newUser);
    }
}