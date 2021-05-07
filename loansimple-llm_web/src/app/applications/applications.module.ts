import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { PersonalComponent } from '../core/details/personal/personal.component';
import { BusinessComponent } from '../core/details/business/business.component';
import { BankingComponent } from '../core/details/banking/banking.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { VerifyDisbursementComponent } from './application-details/verify-disbursement/verify-disbursement.component';
import { DisburseLoanComponent } from './application-details/disburse-loan/disburse-loan.component';
import { UnderwritingComponent } from './application-details/underwriting/underwriting.component';
import { LoanCamComponent } from './application-details/loan-cam/loan-cam.component';
import { DocumentSigningComponent } from './application-details/document-signing/document-signing.component';
import { OnboardingCallComponent } from './application-details/onboarding-call/onboarding-call.component';
import { BankingRecordsComponent } from './application-details/banking-records/banking-records.component';
import { IncomeFormComponent } from './application-details/underwriting/income-form/income-form.component';
import { RunningLoanFormComponent } from './application-details/underwriting/running-loan-form/running-loan-form.component';
import { BusinessReferenceFormComponent } from './application-details/underwriting/business-reference-form/business-reference-form.component';
import { ChequeFormComponent } from './application-details/document-signing/cheque-form/cheque-form.component';
import { ContactFormComponent } from './application-details/onboarding-call/contact-form/contact-form.component';
import { OverviewComponent } from '../core/details/overview/overview.component';
import { PhotosComponent } from '../core/details/photos/photos.component';
import { CibilDetailsComponent } from './application-details/underwriting/cibil-details/cibil-details.component';
import { BusinessExtraComponent } from './application-details/underwriting/business-extra/business-extra.component';
import { BusinessBankingComponent } from './application-details/underwriting/business-banking/business-banking.component';
import { BusinessExpensesComponent } from './application-details/underwriting/business-expenses/business-expenses.component';
import { BusinessIncomeComponent } from './application-details/underwriting/business-income/business-income.component';
import { PersonKnowledgeComponent } from './application-details/underwriting/person-knowledge/person-knowledge.component';
import { PersonExpensesComponent } from './application-details/underwriting/person-expenses/person-expenses.component';
import { PdObservationComponent } from './application-details/underwriting/pd-observation/pd-observation.component';
import { IncomeSourcesComponent } from './application-details/underwriting/income-sources/income-sources.component';
import { RunningLoansComponent } from './application-details/underwriting/running-loans/running-loans.component';
import { CamStructureComponent } from './application-details/loan-cam/cam-structure/cam-structure.component';
import { NachFormComponent } from './application-details/document-signing/nach-form/nach-form.component';
import { PrimaryNachComponent } from './application-details/onboarding-call/primary-nach/primary-nach.component';
import { CheckListComponent } from './application-details/onboarding-call/check-list/check-list.component';
import { CallRecordingComponent } from './application-details/onboarding-call/call-recording/call-recording.component';
import { PhysicalDocumentsComponent } from './application-details/document-signing/physical-documents/physical-documents.component';
import { EsignComponent } from './application-details/document-signing/esign/esign.component';
import { ManualNachComponent } from './application-details/document-signing/manual-nach/manual-nach.component';
import { PdcsComponent } from './application-details/document-signing/pdcs/pdcs.component';
import { EnachComponent } from './application-details/document-signing/enach/enach.component';
import { StateFormComponent } from './_partials/state-form/state-form.component';
import { ExtraDocumentsComponent } from './application-details/extra-documents/extra-documents.component';

const routes = [
    {
        path: '',
        children: [
            {
                path: 'all', component: ApplicationListComponent,
                data: { source: 'applications', tab: 'all', title: 'Applications: All' }
            },
            {
                path: '', redirectTo: 'all', pathMatch: 'full'
            },
        ]
    },
    {
        path: ':id',
        component: ApplicationDetailsComponent,
        children: [
            { path: 'overview', component: OverviewComponent, data: { source: 'applications', suffix: 'Overview' } },
            { path: 'personal-details', component: PersonalComponent, data: { source: 'applications', suffix: 'Personal Details' } },
            { path: 'business-details', component: BusinessComponent, data: { source: 'applications', suffix: 'Business Details' } },
            { path: 'photos', component: PhotosComponent, data: { source: 'leads', suffix: 'Photos' } },
            { path: 'banking', component: BankingComponent, data: { source: 'applications', suffix: 'Banking' } },
            { path: 'banking-records', component: BankingRecordsComponent },
            { path: 'underwriting', component: UnderwritingComponent },
            { path: 'loan-cam', component: LoanCamComponent },
            { path: 'document-signing', component: DocumentSigningComponent },
            { path: 'onboarding-call', component: OnboardingCallComponent },
            { path: 'verify-disbursement', component: VerifyDisbursementComponent },
            { path: 'disbursement-loan', component: DisburseLoanComponent },
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    declarations: [
        ApplicationListComponent,
        ApplicationDetailsComponent,
        UnderwritingComponent,
        LoanCamComponent,
        DocumentSigningComponent,
        OnboardingCallComponent,
        VerifyDisbursementComponent,
        DisburseLoanComponent,
        BankingRecordsComponent,
        IncomeFormComponent,
        RunningLoanFormComponent,
        BusinessReferenceFormComponent,
        ChequeFormComponent,
        ContactFormComponent,
        CibilDetailsComponent,
        BusinessExtraComponent,
        BusinessBankingComponent,
        BusinessExpensesComponent,
        BusinessIncomeComponent,
        PersonKnowledgeComponent,
        PersonExpensesComponent,
        PdObservationComponent,
        IncomeSourcesComponent,
        RunningLoansComponent,
        CamStructureComponent,
        NachFormComponent,
        PrimaryNachComponent,
        CheckListComponent,
        CallRecordingComponent,
        PhysicalDocumentsComponent,
        EsignComponent,
        ManualNachComponent,
        PdcsComponent,
        EnachComponent,
        StateFormComponent,
        ExtraDocumentsComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
    ],
    entryComponents: [
        IncomeFormComponent,
        RunningLoanFormComponent,
        BusinessReferenceFormComponent,
        ChequeFormComponent,
        NachFormComponent,
        ContactFormComponent,
        StateFormComponent,
        ExtraDocumentsComponent
    ]
})
export class ApplicationsModule {
}
