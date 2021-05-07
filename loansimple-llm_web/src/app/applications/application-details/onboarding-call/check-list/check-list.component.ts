import { Component, OnInit, Input } from '@angular/core';
import { OnboardingCallCheck } from '../../../../applications/_models/onboarding-call-check';
import { ApplicationsService } from '../../../../applications/applications.service';
import { CommonService } from '../../../../services/common.service';

@Component({
    selector: 'kt-check-list',
    templateUrl: './check-list.component.html',
    styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {
    @Input() data: OnboardingCallCheck[];
    constructor(
        private applicationService: ApplicationsService,
        private commonService: CommonService,
    ) { }

    ngOnInit() {
    }

    updateOnboardingCallCheck(row: OnboardingCallCheck) {
        const data = this.commonService.filterSafe(row, ['is_done']);
        this.applicationService.updateOnboardingCallCheck(row.update_url, data).subscribe(res => {
            this.commonService.showToast('Your check-list has been updated successfully', 'alert-success');
        });
    }

}
