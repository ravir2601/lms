import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'kt-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
  ) { }

  ngOnInit() {
  }

  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }

  verifyOtp(){
    this.bottomSheetRef.dismiss();
  }

}
