import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../../applications.service';
import { CommonService } from '../../../services/common.service';
import { ConstantService } from '../../../services/constant.service';
import { Constant } from '../../../core/_models/constant.model';
import { Nbfc } from '../../../core/_models/nbfc.model';
import { LoanData } from '../../_models/loan-data.model';
import { STRUCTURE } from './structure';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../_models/application.model';

@Component({
    selector: 'kt-application-loan-cam',
    templateUrl: './loan-cam.component.html',
    styleUrls: ['./loan-cam.component.scss']
})
export class LoanCamComponent implements OnInit {
    id = 0;
    businessId = 0;
    negotiateRequired = false;
    // loan_tenure_in_months_by_product_type

    tenure = [3, 6, 9, 12, 18];
    nbfcs: Nbfc[];
    productTypes: Constant[];
    tenures: Constant[];
    data: Application;
    terms = {
        insta_loan: [
            '1 Applicant KYC', '1 Business ID Proof', '1 Business Address Proof', 'Bank Statement',
        ],
        business_booster_loan: [
            '1 Applicant KYC', '1 Business ID Proof', '1 Business Address Proof',
            'Bank Statement', 'Co-Applicant Mandatory Above 1 Lakh'
        ],
        power_loan: [
            '1 Applicant KYC', '1 Business ID Proof', '1 Business Address Proof',
            'Bank Statement', 'Co-Applicant Mandatory', '2 Years Business Vintage', 'One Site Owned'
        ],
        xtra_power_loan: [
            '1 Applicant KYC', '1 Business ID Proof', '1 Business Address Proof', 'Bank Statement',
            'Co-Applicant Mandatory', '3 Years Business Vintage', 'One Site Owned with Property as Collateral'
        ]
    };


    constructor(
        private commonService: CommonService,
        private constantService: ConstantService,
        private applicationsService: ApplicationsService,
        private route: ActivatedRoute
    ) {
        this.id = parseInt(route.parent.snapshot.paramMap.get('id'), 10);
        this.getConstants();
    }

    ngOnInit() {
        this.getLoanData();
    }

    getLoanData() {
        this.applicationsService.getLoanData(this.id).subscribe(res => {
            this.data = res;
            this.businessId = res.business.id;
            this.getTenure();
        });
    }

    getConstants() {
        this.constantService.los_constants_subject.subscribe(res => {
            this.productTypes = res['product_types'];
        });
        this.constantService.getNbfcs().subscribe(res => {
            this.nbfcs = res.results;
        });
    }

    getTenure() {
        this.constantService.los_constants_subject.subscribe(res => {
            this.tenures = res['loan_tenure_in_months_by_product_type'][this.data.product_type];
        });
    }

    saveProductType() {
        this.getTenure();
        this.saveApplication(['product_type']);
    }

    saveApplication(safe) {
        const data = this.commonService.filterSafe(this.data, safe);
        this.applicationsService.saveApplication(this.data.update_url, data).subscribe(res => {
        });
    }

    saveLoanData(safe) {
        const data = this.commonService.filterSafe(this.data.loan_data, safe);
        this.applicationsService.saveLoanData(this.data.loan_data.update_url, data).subscribe(res => {
            this.data.loan_data = res;
        });
    }
}
