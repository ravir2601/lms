import { CommonService } from './../../../../services/common.service';
import { AuthNoticeService } from './../../../../core/auth/auth-notice/auth-notice.service';
import { LmsService } from './../../../lms.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'kt-update-nach',
  templateUrl: './update-nach.component.html',
  styleUrls: ['./update-nach.component.scss']
})
export class UpdateNachComponent implements OnInit {

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private lmsService: LmsService, private commonService: CommonService,
    private bottomSheetRef: MatBottomSheetRef, private authNoticeService: AuthNoticeService) { }

    public comment: string;
    public error: any;
    public date: any;

  ngOnInit() {
    this.date = this.data.datalist.date;
  }

  save() {
    this.data.datalist.date = this.date.year+'-'+this.date.month +'-'+this.date.day;
    const url = this.data.datalist.update_url;
    this.lmsService.updateRepayment(url, this.data.datalist).subscribe((res) => {
    });
    this.dismiss();
  }
  delete() {
    let status = this.data.datalist.status;
    let date = this.data.datalist.date;
    this.data.datalist.date = this.data.datalist.date.year+'-'+this.data.datalist.date.month +'-'+this.data.datalist.date.day;
    const url = this.data.datalist.update_url;
    this.data.datalist.status = 'deleted';
    this.lmsService.updateRepayment(url, this.data.datalist).subscribe((res) => {
        this.commonService.showToast('Success', 'alert-success');
        this.bottomSheetRef.dismiss('success');
    },
    err => {
        this.data.datalist.status = status;
        this.data.datalist.date = date;
        err.error.date ? this.error = err.error.date[0] : this.error = err.error.comment[0]

        this.authNoticeService.setNotice(this.error, 'danger');
    });
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

}
