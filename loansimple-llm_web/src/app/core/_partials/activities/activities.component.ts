import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { CoreService } from '../../core.service';
import { ConstantService } from '../../../services/constant.service';
import { Constant } from '../../_models/constant.model';
import { Activity } from '../../_models/activity.model';
import { BeautifyStringPipe } from '../../../shared/pipes/beautify-string.pipe';
import { OPTIONS } from './activity-options';

@Component({
    selector: 'kt-lead-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
    @Input() businessUrl;
    activityTypes: Constant[];
    activities = [];
    beautifyPipe = new BeautifyStringPipe();
    options = OPTIONS;
    nextUrl: string;
    type = '';
    objectKeys = Object.keys;

    constructor(
        private commonService: CommonService,
        private constantService: ConstantService,
        private coreService: CoreService
    ) {
        this.getActivityTypes();
    }

    ngOnInit() {
        this.getData(this.businessUrl);
    }

    getData(url) {
        this.coreService.getBusinessActivities(url, this.type).subscribe(res => {
            this.nextUrl = res.next;
            res.results.forEach((row: Activity) => {
                const date = this.commonService.parseDate(row.created_at);
                if (!this.activities[date]) {
                    this.activities[date] = [];
                }
                this.activities[date].push(this.buildActivity(row));
            });
        });
    }

    buildActivity(row: Activity) {
        row.class = this.getActivityClass(row.type);
        row.text = this.constantService.getName(row.type) + ' ' + this.getActivityString(row);
        return row;
    }

    getActivityClass(type) {
        if (type.indexOf('added') !== -1) {
            return 'kt-font-primary';
        } else if (type.indexOf('changed') !== -1) {
            return 'kt-font-warning';
        } else if (type.indexOf('deleted') !== -1) {
            return 'kt-font-danger';
        }
    }

    getActivityString(row: Activity) {
        const pieces: {
            from: string,
            to: string,
            val: string
        }[] = [];
        Object.entries(row.data).forEach(([key, value]) => {
            if (row.type.indexOf('changed') !== -1) {
                if (key.indexOf('updated_at') === -1) {
                    const temp = key.replace('from_', '').replace('to_', '');
                    if (!pieces[temp]) {
                        pieces[temp] = {};
                    }
                    if (key.indexOf('from_') === 0) {
                        pieces[temp].from = value;
                    } else if (key.indexOf('to_') === 0) {
                        pieces[temp].to = value;
                    }
                }
            } else {
                if (this.options[row.type] && this.options[row.type].indexOf(key) !== -1) {
                    if (!pieces[key]) {
                        pieces[key] = {};
                    }
                    pieces[key].val = value;
                }
            }
        });
        const str = [];
        Object.keys(pieces).forEach(key => {
            if (pieces[key].from || pieces[key].to) {
                const from = (key === 'file') ?
                    '<a href="' + pieces[key].from + '" target="_blank"><i class="la la-file"></i></a>' :
                    this.constantService.getNameRaw(pieces[key].from);
                const to = (key === 'file') ?
                    '<a href="' + pieces[key].to + '" target="_blank"><i class="la la-file"></i></a>' :
                    this.constantService.getNameRaw(pieces[key].to);
                str.push(
                    '<span class="kt-font-brand">' + this.constantService.getName(key) +
                    '</span> from <em>' + from +
                    '</em> to <em>' + to + '</em> '
                );
            } else if (pieces[key].val) {
                const val = (key === 'file') ?
                    '<a href="' + pieces[key].val + '" target="_blank"><i class="la la-file"></i></a>' :
                    this.constantService.getNameRaw(pieces[key].val);
                str.push(
                    '<span class="kt-font-brand">' + this.constantService.getName(key) +
                    '</span> - <em>' + val + '</em>'
                );
            }
        });
        return str.join(', ') + ' by ' + '<span class="kt-font-info">' + row.user.full_name + '</span>';
    }

    getActivityTypes() {
        const key = 'activity_types';
        this.constantService.constants_subject.subscribe(res => {
            this.activityTypes = res[key];
        });
    }

    getActivitiesLength() {
        return Object.keys(this.activities);
    }

    activityOrder() {
        return 0;
    }

    filter() {
        this.activities = [];
        this.getData(this.businessUrl);
    }

}
