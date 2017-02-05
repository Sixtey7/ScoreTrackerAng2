import { Component, OnInit, ViewChild } from '@angular/core';
import { LauncherService } from '../service/launcher.service';
import { GameList, ServerGame } from '../../shared/shared';
import { Router } from '@angular/router-deprecated';


@Component({
    selector: 'launcher-component',
    providers: [LauncherService],
    styleUrls: [ 'app/launcher/comp/launcher.component.css'],
    templateUrl: 'app/launcher/comp/launcher.component.html'
})
export default class LauncherComponent implements OnInit {
    private allGames : ServerGame[]; 
    constructor(private launcherService: LauncherService, private router: Router) {
        this.allGames = new Array<ServerGame>();
    }

    ngOnInit(): void {
        this.launcherService.getAllGames()
            .subscribe(
                response => this.extractAllGames(response),
                error => console.log('ERROR: ' + error));
    }


    private extractAllGames(response : ServerGame[]) {
        console.log('\n---------\nGOT ALL GAMES\n' + JSON.stringify(response) + '\n---------');

        console.log(typeof response);

        for (let x: number = 0; x < response.length; x++) {
            response[x].gameString = GameList[response[x].game].toString();
            this.allGames.push(response[x]);
        }
        
    }

    launchGame(gameId: string) {
        console.log('consoling the id: ' + gameId);

        //this.router.navigate(['AgricolaGameRouterComponent', 'ResumeGame', { id: gameId }]);
        this.router.navigate(['StandardGameRouterComponent', 'ResumeGame', { id: gameId }]);
    }
}