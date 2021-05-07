import { BusinessReferenceFormComponent } from './business-reference-form/business-reference-form.component';
import { RunningLoanFormComponent } from './running-loan-form/running-loan-form.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ApplicationsService } from '../../applications.service';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../_models/application.model';
import { CoreService } from '../../../core/core.service';
import { BusinessPerson } from '../../../core/_models/person.model';

@Component({
    selector: 'kt-application-underwriting',
    templateUrl: './underwriting.component.html',
    styleUrls: ['./underwriting.component.scss']
})
export class UnderwritingComponent implements OnInit {
    id = 0;
    businessId = 0;
    data: Application;
    businessPersons: BusinessPerson[];
    businessPerson: BusinessPerson;
    constructor(
        private taskFormBottomSheet: MatBottomSheet,
        private applicationsService: ApplicationsService,
        private coreService: CoreService,
        private route: ActivatedRoute
    ) {
        this.id = parseInt(route.parent.snapshot.paramMap.get('id'), 10);
    }

    ngOnInit() {
        this.getUnderwritingInfo();
    }

    getUnderwritingInfo() {
        this.applicationsService.getUnderwritingInfo(this.id).subscribe(res => {
            this.data = res;
            this.businessId = res.business.id;
            this.getBusinessPersons();
        });
    }

    getBusinessPersons() {
        this.businessPersons = this.data.business.persons;
        this.businessPersons.forEach(businessPerson => {
            if (businessPerson.is_primary) {
                this.businessPerson = businessPerson;
            }
        });
    }

    getSummary() {
        this.applicationsService.getUnderwritingInfo(this.id).subscribe(res => {
            this.data.business.financial = res.business.financial;
            this.data.business.persons = res.business.persons;
        });
    }

}
