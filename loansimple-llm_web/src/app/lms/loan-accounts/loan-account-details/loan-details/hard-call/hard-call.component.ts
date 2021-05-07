import { LMS_URLS } from './../../../../../constants/static-urls';
import { environment } from './../../../../../../environments/environment';
import { MatBottomSheetRef } from '@angular/material';
import { LmsService } from './../../../../lms.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { SessionService } from '../../../../../services/session.service';
import { CommonService } from '../../../../../services/common.service';

@Component({
    selector: 'kt-hard-call',
    templateUrl: './hard-call.component.html',
    styleUrls: ['./hard-call.component.scss']
})
export class HardCallComponent implements OnInit {
    userData: any;
    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public hardCallData: any,
                private lmsService: LmsService,
                private auth: SessionService,
                private commonService: CommonService,
                private bottomSheetRef: MatBottomSheetRef<HardCallComponent>,
                private cd: ChangeDetectorRef
                ) {
        this.userData = auth.getUserDetails().user;
    }
    private baseUrl: string;
    public listData: any;
    public addNumberManually = false;
    public customerNumber = '';
    public comment: string;
    hardCallObj: any = {};
    userDetail: any;
    collectionCall: any;
    is_loading = true;

    ngOnInit() {
        this.baseUrl = environment.api_host + LMS_URLS.bussiness_details + this.hardCallData.id + '/contactable_persons/';
        this.loadListData();
    }

    loadListData(): void {
        const payloadUrl = this.baseUrl;

        this.commonService.getUserDetails(this.userData.update_url).subscribe(res => {
            this.userDetail = res;
            this.cd.detectChanges();
        });
        this.lmsService.getLoanAccountDetails(payloadUrl).subscribe((res: any) => {
            this.listData = res;
            this.hardCallObj = {
                call_type: 'hard',
                agent_number: this.userDetail.mobile ? this.userDetail.mobile : '',
                customer_number: this.hardCallData.mobile,
                on_call: false
            };
        });
    }

    selectCustomerNo(custNumber) {
        this.is_loading = false;
        if (custNumber === 'Other') {
            this.addNumberManually = true;
            this.customerNumber = '';
        }
    }
    makeCall() {
        this.lmsService.makeExotelCall(this.hardCallData.id, this.hardCallObj).subscribe((res: any) => {
            this.collectionCall = res;
            this.hardCallObj.on_call = true;
        });
    }
    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}
