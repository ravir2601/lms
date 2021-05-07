import { CommonService } from './../../../services/common.service';
import { DatePipe } from '@angular/common';
import { LmsService } from './../../lms.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'kt-neft-credited',
    templateUrl: './neft-credited.component.html',
    styleUrls: ['./neft-credited.component.scss']
})
export class NeftCreditedComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef<NeftCreditedComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private datePipe: DatePipe,
        private commonService: CommonService
    ) { }

    public amount: any;
    public date: any;
    public repaymentData: any;
    public comment: string = null;
    public neftData: any = {'total_actual': this.userData.total_expected}

    ngOnInit() {
        this.repaymentData = this.userData;
        console.log(this.userData);
    }

    save(status: string) {
        this.neftData.status = status;
        this.neftData.settlement_date = this.datePipe.transform(this.neftData.settlement_date, 'yyyy-MM-dd');
        const obj = { status: status, total_actual: this.repaymentData.total_actual, settlement_date: this.date, comment: this.comment };
        this.lmsService.updateRepayment(this.repaymentData.update_url, this.neftData).subscribe(res => {
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
