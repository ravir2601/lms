import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'kt-ls-form-inline',
    templateUrl: './ls-form-inline.component.html',
    styleUrls: ['./ls-form-inline.component.scss']
})
export class LsFormInlineComponent implements OnInit {
    @Input() label: string;
    @Input() value: string;
    @Input() placeholder = '';

    constructor() {
    }

    ngOnInit() {
    }

}
