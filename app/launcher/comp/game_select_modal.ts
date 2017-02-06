import { Component } from '@angular/core';

import { Modal } from '../../shared/shared';

@Component({
    selector: 'prompt-game',
    template: `
        <div class="form-group">
            <input list="gameList" #response name="gameName">
            <datalist id="gameList">
                <option value="Agricola">
                <option value="Carcassonne">
                <option value="Lords of Waterdeep">
            </datalist>
        </div>
        <div class="form-group">
            <button type="submit" (click)="handleResponse(gameName.value)" class="btn btn-primary custom-btn">Play!</button>
            <button type="submit" (click)="close()" class="btn btn-primary custom-btn">Cancel</button>
        </div>
    `,
    styles: ['.custom_btn {width: 49%; height: 40px; padding: 10px 12px; }'],
    directives: [Modal]
})
export default class PromptGameSelection {

    constructor(public _modal: Modal) {
    }

    close() {
        this._modal.close();
    }

    handleRessponse(_response: string) {
        this._modal.close(_response);
    }
}

