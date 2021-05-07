import { AddBankDetailsComponent } from './../core/details/banking/add-bank-details/add-bank-details.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateAdapter, MatSelectModule, MatSidenavModule, MAT_DATE_FORMATS } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../core/core.module';
import { BankingComponent } from '../core/details/banking/banking.component';
import { BusinessComponent } from '../core/details/business/business.component';
import { PhotosComponent } from '../core/details/photos/photos.component';
import { OverviewComponent } from '../core/details/overview/overview.component';
import { PersonalComponent } from '../core/details/personal/personal.component';
import { BankFormComponent } from '../core/_partials/bank-form/bank-form.component';
import { LogFormComponent } from '../core/_partials/log-form/log-form.component';
import { ReminderFormComponent } from '../core/_partials/reminders/reminder-form/reminder-form.component';
import { RemindersComponent } from '../core/_partials/reminders/reminders.component';
import { TaskFormComponent } from '../core/_partials/tasks/task-form/task-form.component';
import { TasksComponent } from '../core/_partials/tasks/tasks.component';
import { AppDateAdapter, APP_DATE_FORMATS } from '../shared/format-datepicker/format-datepicker';
import { SharedModule } from '../shared/shared.module';
import { PartialsModule } from '../views/partials/partials.module';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { LeadFormComponent } from './lead-form/lead-form.component';
import { OtpVerificationFormComponent } from './lead-form/otp-verification-form/otp-verification-form.component';
import { FiltersComponent } from '../applications/application-list/filters/filters.component';
import { ApplicationListComponent } from '../applications/application-list/application-list.component';
import { LeadsService } from './leads.service';
import { LeadTransferFormComponent } from './lead-form/transfer-lead/lead-transfer-form.component';
import { CanDeactivateGuard } from '../core/deactivate/can-deactivate.guard';
import { ApplicationsModule } from "../applications/applications.module";

const routes = [
    {
        path: ':id',
        component: LeadDetailsComponent,
        children: [
            {
                path: 'overview',
                component: OverviewComponent,
                data: { source: 'leads', suffix: 'Overview' }
            },
            {
                path: 'personal-details',
                component: PersonalComponent,
                // canDeactivate: [CanDeactivateGuard],
                data: { source: 'leads', suffix: 'Personal Details' }
            },
            {
                path: 'business-details',
                component: BusinessComponent,
                data: { source: 'leads', suffix: 'Business Details' }
            },
            {
                path: 'photos',
                component: PhotosComponent,
                data: { source: 'leads', suffix: 'Photos' }
            },
            {
                path: 'banking',
                component: BankingComponent,
                data: { source: 'leads', suffix: 'Banking' }
            },
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    declarations: [
        FiltersComponent,
        LeadFormComponent,
        LeadDetailsComponent,
        LogFormComponent,
        TasksComponent,
        TaskFormComponent,
        BankFormComponent,
        ReminderFormComponent,
        RemindersComponent,
        OtpVerificationFormComponent,
        AddBankDetailsComponent,
        LeadTransferFormComponent,
    ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    PartialsModule,
    FormsModule,
    MatSidenavModule,
    NgbDropdownModule,
    NgbTabsetModule,
    NgbTooltipModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    ApplicationsModule
  ],
    exports: [
        FiltersComponent
    ],
    entryComponents: [
        FiltersComponent,
        LeadFormComponent,
        LogFormComponent,
        TaskFormComponent,
        BankFormComponent,
        ReminderFormComponent,
        OtpVerificationFormComponent,
        AddBankDetailsComponent,
        LeadTransferFormComponent,
    ],
    providers: [
        LeadsService,
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    ]
})
export class LeadsModule {
}
