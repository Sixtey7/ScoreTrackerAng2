import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SingleScoreComponent, RangeScoreComponent } from '../../scores/scores';
import { Player } from '../../shared/shared';

@Component({
    selector: 'agricola-scores',
    directives: [ SingleScoreComponent, RangeScoreComponent ],
    styleUrls: ['app/agricola/score/agricola_score.component.css'],
    templateUrl: 'app/agricola/score/agricola_score.component.html'
})
export default class AgricolaScoreComponent {
    totalScore: number;
    currentValues: Map<string, number>;

    @Input() player: Player;
    @Output() totalScoreUpdated: EventEmitter<number>;

    constructor() {
        this.totalScore = 0;
        
        this.currentValues = new Map<string, number>();

        this.totalScoreUpdated = new EventEmitter<number>();
    }

    updateScore(pos: string, value: number): void {
        console.log('Update Score called for position: ' + pos + ' and with value: ' + value);
        this.currentValues.set(pos, value);
        //this.currentValues[pos] = value;

        this.updateTotalScore();
    }

    private updateTotalScore(): void {
        let totalScore: number = 0;

        console.log('There are: ' + this.currentValues.keys.length + ' keys');
        this.currentValues.forEach((value: number, key: string) => {
            console.log('Key: ' + key + ' value: ' + value);
            totalScore += value;
        });

        this.totalScore = totalScore;

        this.totalScoreUpdated.emit(this.totalScore);
    }
}