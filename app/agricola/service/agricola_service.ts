import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { AgricolaServerGame, AgricolaServerPlayerResult, AgricolaPlayer } from '../agricola';

import { GameList, ServerPlayer } from '../../shared/shared';

@Injectable()
export default class AgricolaService {
    private agricolaUrl = 'http://localhost:30000/agricola';

    constructor(private http: Http) {}

    beginGame(): Observable<string> {
        console.log('beginning a new game of agricola!');

        return this.http.put(this.agricolaUrl + '/begin', null)
            .map(this.extractString)
            .catch(this.handleError);
    }

    getGame(gameId: string): Observable<AgricolaServerGame> {
        let options: RequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameId', gameId);
        options.search = params;
        return this.http.get(this.agricolaUrl + '/currentScores', options)
            .map(this.extractJson)
            .catch(this.handleError);
    }

    getPlayers(playerIds: string[]): Observable<ServerPlayer[]> {
        let options: RequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        for (let x: number = 0; x < playerIds.length; x++) {
            params.append('playerIds', playerIds[x]);
        }
        options.search = params;

        return this.http.get(this.agricolaUrl + '/players', options)
            .map(this.extractJson)
            .catch(this.handleError);
    }

    addPlayer(gameId: string, playerName: string): Observable<any> {
        let options: RequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameId', gameId);
        params.set('playerName', playerName);
        options.search = params;

        return this.http.put(this.agricolaUrl + '/addPlayer', null, options)
            .map(this.extractJson)
            .catch(this.handleError);
    }

    updateScoreForPlayer(gameId: string, player: AgricolaPlayer) {
        let options: RequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameId', gameId);
        options.search = params;

        console.log('firing off the request to the backend!');


        return this.http.post(this.agricolaUrl + '/setScore', JSON.stringify(player), options)
            .map(this.extractStatus)
            .catch(this.handleError);
    }

    saveGame(gameId: string, playerArray: AgricolaPlayer[]) {
        let options: RequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameId', gameId);
        options.search = params;

        //turn the AgricolaPlayers back into ServerAgricolaPlayerResult
        let serverArray: AgricolaServerPlayerResult[] = new Array<AgricolaServerPlayerResult>();

        for (let x: number = 0; x < playerArray.length; x++) {
            //bonusing off the fact that every property is named the same here
            let newServerPlayerResult: AgricolaServerPlayerResult = JSON.parse(JSON.stringify(playerArray[x]));
            //since we parsed a player into a server player, we have a bit of props to fix
            newServerPlayerResult.id = null;
            newServerPlayerResult.playerId = playerArray[x].id;

            //and insert into the Array
            serverArray.push(newServerPlayerResult);
        }
        console.log('firing off the request to the backend to save the game!');


        return this.http.post(this.agricolaUrl + '/save', JSON.stringify(serverArray), options)
            .map(this.extractStatus)
            .catch(this.handleError);
    }

    //TODO These should be pulled to a common class that all these services extend
    private extractStatus(res: Response) {
        //TODO: need to actually pull the status out of here
        return true;
    }
    private extractString(res: Response) {
        let body = res.text();
        return body || { };
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