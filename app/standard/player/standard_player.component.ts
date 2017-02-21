import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Player } from '../../shared/shared';
import { SingleScoreComponent } from '../../scores/scores';

@Component({
    selector: 'standard-player',
    directives: [ SingleScoreComponent ],
    styleUrls: ['app/standard/player/standard_player.component.css'],
    templateUrl: 'app/standard/player/standard_player.component.html'
})
export default class StandardPlayerComponent implements OnInit {
    @Input() player: Player;

    @Output() playerScoreUpdated: EventEmitter<Player>;

    constructor() {
        this.playerScoreUpdated = new EventEmitter<Player>();
    }

    ngOnInit(): void {
        //TODO: Do I actually need this?
    }

    updateScore(score: number[]) {
        this.player.score = score[1];
        this.playerScoreUpdated.emit(this.player);
    }


}