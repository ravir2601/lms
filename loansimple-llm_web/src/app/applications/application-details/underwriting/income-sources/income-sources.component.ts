import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { IncomeFormComponent } from '../income-form/income-form.component';
import { ApplicationsService } from '../../../applications.service';
import { IncomeSource } from '../../../_models/income-source.model';

@Component({
    selector: 'kt-income-sources',
    templateUrl: './income-sources.component.html',
    styleUrls: ['./income-sources.component.scss']
})
export class IncomeSourcesComponent implements OnInit {
    @Input() rootUrl;
    incomeSources: IncomeSource[];
    constructor(
        private bottomSheet: MatBottomSheet,
        private applicationsService: ApplicationsService
    ) { }

    ngOnInit() {
        this.getIncomeSources();
    }

    openIncomeForm(incomeSource = null) {
        this.bottomSheet.open(IncomeFormComponent, {
            data: {
                rootUrl: this.rootUrl,
                incomeSource
            }
        }).afterDismissed().subscribe(res => {
            this.getIncomeSources();
        });
    }

    getIncomeSources() {
        this.applicationsService.getIncomeSources(this.rootUrl).subscribe(res => {
            this.incomeSources = res.results;
        });
    }

    delete(item) {

    }

}
