import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {Router} from '@angular/router';
import {LeadsService} from '../../leads.service';
import {CommonService} from '../../../services/common.service';


@Component({
    selector: 'otp-verification-form-dialog',
    templateUrl: './otp-verification-form.component.html',
    styleUrls: ['./otp-verification-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class OtpVerificationFormComponent implements OnInit {
    error: any;
    data: object = {};
    otp: number;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public _data: any,
        private bottomSheetRef: MatBottomSheetRef<OtpVerificationFormComponent>,
        private leadsService: LeadsService,
        private commonService: CommonService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    saveOtp(form): void {
            const data = {
                mobile: this._data.mobile,
                type: 'verify_otp',
                otp: form.otp,
                lead_id: this._data.lead_id,
            }
            this.leadsService.verifyOtp(data)
                .subscribe((response) => {
                        this.commonService.showToast('OTP Verify successfully', 'alert-success');
                        this.bottomSheetRef.dismiss();
                    },
                        error => {
                        this.error = error.error;
                    });
         }
}
