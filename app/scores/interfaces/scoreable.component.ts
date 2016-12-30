import { Output, EventEmitter } from '@angular/core';

abstract class ScoreableComponent {
    @Output() scoreUpdated: EventEmitter<number>;
}

export default ScoreableComponent;