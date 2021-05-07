import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'kt-lead-summary',
    templateUrl: './lead-summary.component.html',
    styleUrls: ['./lead-summary.component.scss']
})
export class LeadSummaryComponent implements OnInit {
    @Input() leadSummary: any;

    constructor() { }

    ngOnInit() {
    }

}
