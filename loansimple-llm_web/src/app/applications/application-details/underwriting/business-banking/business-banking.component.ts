import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Financial } from '../../../_models/financial.model';
import { LOS_URLS } from '../../../../constants/static-urls';
import { CommonService } from '../../../../services/common.service';
import { ApplicationsService } from '../../../applications.service';
@Component({
    selector: 'kt-business-banking',
    templateUrl: './business-banking.component.html',
    styleUrls: ['./business-banking.component.scss']
})
export class BusinessBankingComponent implements OnInit {
    @Input() rootUrl;
    @Input() data;
    @Output() saved = new EventEmitter<boolean>();
    safe = ['average_bank_balance', 'loan_emi_bounces', 'other_cheque_bounces'];
    mode = 'createFinancial';
    constructor(
        public commonService: CommonService,
        public applicationsService: ApplicationsService
    ) { }

    ngOnInit() {
        if (!this.data) {
            this.data = new Financial();
            this.rootUrl = this.rootUrl + LOS_URLS.financials;
        } else {
            this.mode = 'updateFinancial';
            this.rootUrl = this.data.update_url;
        }
    }

    saveData() {
        const data = this.commonService.filterSafe(this.data, this.safe);
        this.applicationsService[this.mode](this.rootUrl, data).subscribe(res => {
            this.saved.emit();
            this.commonService.showToast('Banking data was saved successfully', 'alert-success');
        });
    }

}
