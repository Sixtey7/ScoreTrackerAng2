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
    URLSearchParams,
    RequestOptions,
    Headers
} from '@angular/http';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class PlayerService {
    private standardUrl = 'http://localhost:30000/players';

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

    public getPlayers(_playerNames: string[]) : Observable<ServerPlayer[]>{
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        for (let x: number = 0; x < _playerNames.length; x++) {
            params.append('playerIds', _playerNames[x])
        }
        options.search = params;

        return this.http.get(this.standardUrl + '/players', options)
            .map(this.extractJson)
            .catch(this.handleError);
    }

    public getName(_id: string) : string {

        return this.allPlayers[_id];
    }

    public addPlayer(_id: string, _name: string) {
        console.log('called to add ' + _name + ' + for id ' + _id);
        if (!this.allPlayers[_id]) {
            console.log('added!');
            this.allPlayers[_id] = _name;
        }
        else {
            console.log('id already exists for player: ' + this.allPlayers[_id]);
        }
    }

     private extractJson(res: Response) {
        let body = res.json();
        console.log('data from server in json: ' + body);
        return body || { };
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}