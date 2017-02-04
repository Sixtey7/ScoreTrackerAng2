import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import AgricolaGameComponent from './agricola_game.component';

@Component({
    selector: 'agricola-game-router',
    directives: [ROUTER_DIRECTIVES],
    template: '<router-outlet></router-outlet>'
})
@RouteConfig([
    {
        path: '/',
        name: 'NewGame',
        component: AgricolaGameComponent,
        useAsDefault: true
    },
    {
        path: '/:id',
        name: 'ResumeGame',
        component: AgricolaGameComponent 
    }
])
export default class AgricolaGameRouterComponent {}