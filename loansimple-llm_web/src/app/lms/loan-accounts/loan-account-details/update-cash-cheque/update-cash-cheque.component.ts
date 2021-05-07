import { CommonService } from './../../../../services/common.service';
import { LmsService } from './../../../lms.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';
import { NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kt-update-cash-cheque',
    templateUrl: './update-cash-cheque.component.html',
    styleUrls: ['./update-cash-cheque.component.scss'],
    providers: [NgbTimepickerConfig]
})
export class UpdateCashChequeComponent implements OnInit {

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public cashCheckData: any, private lmsService: LmsService,
        private commonService: CommonService, private bottomSheetRef: MatBottomSheetRef, config: NgbTimepickerConfig) {
        config.seconds = true;
        config.spinners = false;
    }

    time: NgbTimeStruct = { hour: 13, minute: 30, second: 0 };
    hourStep = 1;
    minuteStep = 15;
    secondStep = 30;

    public date: any;
    public amount: string;
    public pickedUpDate: any;
    public dateChange: any;
    public comment: string;
    public pickedUpAmount: string;
    public pdcs: any;

    ngOnInit() {
        this.loadListData();
        this.pickedUpDate = this.cashCheckData.picked_up_at;
        this.comment = this.cashCheckData.comment;
    }

    loadListData(): void {
        this.lmsService.getPendingPdcsData(this.cashCheckData.loan_account).subscribe((res: any) => {
            this.pdcs = res.data;
        });
    }
    openAttachment(url) {
        const attachmentUrl = url.replace('devlsdocument', 'lssv2document');
        window.open(attachmentUrl, '_blank');
    }

    changeTime() {
        this.dateChange = this.pickedUpDate.year + '-' + this.pickedUpDate.month + '-' + this.pickedUpDate.day + ' '
            + this.hourStep + ':' + this.minuteStep + ':' + this.secondStep
    }

    delete() {
        this.cashCheckData.date = this.cashCheckData.date.year + '-' + this.cashCheckData.date.month + '-' + this.cashCheckData.date.day;
        this.cashCheckData.status = 'deleted';
        this.cashCheckData.comment = this.comment;
        const url = this.cashCheckData.update_url;

        this.lmsService.updateRepayment(url, this.cashCheckData).subscribe((res) => {
            this.cashCheckData = this.cashCheckData;
            this.commonService.showToast('Success', 'alert-success');
            this.bottomSheetRef.dismiss('success');
        },
            err => {
                this.commonService.showToast('Failed', 'alert-danger');
            });
    }
    save() {
        let objData = {
            comment: this.comment, date: this.cashCheckData.date.year + '-' + this.cashCheckData.date.month + '-' + this.cashCheckData.date.day,
            payment_mode: this.cashCheckData.expected_payment_mode, picked_up_amount: this.cashCheckData.picked_up_amount,
            picked_up_at: this.dateChange,
            total_expected: this.cashCheckData.total_expected, update_url: this.cashCheckData.update_url
        };
        const url = this.cashCheckData.update_url;
        this.lmsService.updateCashCheque(url, objData).subscribe((res) => {
            this.commonService.showToast('Success', 'alert-success');
            this.bottomSheetRef.dismiss('success');
        },
            err => {
                this.commonService.showToast('Failed', 'danger');
                this.bottomSheetRef.dismiss();
            })

    }
    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}
