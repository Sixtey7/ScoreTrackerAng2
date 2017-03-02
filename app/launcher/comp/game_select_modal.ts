import { Component } from '@angular/core';

import { Modal, GameList } from '../../shared/shared';

@Component({
    selector: 'prompt-game',
    template: `
        <div class="form-group">
            <input class="form-control" list="gameList" #response name="gameName">
            <datalist id="gameList">
                <option *ngFor = "let gameEnumItem of enumList">
                    {{ gameEnumItem }}
                </option>
            </datalist>
        </div>
        <div class="form-group">
            <button type="submit" (click)="handleResponse(response.value)" class="btn btn-primary custom-btn">Play!</button>
            <button type="submit" (click)="close()" class="btn btn-primary custom-btn">Cancel</button>
        </div>
    `,
    styles: ['.custom_btn {width: 49%; height: 40px; padding: 10px 12px; }'],
    directives: [Modal]
})
export default class PromptGameSelection {

    private enumList: string[];
    constructor(public _modal: Modal) {
        this.enumList = GameList.allStrings();
    }
    close() {
        this._modal.close();
    }

    handleResponse(_response: any) {
        console.log('got the response: ' +_response);
        this._modal.close(_response);
    }
}

