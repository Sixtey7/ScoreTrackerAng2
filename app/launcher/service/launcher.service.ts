import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ServerGame } from '../../shared/shared';

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