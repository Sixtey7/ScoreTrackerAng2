import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import AgricolaScoreComponent from '../score/agricola_score.component';
import AgricolaPlayer from './agricola_player';

@Component({
    selector: 'agricola-player',
    directives: [ AgricolaScoreComponent ],
    styleUrls: ['app/agricola/player/agricola_player.component.css'],
    templateUrl: 'app/agricola/player/agricola_player.component.html'
})
export default class AgricolaPlayerComponent implements OnInit {
    @Input() player: AgricolaPlayer;

    @Output() playerScoreUpdated: EventEmitter<AgricolaPlayer>;


    constructor() {
        this.playerScoreUpdated = new EventEmitter<AgricolaPlayer>();
    }

    ngOnInit(): void {
        //TODO: Do I actually need this?
    }

    scoreUpdateNotification(_player: AgricolaPlayer) {
        console.log('------------------------------------');
        console.log('Score updated for: ' + JSON.stringify(this.player));
        console.log('------------------------------------');
        this.player = _player;

        this.playerScoreUpdated.emit(this.player);
    }

}