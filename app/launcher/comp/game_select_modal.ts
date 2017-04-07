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
                <div *ngFor="let thisExpansion of currGameDef.expansions">
                    <label class="checkbox"><input type="checkbox" [(ngModel)] = "currCheckboxes[thisExpansion._id]"><span>{{thisExpansion.name}}</span></label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <button type="submit" (click)="handleResponse(response.value)" class="btn btn-primary custom-btn">Play!</button>
            <button type="submit" (click)="close()" class="btn btn-primary custom-btn">Cancel</button>
        </div>
    `,
    styles: ['.custom_btn {width: 49%; height: 40px; padding: 10px 12px; }', 'input[type=checkbox] + span { color: #ccc; font-style: italic; }',
                'input[type=checkbox]:checked + span { color: #00f; font-style: normal; font-weight: bold;}'],
    providers: [],
    directives: [Modal]
})
export default class PromptGameSelection implements OnInit {

    private allGameDefs: ServerGameDef[];
    private currValue: string;
    private currCheckboxes: string[];
    private currGameDef: ServerGameDef;
    constructor(public _modal: Modal, private gameDefService: GameDefService) {
        this.allGameDefs = this.gameDefService.getAllGameDefs();

        this.currValue = "";
        this.currGameDef = this.allGameDefs[1];
        this.currCheckboxes = new Array<string>();

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
                if (this.allGameDefs[x].expansions.length > 0) {
                    for (let y: number = 0; y < this.allGameDefs[x].expansions.length; y++) {
                        console.log('Value for expansion: ' + this.allGameDefs[x].expansions[y].name + ' is: ' + this.currCheckboxes[this.allGameDefs[x].expansions[y]._id]);
                    }
                }
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

