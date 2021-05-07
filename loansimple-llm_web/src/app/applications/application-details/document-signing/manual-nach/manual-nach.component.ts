import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'kt-manual-nach',
    templateUrl: './manual-nach.component.html',
    styleUrls: ['./manual-nach.component.scss']
})
export class ManualNachComponent implements OnInit {
    @Input() verification = false;
    constructor() { }

    ngOnInit() {
    }

}
