import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RunningLoanFormComponent } from '../running-loan-form/running-loan-form.component';
import { MatBottomSheet } from '@angular/material';
import { RunningLoan } from '../../../_models/running-loan.model';
import { ApplicationsService } from '../../../applications.service';

@Component({
    selector: 'kt-running-loans',
    templateUrl: './running-loans.component.html',
    styleUrls: ['./running-loans.component.scss']
})
export class RunningLoansComponent implements OnInit {
    @Input() rootUrl;
    @Output() saved = new EventEmitter<boolean>();
    runningLoans: RunningLoan[];
    constructor(
        private bottomSheet: MatBottomSheet,
        private applicationsService: ApplicationsService
    ) { }

    ngOnInit() {
        this.getRunningLoans();
    }

    openRunningLoanForm(runningLoan = null) {
        this.bottomSheet.open(RunningLoanFormComponent, {
            data: {
                rootUrl: this.rootUrl,
                runningLoan
            }
        }).afterDismissed().subscribe(res => {
            this.getRunningLoans();
        });
    }

    getRunningLoans() {
        this.applicationsService.getRunningLoans(this.rootUrl).subscribe(res => {
            this.runningLoans = res.results;
        });
    }

    updateRunningLoan(row: RunningLoan) {
        this.applicationsService.saveRunningLoan(row.update_url, {
            is_to_include: row.is_to_include
        }, 'patch').subscribe(res => {
            this.saved.emit();
        });
    }

    delete(item) {

    }

}
