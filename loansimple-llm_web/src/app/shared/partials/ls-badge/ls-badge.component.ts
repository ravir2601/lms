import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Extra } from '../../../core/_models/extra.model';

@Component({
    selector: 'kt-ls-badge',
    templateUrl: './ls-badge.component.html',
    styleUrls: ['./ls-badge.component.scss']
})
export class LsBadgeComponent implements OnInit, OnChanges {
    @Input() extras: Extra[];
    @Input() extra: Extra;
    @Input() match = true;
    @Input() badge = true;
    @Input() placement = 'bottom';
    @Input() colorFlags = [75, 50];

    tooltip = '';
    class = '';
    source = '';

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges() {
        const values = [];
        if (this.extra) {
            this.extras = [this.extra];
        }
        if (this.extras) {
            this.extras.forEach(row => {
                if (row) {
                    values.push(this.class = this.buildClass(row.value));
                }
            });
        }
        this.class = this.parseClass(values);
    }

    buildClass(value) {
        if (value > this.colorFlags[0]) {
            return ' flaticon2-correct kt-font-success';
        } else if (value >= this.colorFlags[1] && value <= this.colorFlags[0]) {
            return ' flaticon2-exclamation kt-font-warning';
        } else {
            return ' flaticon-circle kt-font-danger';
        }
    }

    parseClass(list) {
        const counts = { success: 0, warning: 0, danger: 0 };
        const colors = Object.keys(counts);
        list.forEach(value => {
            colors.forEach(color => {
                if (value.indexOf(color) !== -1) {
                    counts[color]++;
                }
            });
        });
        return this.buildClass((counts.success / list.length) * 100);
    }

}
