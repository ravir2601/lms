import { GetConstantPipe } from './../../../../../shared/pipes/get-constant.pipe';
import { CommonService } from './../../../../../services/common.service';
import { LmsService } from './../../../../lms.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';


@Component({
    selector: 'kt-neft-request',
    templateUrl: './neft-request.component.html',
    styleUrls: ['./neft-request.component.scss']
})
export class NeftRequestComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private datePipe: DatePipe,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private commonService: CommonService,
        private getConstant: GetConstantPipe
    ) { }

    public amount: any;
    public utrNo: string;
    public comment: string;
    public date: string;

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
    ngOnInit() {

    }

    submitRequest() {
        const payload = {
            payment_mode: 'manual_neft',
            total_expected: this.userData.extra.total_expected,
            amount: this.amount,
            received_receipt_no: this.utrNo,
            date: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
            comment: this.comment
        };
        this.lmsService.addNeftRequest(payload, this.userData.id).subscribe(res => {
            this.bottomSheetRef.dismiss('success');
        },
            err => {
                this.commonService.showError(err.error);
            }
        );
    }

}
