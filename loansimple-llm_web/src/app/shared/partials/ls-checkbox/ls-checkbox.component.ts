import { Checkbox } from './../../../core/_models/checkbox.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'kt-ls-checkbox',
    templateUrl: './ls-checkbox.component.html',
    styleUrls: ['./ls-checkbox.component.scss']
})
export class LsCheckboxComponent implements OnInit {
    @Input() label: string;
    @Input() value: string;
    @Input() placeholder: string;
    @Input() options: Checkbox[];
    @Output() checkedOption = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    check() {
        this.checkedOption.emit(this.options);
    }

}
