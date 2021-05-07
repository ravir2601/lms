import { CommonService } from './../../../../services/common.service';
import { LmsService } from './../../../lms.service';
import { LMS_URLS } from './../../../../constants/static-urls';
import { environment } from '../../../../../environments/environment';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'kt-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

    private queryString = {
        expand: 'business,business.primary_registered_address,business.persons.person.pan_card,'
            + 'business.persons.person.aadhaar_card,business.persons.person.primary_mailing_address,'
            + 'business.persons.person.cibil-details,business.primary_mailing_address,&fields=business.business_type,'
            + 'business.primary_registered_address.view,business.primary_registered_address.ownership,'
            + 'business.primary_registered_address.file,business.primary_mailing_address.viewbusiness.persons.person.full_name,'
            + 'business.persons.person.pan_card.file,business.persons.person.aadhaar_card.file,'
            + 'business.persons.person.primary_mailing_address.file,business.persons.person.primary_mailing_address.ownership,'
            + 'business.persons.person.primary_mailing_address.view,business.persons.person.cibil-details.score,'
            + 'business.persons.person.cibil-details.enquiries'
    }
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private lmsService: LmsService,
        private commonService: CommonService,
        private bottomSheetRef: MatBottomSheetRef<SummaryComponent>,
        private cd: ChangeDetectorRef
    ) { }
    private baseUrl: string;
    public listData: any;

    ngOnInit() {
        this.baseUrl = environment.api_host + LMS_URLS.loan_accounts + this.data.id
            + '/?expand=' + this.queryString.expand;
        this.loadListData();
    }

    getList(id) {
        this.lmsService.getLoanDetails(id).subscribe((res: any) => {
            this.listData = res;
        });
    }

    loadListData(): void {
        const payloadUrl = this.baseUrl;
        this.lmsService.getNextPageData(payloadUrl).subscribe((res: any) => {
            this.listData = res;
            this.cd.detectChanges();
        },
            err => {
                this.commonService.showToast('Failed', 'alert-danger');
            });
    }

    onNavigate(url) {
        const newUrl = url.replace('devlsdocument', 'lssv2document');
        window.open(newUrl, '_blank');
    }
    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}

