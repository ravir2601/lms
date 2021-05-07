import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'kt-empty',
    templateUrl: './empty.component.html',
    styleUrls: ['./empty.component.scss']
})
export class EmptyComponent implements OnInit {
    @Input() title: string;
    @Input() text: string;
    @Input() btnText: string;
    @Input() iconClass: string;
    constructor() { }

    ngOnInit() {
        if (!this.iconClass) {
            this.iconClass = 'flaticon-folder';
        }
    }

}
