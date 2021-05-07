import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LmsService } from '../../../../lms.service';

@Component({
    selector: 'kt-export-repayment',
    templateUrl: './export-repayment.component.html',
    styleUrls: ['./export-repayment.component.scss']
})
export class ExportRepaymentComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private datePipe: DatePipe,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
    ) { }

    public startDate: string;
    public endDate: string;
    public repaymentType: string;

    ngOnInit() {
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    submitRequest() {
        let startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
        let endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
        this.lmsService.openRepaymentExportList(startDate, endDate, this.repaymentType, this.userData.id);
        this.dismiss();
    }

}
