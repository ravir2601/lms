import { LmsService } from '../../../../lms.service';
import { LMS_URLS } from '../../../../../constants/static-urls';
import { environment } from '../../../../../../environments/environment';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';
import { CommonService } from "../../../../../services/common.service";
import { SessionService } from "../../../../../services/session.service";

@Component({
  selector: 'kt-soft-call',
  templateUrl: './soft-call.component.html',
  styleUrls: ['./soft-call.component.scss']
})
export class SoftCallComponent implements OnInit {

    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public softCallData: any, private lmsService: LmsService,
                private commonService: CommonService,
                private auth: SessionService,
                private bottomSheetRef: MatBottomSheetRef) {
                this.userData = auth.getUserDetails().user;
    }
    private baseUrl: string;
    public listData: any;
    public addNumberManually = false;
    public customerNumber = '';
    public comment: string;
    is_loading = true;
    softCallObj: any = {};
    userDetail: any;
    userData: any;
    collectionCall: any;

    ngOnInit() {
        this.baseUrl = environment.api_host + LMS_URLS.bussiness_details + this.softCallData.id + '/contactable_persons/';
        this.loadListData();
    }

    loadListData(): void {
        const payloadUrl = this.baseUrl;
        this.commonService.getUserDetails(this.userData.update_url).subscribe((res: any) => {
            this.userDetail = res;
        });

        this.lmsService.getLoanAccountDetails(payloadUrl).subscribe((res: any) => {
        this.listData = res;
        this.softCallObj = {
                call_type: 'soft',
                agent_number: this.userDetail.mobile ? this.userDetail.mobile : '',
                customer_number: this.softCallData.mobile,
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
        this.lmsService.makeExotelCall(this.softCallData.id, this.softCallObj).subscribe((res: any) => {
            this.collectionCall = res;
            this.softCallObj.on_call = true;
        });
    }
    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}
