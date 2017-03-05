import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';

import { ServerGame, ServerPlayer, Player } from '../../shared/shared';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StandardService {
    private standardUrl = 'http://localhost:30000/standard';

    constructor(private http: Http) {}

    sayHello(): Observable<String> {
        return this.http.get(this.standardUrl + '/hello')
                        .map(this.extractString)
                        .catch(this.handleError);
    }

    beginGame(gameName: string): Observable<string> {
        console.log('beginning a new game of ' + gameName + '!');

        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameName', gameName);
        options.search = params;
        
        return this.http.put(this.standardUrl + '/begin', null, options)
                        .map(this.extractString)
                        .catch(this.handleError);
    }

    getGame(gameId: string): Observable<ServerGame> {
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameId', gameId);
        options.search = params;

        return this.http.get(this.standardUrl + '/currentScores', options)
            .map(this.extractJson)
            .catch(this.handleError);

    }

    getPlayers(playerIds: string[]): Observable<ServerPlayer[]> {
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        for (let x: number = 0; x < playerIds.length; x++) {
            params.append('playerIds', playerIds[x])
        }
        options.search = params;

        return this.http.get(this.standardUrl + '/players', options)
            .map(this.extractJson)
            .catch(this.handleError);

    }

    addPlayer(gameId: string, playerName: string): Observable<ServerPlayer> {
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameId', gameId);
        params.set("playerName", playerName);
        options.search = params;

        return this.http.put(this.standardUrl + '/addPlayer',null, options)
                        .map(this.extractJson)
                        .catch(this.handleError);
    }

    updateScoreForPlayer(gameId: string, playerId: string, score: number) {
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameId', gameId);
        params.set("playerId", playerId);
        params.set("score", score + '');
        options.search = params;

        return this.http.post(this.standardUrl + '/setScore', null, options)
                        .map(this.extractStatus)
                        .catch(this.handleError);
    }

    saveGame(_gameId: string, _currentPlayers: Player[]) {
        let options: RequestOptions = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameId', _gameId);
        options.search = params;

        return this.http.post(this.standardUrl + '/save', JSON.stringify(_currentPlayers), options)
            .map(this.extractStatus)
            .catch(this.handleError);
    }

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