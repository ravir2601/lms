import {Component, Input} from '@angular/core';

@Component({
    selector: 'kt-ls-form',
    templateUrl: './ls-form.component.html',
    styleUrls: ['./ls-form.component.scss']
})
export class LsFormComponent {
    @Input() label: string;
    @Input() value: string;
    @Input() placeholder: string;

    constructor() {

    }

}
