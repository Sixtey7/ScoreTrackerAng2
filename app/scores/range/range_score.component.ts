import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ScoreWidgetComponent  from '../widget/score_widget.component';
import ScoreableComponent from '../interfaces/scoreable.component';
import { RangeScore } from '../../shared/shared';

@Component({
    selector: 'range-score',
    styleUrls: ['app/scores/range/range_score.component.css'],
    templateUrl: 'app/scores/range/range_score.component.html',
    directives: [ ScoreWidgetComponent ]
})
export default class RangeScoreComponent extends ScoreableComponent implements OnInit {
    @Input() keys: string;
    @Input() values: string;
    @Input() initialValue: number;
    @Input() name: string;

    @Output() scoreUpdated: EventEmitter<number[]>;

    currentScore: number;
    currentNum: number;
    backingClass: RangeScore;

    constructor() {
        super();

        this.scoreUpdated = new EventEmitter<number[]>();

        this.currentScore = 0;
    }

    ngOnInit(): void {
        this.currentNum = this.initialValue;

        //build the key-value pair map
        let valueMap: Map<number, number> = new Map<number, number>();

        console.log('Keys: ' + this.keys);
        console.log('Values: ' + this.values);

        let keyArray: number[] = this.keys.split(' ').map(value => { console.log('---' + value + '---'); return Number(value) } );
        let valueArray: number[] = this.values.split(' ').map(value => Number(value));

        console.log('Number of keys: ' + keyArray.length);
        console.log('Number of values: ' + valueArray.length);

        if (keyArray.length !== valueArray.length) {
            console.log('ERROR - we have a different number of keys than values');
        }

        for (let x: number = 0; x < keyArray.length; x++) {
            valueMap.set(keyArray[x], valueArray[x]);
        }

        //setup the backing class
        this.backingClass = new RangeScore(valueMap);

        this.backingClass.setCurrNum(this.currentNum);
        this.currentScore = this.backingClass.getScore();

        this.scoreUpdated.emit([ this.currentNum, this.currentScore ]);
    }

    valueUpdated(newValue: number): void {
        console.log('Value: ' + newValue);
        this.currentNum = newValue;
        this.backingClass.setCurrNum(this.currentNum);

        this.currentScore = this.backingClass.getScore();

        this.scoreUpdated.emit([ this.currentNum, this.currentScore ]);

    }
}