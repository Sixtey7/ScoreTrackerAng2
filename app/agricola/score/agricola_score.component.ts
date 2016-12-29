import { Component } from '@angular/core';
import { SingleScoreComponent } from '../../scores/scores';

@Component({
    selector: 'agricola-scores',
    directives: [ SingleScoreComponent ],
    styleUrls: ['app/agricola/score/agricola_score.component.css'],
    templateUrl: 'app/agricola/score/agricola_score.component.html'
})
export default class AgricolaScoreComponent {

}