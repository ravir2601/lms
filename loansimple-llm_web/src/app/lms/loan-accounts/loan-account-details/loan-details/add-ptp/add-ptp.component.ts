import { CommonService } from './../../../../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LmsService } from '../../../../lms.service'

@Component({
    selector: 'kt-add-ptp',
    templateUrl: './add-ptp.component.html',
    styleUrls: ['./add-ptp.component.scss']
})
export class AddPtpComponent implements OnInit {

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private datePipe: DatePipe,
        @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
        private lmsService: LmsService,
        private commonService: CommonService,
    ) { }

    public max = 0;
    public step = 1;
    public selectedDpdValue = 0;
    public amount = 0;
    public pendingPDCS: any;
    public lmsConstant: any;
    public rpcConstant;
    public ptpData: any = {};

    ngOnInit() {
        this.lmsConstant = this.lmsService.lmsConstants;
        this.rpcConstant = this.lmsService.rpcConstants;
        this.max = this.userData.extra.current_dpds;
        this.pendingPdc();
        this.rpcConstants();
    }

    rpcConstants() {
        this.lmsService.getRpcConstants(this.userData.id).subscribe((res: any)  => {
            this.rpcConstant = res.data;
            console.log('this.rpcConstant...', this.rpcConstant);
        });
    }

    changeDpdAmount(event) {
        this.selectedDpdValue = event.value;
        this.ptpData.amount = Math.round(this.selectedDpdValue * this.userData.extra.current_daily_repayment);
    }

    pendingPdc() {
        this.lmsService.getPendingPdcs(this.userData.id).subscribe(res => {
            this.pendingPDCS = res['business'];
        });
    }

    submitRequest() {
        this.ptpData.date = this.datePipe.transform(this.ptpData.date, 'yyyy-MM-dd');
        this.pendingPDCS.active_pdcs.forEach(value => {
                if (value.is_selected) {
                    this.ptpData.pdc = value.id;
                    this.ptpData.amount = value.amount;
                }
            });
        this.lmsService.addPTP(this.ptpData, this.userData.id).subscribe(res => {
            this.bottomSheetRef.dismiss('success');
        },
        err => {
            this.commonService.showError(err.error);
      });
    }

    openAttachment(fileUrl) {
        const attachmentUrl = fileUrl.replace('devlsdocument', 'lssv2document');
        window.open(attachmentUrl, '_blank');
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}
