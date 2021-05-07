import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LmsService } from '../../../../lms.service';

@Component({
  selector: 'kt-close-application',
  templateUrl: './close-application.component.html',
  styleUrls: ['./close-application.component.scss']
})
export class CloseApplicationComponent implements OnInit {

  closingDate: any;
  comment: string;
  ls_credit_point: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private datePipe: DatePipe,
    @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
    private lmsService: LmsService
  ) { }

  ngOnInit() {
    this.closingDate = this.userData.pos_surrender_date;
    this.ls_credit_point = this.userData.ls_credit_point;
    this.comment = this.userData.topup_over_comment;
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

  submitRequest() {
    const payload = {
      is_topup_over: true,
      ls_credit_point: this.ls_credit_point,
      topup_over_date: this.datePipe.transform(this.closingDate, 'yyyy-MM-dd'),
      topup_over_comment: this.comment
    };
    this.lmsService.updatePosSurrender(payload, this.userData.id).subscribe(res => {
      this.bottomSheetRef.dismiss('success');
    });

  }

}
