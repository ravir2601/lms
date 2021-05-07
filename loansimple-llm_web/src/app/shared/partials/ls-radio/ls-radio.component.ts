import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'kt-ls-radio',
    templateUrl: './ls-radio.component.html',
    styleUrls: ['./ls-radio.component.scss']
})
export class LsRadioComponent implements OnInit {
    @Input() label: string;
    @Input() value: string;
    @Input() placeholder: string;
    @Input() options: { key: string, value: string };

    constructor() {
    }

    ngOnInit() {
    }

}
