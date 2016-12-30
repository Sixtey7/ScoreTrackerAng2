import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'score-widget',
    styleUrls: ['app/scores/widget/score_widget.component.css'],
    templateUrl: 'app/scores/widget/score_widget.component.html'
})
export default class ScoreWidgetComponent implements OnInit {
    //this should probably be an input value
    @Input() initialValue: number;
    @Output() valueUpdated: EventEmitter<number>;

    currentValue: number;

    constructor() {
        this.valueUpdated = new EventEmitter();
    }

    ngOnInit(): void {
        console.log('Score Widget On Init!');
        console.log('initial value was: ' + this.initialValue);
        this.currentValue = this.initialValue;
    }

    decreaseNumber(): void {
        console.log("Decreasing number!");
        //no reason this should go below 0
        if (this.currentValue > 0) {
            this.currentValue--;
        }

        //emit the current value
        this.valueUpdated.emit(this.currentValue);
    }

    increaseNumber(): void {
        console.log('Increasing Number!');
        this.currentValue++;

        this.valueUpdated.emit(this.currentValue);
    }
}