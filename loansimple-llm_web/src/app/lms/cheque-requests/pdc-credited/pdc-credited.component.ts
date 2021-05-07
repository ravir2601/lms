import { CommonService } from './../../../services/common.service';
import { DatePipe } from '@angular/common';
import { LmsService } from './../../lms.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'kt-pdc-credited',
    templateUrl: './pdc-credited.component.html',
    styleUrls: ['./pdc-credited.component.scss']
})
export class PdcCreditedComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef<PdcCreditedComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private datePipe: DatePipe,
        private commonService: CommonService
    ) { }

    amount: string;
    chequeNo: string;
    date: string;
    bounce_reason: string = null;
    comment: string = null;
    repaymentData: any;

    ngOnInit() {
        this.repaymentData = this.userData;

        this.amount = this.userData.loan_expected;
        this.chequeNo = this.userData.received_receipt_no;
    }

    save(status: string) {
        this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        const obj = { status: status, total_actual: this.amount, settlement_date: this.date, comment: this.comment, ref_no: this.repaymentData.id, bounce_reason: this.bounce_reason };
        this.lmsService.updateRepayment(this.repaymentData.update_url, obj).subscribe(res => {
            this.bottomSheetRef.dismiss('success');
        },
            err => {
                this.commonService.showError(err.error);
            }
        );
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}
