import { Component, OnInit } from '@angular/core';

import { Modal, GameList, ServerGameDef } from '../../shared/shared';

import { GameDefService } from '../../gamedefs/gamedefs';

@Component({
    selector: 'prompt-game',
    template: `
        <div class="form-group">
            <input class="form-control" list="gameList" #response name="gameName">
            <datalist id="gameList">
                <option *ngFor = "let thisGameDef of allGameDefs">
                    {{ thisGameDef.name }}
                </option>
            </datalist>
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
    constructor(public _modal: Modal, private gameDefService: GameDefService) {
        //this.enumList = GameList.allStrings();
        this.allGameDefs = this.gameDefService.getAllGameDefs();
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
        this._modal.close(_response);
    }
}

