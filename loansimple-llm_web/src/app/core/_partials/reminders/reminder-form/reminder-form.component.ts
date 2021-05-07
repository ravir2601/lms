import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Reminder } from '../../../_models/reminder.model';
import { CommonService } from '../../../../services/common.service';
import { LeadsService } from '../../../../leads/leads.service';
import { ListOptions } from "../../../_models/list-options.model";

@Component({
    selector: 'kt-lead-reminder-form',
    templateUrl: './reminder-form.component.html',
    styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {
    sheetData: {
        rootUrl: string;
    };
    currentDate = new Date();
    error: any;
    data = new Reminder();
    hour = new Date().getHours() + 1;
    minute: any = new Date().getMinutes();
    options = new ListOptions();

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) sheetData,
        private bottomSheetRef: MatBottomSheetRef<ReminderFormComponent>,
        private commonService: CommonService,
        private formBottomSheet: MatBottomSheet,
        private leadsService: LeadsService,
    ) {
        this.sheetData = sheetData;
    }

    ngOnInit() {
    }


    getTimeAfter(time) {
        this.minute = this.minute + time;
        if (this.minute > 59) {
            this.minute = 0;
            this.hour = this.hour + 1;
        }
    }

    getTimeBefore(time) {
        this.minute = this.minute - time;
        if (this.minute <= -1) {
            this.minute = 59;
            this.hour = this.hour - 1;
        }
    }

    onSubmit() {
        const date = this.commonService.parseDate(this.currentDate);
        this.data.scheduled_at = date + 'T' + this.hour + ':' + this.minute + ':00';
        this.leadsService.addReminder(this.sheetData.rootUrl, this.data)
            .subscribe(response => {
                this.commonService.showToast('Reminder has been added successfully', 'alert-success');
                this.bottomSheetRef.dismiss();
            }, error => {
                this.error = error.error;
                    this.commonService.showError(this.error.message);
            });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}

