import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { LeadsService } from '../leads.service';
import { CommonService } from '../../services/common.service';
import { AddLead } from './lead-form.model';
import { OtpVerificationFormComponent } from './otp-verification-form/otp-verification-form.component';
import { LeadTransferFormComponent } from './transfer-lead/lead-transfer-form.component';
import { Router } from '@angular/router';

@Component({
    selector: 'kt-lead-form',
    templateUrl: './lead-form.component.html',
    styleUrls: ['./lead-form.component.scss']
})
export class LeadFormComponent implements OnInit {
    leadSource: any;
    oldLead: any;
    error: any;
    isAdding: any;
    data: any = new AddLead();
    cities: any;
    address: object;
    sheetData: {
        rootUrl: string;
    };
    is_duplicate = false;

    constructor(
        private bottomSheetRef: MatBottomSheetRef<LeadFormComponent>,
        private leadsService: LeadsService,
        private commonService: CommonService,
        private formBottomSheet: MatBottomSheet,
        private bottomSheet: MatBottomSheet,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.sourceList();
        this.getCities();
    }

    onSubmit(form) {
        this.leadsService.addLead(form)
            .subscribe((response) => {
                if (form.source === 'Field Visit') {
                    const data = {
                        mobile: form.mobile,
                        type: 'send_otp'
                    };
                    const leadCreateData = response;
                    this.leadsService.verifyOtp(data)
                        .subscribe((res) => {
                            this.commonService.showToast('OTP sent successfully', 'alert-success');
                            this.formBottomSheet.open(OtpVerificationFormComponent, {
                                data: { lead_id: leadCreateData.id, mobile: form.mobile }
                            });
                        }, error => {
                            this.error = error.error;
                        });
                }
                this.commonService.showToast('Application has been added successfully', 'alert-success');
                this.bottomSheetRef.dismiss();
                if (form.source !== 'Field Visit') {
                    this.router.navigate(['/applications/' + response.applications[0]['id']]);
                }
            }, error => {
                this.error = error.error;
                if (error.status === 406 && this.error.is_duplicate) {
                    this.commonService.showError('A business with this number already exists.' +
                        'Please try a different mobile number.');
                } else {
                    this.error = error.error;
                    this.isAdding = false;
                }
            });
    }


    sourceList(): void {
        this.leadsService.getLeadSource().subscribe(response => {
            this.leadSource = response;
        });
    }

    getCities(): void {
        this.leadsService.getCity().subscribe(response => {
            this.cities = response;
        });
    }

    dismiss(): void {
        this.bottomSheetRef.dismiss();
    }

}
