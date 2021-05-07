import { BaseComponent } from './../../../views/theme/base/base.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../core.service';
import { Business } from '../../_models/business.model';
import { FiltersComponent } from '../../../applications/application-list/filters/filters.component';
import { MatBottomSheet } from '@angular/material';
import { ReminderFormComponent } from '../../_partials/reminders/reminder-form/reminder-form.component';
import { LogFormComponent } from '../../_partials/log-form/log-form.component';
import { ApplicationsService } from '../../../applications/applications.service';
import { Application } from '../../../applications/_models/application.model';
import { ExtraDocumentsComponent } from "../../../applications/application-details/extra-documents/extra-documents.component";

@Component({
    selector: 'kt-application-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
    id = '';
    application: Application;
    business: Business;
    source = '';

    constructor(
        private route: ActivatedRoute,
        private coreService: CoreService,
        private applicationsService: ApplicationsService,
        private bottomSheet: MatBottomSheet,
        private openSummary: BaseComponent,
        private router: Router,
    ) {
        this.source = this.route.snapshot.data.source;
        this.id = route.parent.snapshot.paramMap.get('id');
        this.getApplication();
    }

    ngOnInit() {
    }

    getApplication() {
        this.applicationsService.getApplication(this.id).subscribe(res => {
            this.application = res;
            this.business = res.business;
        });
    }

    addReminder(data?: Business): void {
        const modalFilterRef = this.bottomSheet.open(ReminderFormComponent, {
            data: {
                rootUrl: data.update_url
            }
        });
    }

    extraDoc(): void {
        this.bottomSheet.open(ExtraDocumentsComponent, {
            data: {
                id: this.id
            }
        });
    }

    addLog(data?: Business): void {
        this.bottomSheet.open(LogFormComponent, {
            data: {
                rootUrl: data.update_url
            }
        });
    }

    seePreview(data: Business): void {
        this.openSummary.toggleSummary(data.id, this.source);
    }
}
