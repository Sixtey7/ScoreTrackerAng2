import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import StandardGameComponent from './standard_game.component';

@Component({
    selector: 'standard-game-router',
    directives: [ROUTER_DIRECTIVES],
    template: '<router-outlet></router-outlet>'
})
@RouteConfig([
    {
        path: '/',
        name: 'NewGame',
        component: StandardGameComponent,
        useAsDefault: true
    },
    {
        path: '/:id',
        name: 'ResumeGame',
        component: StandardGameComponent
    }
])
export default class StandardGameRouterComponent {}