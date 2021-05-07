import { Component, OnInit } from '@angular/core';
import { ApplicationsService } from '../applications.service';
import { states, dict, negativeActions } from './states';
import { Application } from '../_models/application.model';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { StateFormComponent } from '../_partials/state-form/state-form.component';
@Component({
    selector: 'kt-application-details',
    templateUrl: './application-details.component.html',
    styleUrls: ['./application-details.component.scss']
})
export class ApplicationDetailsComponent implements OnInit {
    private id = 0;
    public dict = dict;
    public states = states;
    public negativeStates = negativeActions;
    public current = 'information_gathering';
    public statusIndex = 0;
    public data: Application;

    public nav = [
        { link: 'overview', icon: 'la-home', text: 'Overview', step: 0 },
        { link: 'personal-details', icon: 'la-user', text: 'Personal', step: 0 },
        { link: 'business-details', icon: 'la-building', text: 'Business', step: 0 },
        { link: 'photos', icon: 'la-image', text: 'Photos', step: 0 },
        { link: 'banking', icon: 'la-money', text: 'Banking', step: 0 },
        { link: 'underwriting', icon: 'la-shield', text: 'Underwriting', step: 2 },
        { link: 'loan-cam', icon: 'la-serve', text: 'Loan CAM', step: 2 },
        { link: 'document-signing', icon: 'la-pencil', text: 'Doc Signing', step: 6 },
        { link: 'onboarding-call', icon: 'la-phone', text: 'Onboarding Call', step: 6 },
        { link: 'verify-disbursement', icon: 'la-check-circle', text: 'Verify Disbursement', step: 7 },
        { link: 'disbursement-loan', icon: 'la-flag-checkered', text: 'Disburse Loan', step: 8 },
    ];

    constructor(
        private applicationsService: ApplicationsService,
        private commonService: CommonService,
        private route: ActivatedRoute,
        private bottomSheet: MatBottomSheet
    ) {
        this.id = parseInt(route.snapshot.paramMap.get('id'), 10);
        this.getData();
    }

    ngOnInit() {
    }

    getData() {
        this.applicationsService.getApplication(this.id).subscribe(res => {
            this.data = res;
            this.parseData();
        });
    }

    parseData() {
        this.statusIndex = this.dict.indexOf(this.data.state.status);
        if (this.statusIndex === -1) {
            this.statusIndex = this.dict.indexOf(this.data.state.sub_status);
        }
    }

    saveState(action: string, name: string) {
        const refForm = this.bottomSheet.open(StateFormComponent, {
            data: {
                btnText: name,
                action,
                state: this.data.state
            }
        }).afterDismissed().subscribe(res => {
            if (res) {
                this.data.state = res;
                this.parseData();
                this.commonService.showSuccess('Application\'s state has been changed successfully.');
            }
        });
    }
}
