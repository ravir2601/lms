import { LmsService } from './../../../lms.service';
import { LMS_URLS } from './../../../../constants/static-urls';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'kt-repayment',
    templateUrl: './repayment.component.html',
    styleUrls: ['./repayment.component.scss']
})
export class RepaymentComponent implements OnInit {


    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private lmsService: LmsService,
        private bottomSheetRef: MatBottomSheetRef<RepaymentComponent>,
        private cd: ChangeDetectorRef
        ) { }
    private baseUrl: string;
    public listData: any;

    ngOnInit() {
        this.baseUrl = environment.api_host + LMS_URLS.loan_accounts + this.data.id + '/repayment_schedules/';
        this.loadListData();
    }

    loadListData() {
        const payloadUrl = this.baseUrl;
        this.lmsService.getLoanAccountDetails(payloadUrl).subscribe((res: any) => {
            this.listData = res;
            this.cd.detectChanges();
        });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}
