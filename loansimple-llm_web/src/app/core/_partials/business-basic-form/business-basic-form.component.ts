import { Component, OnInit, Input } from '@angular/core';
import { Business } from '../../_models/business.model';
import { CoreService } from '../../core.service';
import { Constant, BusinessVertical } from '../../_models/constant.model';
import { ConstantService } from '../../../services/constant.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'kt-business-basic-form',
    templateUrl: './business-basic-form.component.html',
    styleUrls: ['./business-basic-form.component.scss']
})
export class BusinessBasicFormComponent implements OnInit {
    @Input() businessId: string;
    data: Business;
    businessVerticals: BusinessVertical[];
    businessTypes: Constant[];
    safe = ['name', 'business_type', 'date_of_incorporation', 'business_vertical'];
    today = new Date();

    constructor(
        private coreService: CoreService,
        private constantService: ConstantService,
        private commonService: CommonService,
    ) {
        this.getBusinessVerticals();
        this.getBusinessType();
    }

    ngOnInit() {
        this.getBusiness();
    }

    getBusiness() {
        this.coreService.getBusinessDetails(this.businessId)
            .subscribe((res: any) => {
                this.data = res;
            });
    }

    getBusinessVerticals() {
        this.constantService.getBusinessVerticals().subscribe((res: any) => {
            this.businessVerticals = res.results;
        });
    }


    getBusinessType() {
        const key = 'business_types';
        this.constantService.constants_subject.subscribe(res => {
            this.businessTypes = res[key];
        });
    }

    saveData() {
        this.data.date_of_incorporation = this.commonService.parseDate(this.data.date_of_incorporation);
        const data = this.commonService.filterSafe(this.data, this.safe);
        this.coreService.updateBusinessDetails(this.data.update_url, data).subscribe(res => {
            this.commonService.showToast('Basic Business Details Updated Successfully', 'alert-success');
        });
    }

}
