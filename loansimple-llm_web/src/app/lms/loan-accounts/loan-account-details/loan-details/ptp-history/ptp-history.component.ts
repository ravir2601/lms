import { FieldVisitDetailsComponent } from './field-visit-details/field-visit-details.component';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { LmsService } from '../../../../lms.service';

@Component({
    selector: 'kt-ptp-history',
    templateUrl: './ptp-history.component.html',
    styleUrls: ['./ptp-history.component.scss']
})
export class PtpHistoryComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private cd: ChangeDetectorRef,
        private updateBottomSheet: MatBottomSheet,
    ) { }

    public listData: any;

    ngOnInit() {
        this.getPTPData();
    }

    openFieldVisit(fieldVisitdata) {
        const modalFieldVisit = this.updateBottomSheet.open(FieldVisitDetailsComponent, {
            data: fieldVisitdata,
        });

        modalFieldVisit.afterDismissed().subscribe(res => {
            this.updateBottomSheet.open(PtpHistoryComponent, {
                data: this.userData,
            });
        });
    }

    getPTPData() {
        this.lmsService.getPTPHistory(this.userData.id).subscribe(res => {
            this.listData = res;
            this.cd.detectChanges();
        });
    }

    deletePTP(data) {
        if (confirm('Are you sure to delete ')) {
        this.lmsService.deletePTPData(this.userData.id, data.id);
        }
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }


}
