import { Component } from '@angular/core';

import Modal  from './modal.component';

@Component({
    selector: 'prompt_username',
        template: `
        <div class="form-group">
            <input class="form-control" #response type="text" autofocus placeholder="Name">
        </div>
        <div class="form-group">
            <button type="submit" (click)="handleResponse(response.value)" class="btn btn-primary custom-btn">Play!</button>
            <button type="submit" (click)="close()" class="btn btn-primary custom-btn">Cancel</button>
        </div>
    `,
    styles: ['.custom_btn {width: 49%; height: 40px; padding: 10px 12px; }'],
    directives: [Modal]
})
export default class PromptUsername {
    modal: Modal;

    constructor(public _modal: Modal) {
        this.modal = _modal;
    }

    close() {
        this.modal.close();
    }

    handleResponse(_response: string) {
        //TODO: probably don't need this extra variable here
        let data = _response;
        this.modal.close(data);
    }
}