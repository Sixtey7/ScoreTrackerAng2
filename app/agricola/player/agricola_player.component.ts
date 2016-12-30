import { Component, Input } from '@angular/core';
import AgricolaScoreComponent from '../score/agricola_score.component';

@Component({
    selector: 'agricola-player',
    directives: [ AgricolaScoreComponent ],
    styleUrls: ['app/agricola/player/agricola_player.component.css'],
    templateUrl: 'app/agricola/player/agricola_player.component.html'
})
export default class AgricolaPlayerComponent {
    @Input() playerName: string;
}