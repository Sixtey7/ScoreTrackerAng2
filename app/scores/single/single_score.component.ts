import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SingleScore } from '../../shared/shared';
import  ScoreWidgetComponent  from '../widget/score_widget.component';
import ScoreableComponent from '../interfaces/scoreable.component';

if (typeof ScoreWidgetComponent === "undefined") {
    console.log('UNDEFINED!!!');
}
else {
    console.log('Not undefined!');
}

@Component({
    selector: 'single-score',
    styleUrls: ['app/scores/single/single_score.component.css'],
    templateUrl: 'app/scores/single/single_score.component.html',
    directives: [ ScoreWidgetComponent ]
})
export default class SingleScoreComponent extends ScoreableComponent implements OnInit {
    @Input() multiplier: number;
    @Input() initialValue: number;
    @Input() name: string;

    @Output() scoreUpdated: EventEmitter<number[]>;

    currentNum: number;
    currentScore: number;
    backingClass: SingleScore;

    constructor() {
        super();

        this.scoreUpdated = new EventEmitter();

        this.currentScore = 0;
    }
    ngOnInit(): void {
        if (this.multiplier !== undefined) {
            this.backingClass = new SingleScore(this.multiplier);
        }
        else {
            this.backingClass = new SingleScore(1);
        }

        this.currentNum = this.initialValue;
        
        this.currentScore = this.backingClass.calculateScore(this.currentNum);

        //initial emit to set the current value
        this.scoreUpdated.emit([this.currentNum, this.currentScore]);
    }

    valueUpdated(newValue: number): void {
        console.log('Value: ' + newValue);
        this.currentNum = newValue;
        this.backingClass.setCurrNum(this.currentNum);

        this.currentScore = this.backingClass.getScore();

        this.scoreUpdated.emit([this.currentNum, this.currentScore ]);

    }
}