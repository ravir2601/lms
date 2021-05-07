import {Component, Inject, OnInit} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef } from "@angular/material";
import { CommonService } from "../../../services/common.service";
import { LeadsService } from "../../../leads/leads.service";
import { Log } from "../../_models/log.model";
import { ListOptions } from "../../_models/list-options.model";

@Component({
    selector: 'kt-lead-log-form',
    templateUrl: './log-form.component.html',
    styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {
    data = new Log();
    error: any;
    options = new ListOptions();
    sheetData: {
        rootUrl: string;
    };

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) sheetData,
        private bottomSheetRef: MatBottomSheetRef,
        private commonService: CommonService,
        private formBottomSheet: MatBottomSheet,
        private leadsService: LeadsService,
    ) {
        this.sheetData = sheetData;
    }

    ngOnInit() {
        this.data.type = 'call_log';
    }

    onSubmit() {
        this.leadsService.addLog(this.sheetData.rootUrl, this.data)
            .subscribe(response => {
                this.commonService.showToast('Log has been created successfully', 'alert-success');
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
