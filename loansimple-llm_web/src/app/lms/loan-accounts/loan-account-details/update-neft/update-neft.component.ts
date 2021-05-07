import { CommonService } from './../../../../services/common.service';
import { LmsService } from './../../../lms.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'kt-update-neft',
    templateUrl: './update-neft.component.html',
    styleUrls: ['./update-neft.component.scss']
})
export class UpdateNeftComponent implements OnInit {

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private lmsService: LmsService, private commonService: CommonService,
        private bottomSheetRef: MatBottomSheetRef<UpdateNeftComponent>) { }

    public comment: string;

    ngOnInit() {
    }

    save() {
        this.data.datalist.date = this.data.datalist.date.year + '-' + this.data.datalist.date.month + '-' + this.data.datalist.date.day;
        const url = this.data.datalist.update_url;
        this.lmsService.updateRepayment(url, this.data.datalist).subscribe((res) => {
        });
        this.dismiss();
    }

    delete() {
        this.data.datalist.date = this.data.datalist.date.year + '-' + this.data.datalist.date.month + '-' + this.data.datalist.date.day;
        this.data.datalist.status = 'deleted';
        const url = this.data.datalist.update_url;
        this.lmsService.updateRepayment(url, this.data.datalist).subscribe((res) => {
            this.commonService.showToast('Success', 'alert-success');
            this.bottomSheetRef.dismiss('success');
        },
            err => {
                this.commonService.showToast('Failed', 'alert-danger');
            });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}
