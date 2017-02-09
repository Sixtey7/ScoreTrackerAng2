import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { ServerGame, GameList } from '../../shared/shared';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class LauncherService {
    private launcherUrl = 'http://localhost:30000/standard';

    constructor(private http: Http) {}

    getAllGames(): Observable<ServerGame[]> {
        return this.http.get(this.launcherUrl + '/allGames')
            .map(this.extractJson)
            .catch(this.handleError);
    }

        beginGame(gameName: GameList): Observable<string> {
        console.log('beginning a new game of ' + gameName + '!');

        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set('gameName', gameName.toString());
        options.search = params;
        
        return this.http.put(this.launcherUrl + '/begin', null, options)
                        .map(this.extractString)
                        .catch(this.handleError);
    }

    private extractJson(res: Response) {
        let body = res.json();
        console.log('data from server in json: ' + body);
        return body || { };
    }

    private extractString(res: Response) {
        let body = res.text();
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