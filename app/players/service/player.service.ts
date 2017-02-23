import {
    ServerPlayer
} from '../../shared/shared'

import { 
    Injectable,
    OnInit 
} from '@angular/core';

import { 
    Http, 
    Response, 
} from '@angular/http';


@Injectable()
export class PlayerService {
    private standardUrl = 'http://localhost:30000/standard';

    private allPlayers: {[key: string]: string};

    constructor(private http: Http) {
        //get all of the player
        console.log('constructor running!');
        this.allPlayers = {};

        this.getAllPlayers();
    }

    private getAllPlayers(): void {
        console.log('getting all players!');
        this.http.get(this.standardUrl + '/allPlayers')
            .map(response => {
                let serverPlayers: ServerPlayer[] = response.json();

                console.log('got the players:\n' + JSON.stringify(serverPlayers));

                for (let x: number = 0; x < serverPlayers.length; x++) {
                    console.log('running for: ' + serverPlayers[x]._id + ' --- ' + serverPlayers[x].name);
                    if (!(this.allPlayers[serverPlayers[x]._id])) {
                        console.log('adding!');
                        this.allPlayers[serverPlayers[x]._id] = serverPlayers[x].name;;
                    }
                }
            }).subscribe();
    }

    public getName(_id: string) : string {

        return this.allPlayers[_id];
    }

    public addPlayer(_id: string, _name: string) {
        if (!this.allPlayers[_id]) {
            this.allPlayers[_id] = _name;
        }
    }
}