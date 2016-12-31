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
    @Input() playerName: string;

    @Output() playerScoreUpdated: EventEmitter<AgricolaPlayer>;

    private boundPlayer: AgricolaPlayer;

    constructor() {
        this.playerScoreUpdated = new EventEmitter<AgricolaPlayer>();
    }

    ngOnInit(): void {
        this.boundPlayer = new AgricolaPlayer(this.playerName);
    }

    scoreUpdateNotification(score: number) {
        this.boundPlayer.score = score;

        this.playerScoreUpdated.emit(this.boundPlayer);
    }

}