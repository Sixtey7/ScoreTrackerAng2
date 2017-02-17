import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { StandardService } from '../../standard/standard';

@Injectable()
export class AgricolaService {
    private agricolaService = 'http://localhost:30000/agricola';

    constructor(private http: Http) {}

}