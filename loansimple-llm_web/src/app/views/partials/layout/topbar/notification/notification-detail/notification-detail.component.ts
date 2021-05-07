import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LeadsService } from '../../../../../../leads/leads.service';
import { MatBottomSheet } from '@angular/material';
import { CommonService } from '../../../../../../services/common.service';
import { Reminder } from '../../../../../../core/_models/reminder.model';
import { Router } from '@angular/router';
import { ListOptions } from '../../../../../../core/_models/list-options.model';


@Component({
    selector: 'kt-notification-detail',
    templateUrl: './notification-detail.component.html',
    styleUrls: ['notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {
    reminderDetail: Reminder;
    error: any;
    options = new ListOptions();
    isFilterApplied = false;
    @Output() OpenScheduleCall = new EventEmitter();
    @Output() toggleNotification = new EventEmitter();

    @Input('data')
    set data(data: any) {
        this.reminderDetail = data;
    }

    /**
     * Component constructor
     *
     * @param sanitizer: DomSanitizer
     */
    constructor(
        private sanitizer: DomSanitizer,
        private bottomSheet: MatBottomSheet,
        private leadsService: LeadsService,
        private commonService: CommonService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        if (
            this.options.search || this.options.source__in || this.options.status__in ||
            this.options.product_type || this.options.city || this.options.address__region_id__in ||
            this.options.case_owner_id__in || this.options.territory_owner_id__in || this.options.quality_check_user__id__in) {
            this.isFilterApplied = true;
        }
    }

    onSubmit(form) {
        const formData = {
            remark: form.remark,
            is_completed: 'true'
        };
        this.leadsService.updateLeadReminder(formData, this.reminderDetail.update_url)
            .subscribe(response => {
                this.commonService.showToast('Reminder updated successfully', 'alert-success');
                this.router.routeReuseStrategy.shouldReuseRoute = () => false;
                this.router.onSameUrlNavigation = 'reload';
                if (this.isFilterApplied) {
                    this.navigateTo(this.options);
                } else {
                    this.navigateTo('');
                }
            }, error => {
                this.error = error.error;
            });
    }

    navigateTo(options) {
        const params = {};
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params[key] = value;
                }
            }
        );
        this.router.navigate([], {
            queryParams: params,
            queryParamsHandling: 'merge',
        });
    }

    dismiss() {
        this.toggleNotification.emit();
    }
}
