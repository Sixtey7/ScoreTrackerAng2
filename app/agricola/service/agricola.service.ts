import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgricolaService {
    private agricolaUrl = 'http://localhost:8080/scoretracker/agricola';

    constructor(private http: Http) {}

    sayHello(): Observable<String> {
        return this.http.get(this.agricolaUrl + '/hello')
                        .map(this.extractString)
                        .catch(this.handleError);
    }

    beginGame(): Observable<boolean> {
        console.log('beginning a new game!');
        return this.http.put(this.agricolaUrl + '/begin', null)
                        .map(this.extractStatus)
                        .catch(this.handleError);
    }

    addPlayer(playerName: string): Observable<boolean> {
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json'})});

        let params: URLSearchParams = new URLSearchParams();
        params.set("player", playerName);
        options.search = params;

        return this.http.put(this.agricolaUrl + '/addPlayer',null, options)
                        .map(this.extractJson)
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
        return body.data || { };
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