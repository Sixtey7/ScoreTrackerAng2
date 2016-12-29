import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SingleScore } from '../../shared/shared';
import  ScoreWidgetComponent  from '../widget/score_widget.component';

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
export default class SingleScoreComponent implements OnInit {
    currentValue: number;
    backingClass: SingleScore;
    @Output() private scoreUpdated: EventEmitter<number>;

    constructor() {
        this.scoreUpdated = new EventEmitter();
    }
    ngOnInit(): void {
        this.backingClass = new SingleScore();
    }

    valueUpdated(newValue: number): void {
        console.log('Value: ' + newValue);
        this.backingClass.setCurrNum(newValue);

        this.scoreUpdated.emit(this.backingClass.getScore());
    }
}