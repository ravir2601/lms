import { CommonService } from './../../../services/common.service';
import { DatePipe } from '@angular/common';
import { LmsService } from './../../lms.service';
import { Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kt-cash-credited',
    templateUrl: './cash-credited.component.html',
    styleUrls: ['./cash-credited.component.scss']
})
export class CashCreditedComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef<CashCreditedComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private datePipe: DatePipe,
        private commonService: CommonService
    ) { }

    repaymentData: any;
    amount: string;
    comment: string;
    date: any;

    ngOnInit() {
        this.repaymentData = this.userData;
        console.log("this.repaymentData...",  this.repaymentData);
    }

    save(status: string) {
        this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
        const obj = { status: status, total_actual: this.repaymentData.total_actual, settlement_date: this.repaymentData.settlement_date, comment: this.repaymentData.comment };
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
