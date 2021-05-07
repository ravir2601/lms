import { environment } from './../../../../../../environments/environment';
import { LMS_URLS } from './../../../../../constants/static-urls';
import { LmsService } from './../../../../lms.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'kt-previous-collection',
    templateUrl: './previous-collection.component.html',
    styleUrls: ['./previous-collection.component.scss']
})
export class PreviousCollectionComponent implements OnInit {

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private lmsService: LmsService,
        private bottomSheetRef: MatBottomSheetRef<PreviousCollectionComponent>,
        private cd: ChangeDetectorRef
    ) { }
    private baseUrl: string;
    public listData: any;

    ngOnInit() {
        this.baseUrl = environment.api_host + LMS_URLS.loan_accounts + this.data.id + '/repayments/?repayment_type=collection';
        this.loadListData();
    }

    loadListData(): void {
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
