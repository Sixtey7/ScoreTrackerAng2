import { Component } from '@angular/core';
import { SingleScoreComponent, RangeScoreComponent } from '../../scores/scores';

@Component({
    selector: 'agricola-scores',
    directives: [ SingleScoreComponent, RangeScoreComponent ],
    styleUrls: ['app/agricola/score/agricola_score.component.css'],
    templateUrl: 'app/agricola/score/agricola_score.component.html'
})
export default class AgricolaScoreComponent {
    totalScore: number;
    currentValues: Map<string, number>;

    constructor() {
        this.totalScore = 0;
        
        this.currentValues = new Map<string, number>();

        //default all the current values
        this.currentValues[0] = 0;
        this.currentValues[1] = 0;
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
    }
}