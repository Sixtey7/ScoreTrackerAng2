import { Component, OnInit } from '@angular/core';
import AgricolaPlayerComponent from '../player/agricola_player.component';
import AgricolaPlayer from '../player/agricola_player';

@Component({
    selector: 'agricola-game',
    directives: [ AgricolaPlayerComponent ],
    styleUrls: [ 'app/agricola/game/agricola_game.component.css' ],
    templateUrl: 'app/agricola/game/agricola_game.component.html'
})
export default class AgricolaGameComponent {
    currentPlayers: AgricolaPlayer[];

    constructor() {
        this.currentPlayers = new Array<AgricolaPlayer>();

        //TODO: Eventually remove these two sample users
        let user1: AgricolaPlayer = new AgricolaPlayer("Patrick");
        this.currentPlayers.push(user1);

        let user2: AgricolaPlayer = new AgricolaPlayer("Danny");
        this.currentPlayers.push(user2);
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
}