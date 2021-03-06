import { Component, OnInit, OnChanges } from '@angular/core';

import { Modal, GameList, ServerGameDef, ServerGame } from '../../shared/shared';

import { GameDefService } from '../../gamedefs/gamedefs';

//used to make $ acceptable to typescript
declare var $:any;


@Component({
    selector: 'prompt-game',
    template: `
        <div class="form-group">
            <div class="panel panel-default">
                <div class="panel-heading">Date</div>
                <div class="panel-body">
                    <input data-provide="datepicker" class="form-control" id="modal_date_picker" 
                        value="{{(currDate.getMonth()+1) + '/' + currDate.getDate() + '/' + currDate.getFullYear()}}">
                </div>
            </div>
            <!--h3>Date:</h3><input type="date" class="datepicker" /-->
        </div>
        <div class="form-group">
            <div class="panel panel-default">
                <div class="panel-heading">Game</div>
                <div class="panel-body">
                    <div class="dropdown">
                        <button class="btn btn-default dropdown-toggle form-control" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            {{ currValue }}
                            <span class="caret" style="float: right;"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li *ngFor = "let thisOtherGameDef of allGameDefs" (click)="dropdownChange(thisOtherGameDef)">
                                {{ thisOtherGameDef.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="panel panel-default">
                <div class="panel-heading">Expansions</div>
                <div class="panel-body">
                    <div *ngIf = "currGameDef">
                        <div *ngFor="let thisExpansion of currGameDef.expansions">
                            <label class="checkbox"><input type="checkbox" [(ngModel)] = "currCheckboxes[thisExpansion._id]"><span>{{thisExpansion.name}}</span></label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-group">
            <button type="submit" (click)="handleResponse()" class="btn btn-primary custom-btn">Play!</button>
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
    private currCheckboxes: {[key: string]: boolean};
    private currGameDef: ServerGameDef;
    private currDate: Date;
    constructor(public _modal: Modal, private gameDefService: GameDefService) {
        this.allGameDefs = this.gameDefService.getAllGameDefs();

        this.currValue = "SELECT GAMe";
        this.currGameDef = null;
        this.currCheckboxes = {};
        this.currDate = new Date();
    }

    ngOnInit(): void {
        console.log('modal running ngoninit!');

        this.allGameDefs = this.gameDefService.getAllGameDefs();

        console.log('setting all game defs to:\n' + JSON.stringify(this.allGameDefs));
        
        //TODO: There has to be a better way than that = this here...
        let that = this;
        //setup the date picker
        $('#modal_date_picker').datepicker({
            todayBtn: true,
            todayHighlight: true,
            autoclose: true,
        })
        .on('changeDate', function(e) {
            that.currDate = e.date;
        });
    }

    close() {
        this._modal.close();
    }

    handleResponse() {
        let returnVal: ServerGame;

        console.log('curr date is: ' + this.currDate);

        returnVal = new ServerGame();
        returnVal.date = this.currDate;
        returnVal.gameDefId = this.currGameDef._id;
        returnVal.expansions = new Array<string>();
        if (this.currGameDef.expansions.length > 0) {
            for (let y: number = 0; y < this.currGameDef.expansions.length; y++) {
                if (this.currCheckboxes[this.currGameDef.expansions[y]._id]) {
                    returnVal.expansions.push(this.currGameDef.expansions[y]._id);
                }
            }
        }

        //find the matching game def to publish the id
        
        /*
        for (let x: number = 0; x < this.allGameDefs.length; x++) {
            if (this.allGameDefs[x].name === this.currGameDef.name) {
                returnVal = new ServerGame();
                returnVal.date = this.currDate;
                returnVal.gameDefId = this.allGameDefs[x]._id;
                returnVal.expansions = new Array<string>();
                if (this.allGameDefs[x].expansions.length > 0) {
                    for (let y: number = 0; y < this.allGameDefs[x].expansions.length; y++) {
                        console.log('Value for expansion: ' + this.allGameDefs[x].expansions[y].name + ' is: ' + this.currCheckboxes[this.allGameDefs[x].expansions[y]._id]);
                        if (this.currCheckboxes[this.allGameDefs[x].expansions[y]._id]) {
                            returnVal.expansions.push(this.allGameDefs[x].expansions[y]._id);
                        }
                    }
                }
                break;
            }
        }
        */

        this._modal.close(returnVal);
    }

    private dropdownChange(newGameDef: ServerGameDef) {
        this.currValue = newGameDef.name;
        this.currGameDef = newGameDef;
    }
}

