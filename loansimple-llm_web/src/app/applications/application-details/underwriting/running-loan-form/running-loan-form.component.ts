import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Constant } from '../../../../core/_models/constant.model';
import { ConstantService } from '../../../../services/constant.service';
import { RunningLoan } from '../../../_models/running-loan.model';
import { ApplicationsService } from '../../../applications.service';
import { LOS_URLS } from '../../../../constants/static-urls';

@Component({
    selector: 'kt-running-loan-form',
    templateUrl: './running-loan-form.component.html',
    styleUrls: ['./running-loan-form.component.scss']
})
export class RunningLoanFormComponent implements OnInit {
    config: {
        rootUrl: string;
        runningLoan: RunningLoan;
    };
    existingLoanTypes: Constant[];
    data: RunningLoan;
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public input: any,
        private bottomSheetRef: MatBottomSheetRef<RunningLoanFormComponent>,
        private constantService: ConstantService,
        private applicationsService: ApplicationsService
    ) {
        this.getConstants();
        this.config = input;
    }

    ngOnInit() {
        if (this.config.runningLoan) {
            this.config.rootUrl = this.config.runningLoan.update_url;
            this.data = this.config.runningLoan;
        } else {
            this.config.rootUrl += LOS_URLS.runningLoans;
            this.data = new RunningLoan();
        }
    }

    getConstants() {
        this.constantService.constants_subject.subscribe(res => {
            this.existingLoanTypes = res['existing_loan_types'];
        });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    saveData() {
        this.applicationsService.saveRunningLoan(
            this.config.rootUrl,
            this.data,
            this.data.update_url ? 'patch' : 'post'
        ).subscribe(res => {
            this.dismiss();
        });
    }

}
