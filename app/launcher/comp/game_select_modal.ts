import { Component, OnInit, OnChanges } from '@angular/core';

import { Modal, GameList, ServerGameDef } from '../../shared/shared';

import { GameDefService } from '../../gamedefs/gamedefs';

@Component({
    selector: 'prompt-game',
    template: `
        <div class="form-group">
            <input [ngModel] = "currValue" class="form-control" list="gameList" #response name="gameName" (ngModelChange)="onChange($event)">
            <datalist id="gameList" (change)="onChange()">
                <option *ngFor = "let thisGameDef of allGameDefs" (change)="onChange()">
                    {{ thisGameDef.name }}
                </option>
            </datalist>
        </div>
        <div class="form-group">
            <div *ngIf = "currGameDef">
                <p *ngFor = "let thisExpansion of currGameDef.expansions">
                    {{ thisExpansion.name }}
                </p>
            </div>
        </div>
        <div class="form-group">
            <button type="submit" (click)="handleResponse(response.value)" class="btn btn-primary custom-btn">Play!</button>
            <button type="submit" (click)="close()" class="btn btn-primary custom-btn">Cancel</button>
        </div>
    `,
    styles: ['.custom_btn {width: 49%; height: 40px; padding: 10px 12px; }'],
    providers: [],
    directives: [Modal]
})
export default class PromptGameSelection implements OnInit {

    private allGameDefs: ServerGameDef[];
    private currValue: string;
    private currGameDef: ServerGameDef;
    constructor(public _modal: Modal, private gameDefService: GameDefService) {
        this.allGameDefs = this.gameDefService.getAllGameDefs();

        this.currValue = "";
        this.currGameDef = null;

    }

    ngOnInit(): void {
        console.log('modal running ngoninit!');

        this.allGameDefs = this.gameDefService.getAllGameDefs();

        console.log('setting all game defs to:\n' + JSON.stringify(this.allGameDefs));
    }


    close() {
        this._modal.close();
    }

    handleResponse(_response: any) {
        console.log('got the response: ' +_response);

        let returnVal: string = '-1';
        //find the matching game def to publish the id
        for (let x: number = 0; x < this.allGameDefs.length; x++) {
            if (this.allGameDefs[x].name === _response) {
                returnVal = this.allGameDefs[x]._id;
                break;
            }
        }

        this._modal.close(returnVal);
    }

    private onChange(newValue) {
        console.log("ON ChANGE");
        let upperCaseNewValue = newValue.toUpperCase();
        //TODO: Some easy caching here could make this faster
        for (let x: number = 0; x < this.allGameDefs.length; x++) {
            if (this.allGameDefs[x].name === upperCaseNewValue) {
                //TODO: need to now handle this value
                console.log("FOUND A MATCH: " + upperCaseNewValue);
                this.currGameDef = this.allGameDefs[x];
                break;
            }
        }
    }
}

