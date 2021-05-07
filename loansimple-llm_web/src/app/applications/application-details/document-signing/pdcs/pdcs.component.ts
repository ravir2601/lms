import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'kt-pdcs',
    templateUrl: './pdcs.component.html',
    styleUrls: ['./pdcs.component.scss']
})
export class PdcsComponent implements OnInit {
    @Input() verification = false;

    constructor() { }

    ngOnInit() {
    }

}
