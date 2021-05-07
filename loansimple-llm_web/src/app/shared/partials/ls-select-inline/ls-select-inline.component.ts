import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'kt-ls-select-inline',
    templateUrl: './ls-select-inline.component.html',
    styleUrls: ['./ls-select-inline.component.scss']
})
export class LsSelectInlineComponent implements OnInit {
    @Input() label: string;
    @Input() value: string;
    @Input() placeholder: string;
    @Input() options: { key: string, value: string };

    constructor() {
    }

    ngOnInit() {
    }

}
