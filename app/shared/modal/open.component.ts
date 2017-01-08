import {
    Directive,
    Input,
    HostBinding
} from '@angular/core';

@Directive({
    selector: '[open]'
})
export class Open {
    @HostBinding('style.display')
    private display: string;

    @HostBinding('class.in')
    @HostBinding('attr.aria-expanded')
    private isExpanded: boolean = true;

    @Input()
    private set open(value: boolean) {
        console.log('setting open!');
        this.isExpanded = value;
        this.toggle();
    }

    private get open(): boolean {
        return this.isExpanded;
    }

    constructor() {

    }

    toggle() { 
        if (this.isExpanded) { 
            this.hide();
        }
        else {
            this.show();
        }
    }

    hide() {
        console.log('hiding within open component!');
        this.isExpanded = false;
        this.display = 'none';

        let backdrop = document.getElementsByClassName("modal-backdrop");
        if (backdrop.length > 0) {
            document.body.removeChild(backdrop[0]);
        }
    }

    show() {
        console.log('showing within open component!');
        let backDrop = document.createElement('div');
        backDrop.className="modal-backdrop fade in";
        document.body.appendChild(backDrop);
        this.isExpanded = true;
        this.display = 'block';
    }
}