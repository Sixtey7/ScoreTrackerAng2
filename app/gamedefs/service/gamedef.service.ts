import {
    ServerGameDef,
    ServerGameDefExpansion
} from '../../shared/shared';

import {
    Injectable,
    OnInit
} from '@angular/core';

import {
    Http,
    Response
} from '@angular/http';

@Injectable()
export class GameDefService {
    private gameDefUrl = 'http://localhost:30000/standard';

    private allGameDefs: {[key: string]: ServerGameDef};

    constructor(private http: Http) {
        //get all of the game allGameDefs
        console.log('constructor running!');
        this.allGameDefs = {};

        this.getAllGameDefs();
    }

    private getAllGameDefs(): void {
        console.log('Getting all game defs!');
        this.http.get(this.gameDefUrl + '/allGameDefs')
            .map(response => {
                let serverGameDefs: ServerGameDef[] = response.json();

                console.log('Got the game defs: ' + JSON.stringify(serverGameDefs));

                for (let x: number = 0; x < serverGameDefs.length; x++) {
                    if (!(this.allGameDefs[serverGameDefs[x]._id])) {
                        this.allGameDefs[serverGameDefs[x]._id] = serverGameDefs[x];
                    }
                }
            })
            .subscribe();
    }

    public getServerGameDef(_id: string): ServerGameDef {
        return this.allGameDefs[_id];
    }

    public addGameDef(_gameDefToAdd: ServerGameDef) {
        if (!this.allGameDefs[_gameDefToAdd._id]) {
            this.allGameDefs[_gameDefToAdd._id] = _gameDefToAdd;
        }
        else {
            console.error('Called to add a game def that already exists!\n' + JSON.stringify(_gameDefToAdd));
        }
    }
}