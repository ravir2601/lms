import { LmsService } from './../../../lms.service';
import { LMS_URLS } from './../../../../constants/static-urls';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';
import { FieldVisitComponent } from './field-visit-details/field-visit-details.component';

@Component({
    selector: 'kt-comment-thread',
    templateUrl: './field-visit-history.component.html',
    styleUrls: ['./field-visit-history.component.scss']
})
export class FieldVisitHistoryComponent implements OnInit {

    constructor(private bottomSheetRef: MatBottomSheetRef<FieldVisitHistoryComponent>,
                @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
                private lmsService: LmsService,
                private updateBottomSheet: MatBottomSheet,
                private cd: ChangeDetectorRef
        ) { }

    private baseUrl: string;
    public listData: any;

    ngOnInit() {
        this.baseUrl = environment.api_host + LMS_URLS.loan_accounts + this.data.id + '/field_visits/';
        this.loadListData();
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
    fieldVisitDetail(data) {
        this.updateBottomSheet.open(FieldVisitComponent, { data });
    }
    loadListData(): void {
        const payloadUrl = this.baseUrl;
        this.lmsService.getFieldVisitDetails(payloadUrl).subscribe((res: any) => {
            this.listData = res;
            this.cd.detectChanges();
        });
    }
}
