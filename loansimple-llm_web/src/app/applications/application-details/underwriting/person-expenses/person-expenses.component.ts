import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Financial } from '../../../_models/financial.model';
import { CommonService } from '../../../../services/common.service';
import { ApplicationsService } from '../../../applications.service';
import { LOS_URLS } from '../../../../constants/static-urls';

@Component({
    selector: 'kt-person-expenses',
    templateUrl: './person-expenses.component.html',
    styleUrls: ['./person-expenses.component.scss']
})
export class PersonExpensesComponent implements OnInit {
    @Input() rootUrl;
    @Input() data: Financial;
    @Output() saved = new EventEmitter<boolean>();
    safe = [
        'residence_premise_area_in_sqft', 'residence_premise_rent',
        'minor_dependents', 'non_minor_dependents',
        'personal_expenses', 'other_expenses'
    ];
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
            this.data = res;
            this.mode = 'updateFinancial';
            this.commonService.showToast('Expenses data was saved successfully', 'alert-success');
        });
    }

    totalDependents() {
        if (this.data.minor_dependents && this.data.non_minor_dependents) {
            this.data.no_of_dependents = (this.data.minor_dependents * 1) + (this.data.non_minor_dependents * 1);
        }
    }

}
