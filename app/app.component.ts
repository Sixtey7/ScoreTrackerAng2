import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { 
    ROUTER_PROVIDERS,
    RouteConfig,
    ROUTER_DIRECTIVES,
    Router
} from '@angular/router-deprecated';



import { AgricolaPlayerComponent } from './agricola/agricola';
@Component({
    selector: 'score-tracking-app',
    directives: [ROUTER_DIRECTIVES, AgricolaPlayerComponent],
    providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS],
    templateUrl: 'app/app.component.html'
})
@RouteConfig([
    {
        path: '',
        name: 'Home',
        redirectTo: ['AgricolaScoreComponent']
    },
    {
        path: 'agricola',
        name: 'AgricolaScoreComponent',
        component: AgricolaPlayerComponent,
        useAsDefault: true
    }
])
export default class AppComponent {
    constructor(private router: Router) {
        console.log('Standing up the app...');
    }
}