import { ContactFormComponent } from './contact-form/contact-form.component';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ApplicationsService } from '../../applications.service';
import { ActivatedRoute } from '@angular/router';
import { OnboardingCallCheck } from '../../_models/onboarding-call-check';
import { Application } from '../../_models/application.model';

@Component({
    selector: 'kt-application-onboarding-call',
    templateUrl: './onboarding-call.component.html',
    styleUrls: ['./onboarding-call.component.scss']
})
export class OnboardingCallComponent implements OnInit {
    private id = 0;
    public data: Application;

    constructor(
        private taskFormBottomSheet: MatBottomSheet,
        private applicationsService: ApplicationsService,
        private route: ActivatedRoute
    ) {
        this.id = parseInt(route.parent.snapshot.paramMap.get('id'), 10);
        this.getOnboardingCallInfo();
    }

    ngOnInit() {
    }

    getOnboardingCallInfo() {
        this.applicationsService.getOnboardingCallInfo(this.id).subscribe(res => {
            this.data = res;
        });
    }

    openContactForm() {
        this.taskFormBottomSheet.open(ContactFormComponent);
    }
}
