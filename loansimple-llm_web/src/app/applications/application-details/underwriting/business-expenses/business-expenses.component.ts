import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Financial } from '../../../_models/financial.model';
import { LOS_URLS } from '../../../../constants/static-urls';
import { CommonService } from '../../../../services/common.service';
import { ApplicationsService } from '../../../applications.service';

@Component({
    selector: 'kt-business-expenses',
    templateUrl: './business-expenses.component.html',
    styleUrls: ['./business-expenses.component.scss']
})
export class BusinessExpensesComponent implements OnInit {
    @Input() rootUrl;
    @Input() data;
    safe = [
        'monthly_expenses', 'other_expenses',
        'premise_area_in_sqft', 'premise_monthly_rent',
        'no_of_employees', 'monthly_salary'
    ];
    mode = 'createFinancial';
    @Output() saved = new EventEmitter<boolean>();
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
            this.data = res;
            this.mode = 'updateFinancial';
            this.commonService.showToast('Expenses data was saved successfully', 'alert-success');
        });
    }

}
