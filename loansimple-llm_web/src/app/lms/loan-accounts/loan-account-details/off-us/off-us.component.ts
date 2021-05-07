import { LmsService } from './../../../lms.service';
import { LMS_URLS } from './../../../../constants/static-urls';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'kt-off-us',
    templateUrl: './off-us.component.html',
    styleUrls: ['./off-us.component.scss']
})
export class OffUsComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef<OffUsComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private lmsService: LmsService,
        private cd: ChangeDetectorRef

    ) { }
    private baseUrl: string;
    public listData: any;

    ngOnInit() {
        this.baseUrl = environment.api_host + LMS_URLS.loan_accounts + this.data.id + '/account_off_us/';
        this.loadListData();
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    loadListData(): void {
        const payloadUrl = this.baseUrl;
        this.lmsService.getLoanAccountDetails(payloadUrl).subscribe((res: any) => {
            this.listData = res;
            this.cd.detectChanges();
        });
    }

}
