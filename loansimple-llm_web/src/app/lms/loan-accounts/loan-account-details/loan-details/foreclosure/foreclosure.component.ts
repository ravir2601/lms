import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import { LmsService } from '../../../../lms.service';
import { CommonService } from '../../../../../services/common.service';

@Component({
  selector: 'kt-foreclosure',
  templateUrl: './foreclosure.component.html',
  styleUrls: ['./foreclosure.component.scss']
})
export class ForeclosureComponent implements OnInit {

  loan_foreclosure: any;
  principal_collection = 0;
  interest_collection = 0;
  foreclosure_fees: any;
  payment_mode: any;
  date: any;
  is_foreclosure = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private datePipe: DatePipe,
    private commonService: CommonService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
    public lmsService: LmsService
  ) { }

  ngOnInit() {
    console.log(this.userData.topupInfo);
    this.getForeclosureRepayment();
    this.getPendingPdcs();
    this.loan_foreclosure = this.userData.topupInfo.extra;
  }

  getForeclosureRepayment() {
    this.lmsService.getForeclosureRepayment(this.userData.topupInfo.id).subscribe((res: any) => {
      console.log(res.foreclosure);

      if (res.foreclosure) {
        this.is_foreclosure = true;
        this.loan_foreclosure.loan_outstanding = res.foreclosure && res.foreclosure.loan_outstanding !== undefined
                                                ? res.foreclosure.loan_outstanding
                                                : this.loan_foreclosure.loan_outstanding;
        this.loan_foreclosure.principal_outstanding = res.foreclosure.principal_outstanding;
        this.loan_foreclosure.interest_outstanding = res.foreclosure.interest_outstanding;
        this.principal_collection = res.foreclosure.principal_collection;
        this.interest_collection = res.foreclosure.interest_collection;
        this.foreclosure_fees = res.foreclosure.foreclosure_fee;
        this.payment_mode = res.foreclosure.payment_mode;
        this.date = res.foreclosure.date;
      }
    });
  }

  getPendingPdcs() {
    this.lmsService.getPendingPdcs(this.userData.topupInfo.id).subscribe(res => {
    });
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

  submitRequest() {
    const payload = {
      principal_outstanding: this.loan_foreclosure.principal_outstanding,
      interest_outstanding: this.loan_foreclosure.interest_outstanding,
      principal_collection: this.principal_collection,
      interest_collection: this.interest_collection,
      foreclosure_fee: this.foreclosure_fees,
      payment_mode: this.payment_mode,
      date: this.date ? this.datePipe.transform(this.date, 'yyyy-MM-dd') : ''
    };
    this.lmsService.updateForeclosure(payload, this.userData.topupInfo.id).subscribe(res => {
      this.bottomSheetRef.dismiss('success');
    }, err => {
      this.commonService.showError(err.error);
    });

  }

}
