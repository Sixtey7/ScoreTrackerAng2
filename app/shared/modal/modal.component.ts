//import 'reflect-metadata';
import {
    Component,
    ComponentResolver,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    ComponentRef,
    DynamicComponentLoader,
    ElementRef,
    Input,
    EventEmitter,
    Output
} from '@angular/core';
import { Open } from './open.component';

@Component({
    selector: 'modal',
    templateUrl: 'app/shared/modal/modal.component.html',
    providers: [],
    directives: [Open],
    encapsulation: ViewEncapsulation.None,
    pipes: []
})
/**
 * API to open a modal window
 * Heavily based on https://github.com/tixdo/ng2-modal
 */
export default class Modal {
    public modalTitle: string;

    public component: any;

    public okButton: boolean = true;

    public okButtonText:string = 'Ok';

    public cancelButton: boolean = true;

    public cancelButtonText: string = 'Cancel';

    public modalMessage: boolean = true;

    public message: string;

    public modalFooter: boolean = true;

    public modalHeader: boolean = true;

    public isOpen: boolean = false;

    cmpRef:ComponentRef<any>;

    @ViewChild("child", { read: ViewContainerRef}) target;
    @Output() public modalOutput:EventEmitter<any> = new EventEmitter();
    constructor(public compiler: ComponentResolver, public viewContainer: ViewContainerRef) {

    }

    /**
     * Opens a modal window creating backdrop
     * @param component The angular component that is to be loaded dynamically(optional).
     */
    open(component?) {
        console.log('Opening with a component!');
        this.isOpen = true;
        if (this.cmpRef) {
            console.log('destroying the cmpRef');
            this.cmpRef.destroy();
        }

        if (component) {
            console.log('Inside Open - About to Promise' + component);
            this.compiler.resolveComponent(component).then((factory) => { console.log('executing!');
            this.cmpRef = this.target.createComponent(factory)}); 
        }
    }

    /**
     * close method dispose the component, closes the modal and optionally emits modalOutput value
     */
    close(data?: any) {
        this.dispose();
        if (data) {
            this.modalOutput.emit(data);
        }
    }

    /**
     * ok method dispose the component, closes the modal and emits true
     */
    submit() {
        this.dispose();
        this.modalOutput.emit(true);
    }

    dispose() {
        this.isOpen = false;
        console.log('Inside Dispose - About to Promise');
        if (this.component != undefined) {
            this.component.then((componentRef: ComponentRef<any>) => {
                componentRef.destroy();
                return componentRef;
            });
        }
    }
}