import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SingleScoreComponent, RangeScoreComponent } from '../../scores/scores';
import { AgricolaPlayer } from '../agricola';

@Component({
    selector: 'agricola-scores',
    directives: [ SingleScoreComponent, RangeScoreComponent ],
    styleUrls: ['app/agricola/score/agricola_score.component.css'],
    templateUrl: 'app/agricola/score/agricola_score.component.html'
})
export default class AgricolaScoreComponent {
    totalScore: number;
    currentValues: Map<string, number>;

    @Input() player: AgricolaPlayer;

    //TODO: This needs to be an EventEmitter of the player
    @Output() totalScoreUpdated: EventEmitter<AgricolaPlayer>;

    constructor() {
        
        this.currentValues = new Map<string, number>();

        this.totalScoreUpdated = new EventEmitter<AgricolaPlayer>();
    }

    updateScore(pos: string, value: number[]): void {
        console.log('Update Score called for position: ' + pos + ' and with value: ' + value);
        this.currentValues.set(pos, value[1]);

        this.player[pos] = value[0];
        this.currentValues[pos] = value[1];

        this.updateTotalScore();
    }

    private updateTotalScore(): void {
        let totalScore: number = 0;

        console.log('There are: ' + this.currentValues.keys.length + ' keys');
        this.currentValues.forEach((value: number, key: string) => {
            console.log('Key: ' + key + ' value: ' + value);
            totalScore += value;
        });

        this.player.score = totalScore;

        this.totalScoreUpdated.emit(this.player);
    }
}