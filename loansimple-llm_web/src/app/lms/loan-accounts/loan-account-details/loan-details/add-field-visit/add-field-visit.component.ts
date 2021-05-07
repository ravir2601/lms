import { DatePipe } from '@angular/common';
import { CommonService } from './../../../../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { LmsService } from '../../../../lms.service';

@Component({
    selector: 'kt-add-field-visit',
    templateUrl: './add-field-visit.component.html',
    styleUrls: ['./add-field-visit.component.scss']
})
export class AddFieldVisitComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private datePipe: DatePipe,
        private commonService: CommonService
    ) { }

    public fieldVisitDetail: any = { type: 'seven_plus_dpds' };
    public lmsConstant: any;

    ngOnInit() {
        this.lmsConstant = this.lmsService.lmsConstants;
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    submitRequest() {
        this.fieldVisitDetail.date = this.datePipe.transform(this.fieldVisitDetail.date, 'yyyy-MM-dd'),

            this.lmsService.addFieldVisit(this.fieldVisitDetail, this.userData.id).subscribe(res => {
                this.bottomSheetRef.dismiss('success');
            },
                err => {
                    this.commonService.showError(err.error);
                }
            );
    }

}
