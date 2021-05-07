import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'kt-ls-select',
    templateUrl: './ls-select.component.html',
    styleUrls: ['./ls-select.component.scss']
})
export class LsSelectComponent implements OnInit {
    @Input() label: string;
    @Input() value: string;
    @Input() placeholder: string;
    @Input() options: {key: string, value: string};

    constructor() {
    }

    ngOnInit() {
    }

}
