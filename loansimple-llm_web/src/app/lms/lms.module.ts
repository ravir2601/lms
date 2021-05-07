import {
    FieldVisitComponent
} from './loan-accounts/loan-account-details/field-visit-history/field-visit-details/field-visit-details.component';
import {
    FieldVisitHistoryComponent
} from './loan-accounts/loan-account-details/field-visit-history/field-visit-history.component';
import {GetConstantPipe} from './../shared/pipes/get-constant.pipe';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSliderModule,
    MatSortModule,
    MatTableModule,
    MatRadioModule, MatTooltipModule
} from "@angular/material";
import {FileUploadModule} from 'ng2-file-upload';
import {CoreModule} from './../core/core.module';
import {RouterModule} from '@angular/router';
import {AuthModule} from '../views/pages/auth/auth.module';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {NachComponent} from './nach/nach.component';
import {ENachComponent} from './e-nach/e-nach.component';
import {DepositeComponent} from './nach/deposite/deposite.component';
import {RequestedComponent} from './nach/requested/requested.component';
import {NeftComponent} from './neft/neft.component';
import {ChequeRequestsComponent} from './cheque-requests/cheque-requests.component';
import {CashComponent} from './cash/cash.component';
import {LoanAccountsComponent} from './loan-accounts/loan-accounts.component';
import {LoanAccountFilterComponent} from './loan-accounts/loan-account-filter/loan-account-filter.component';
import {LoanAccountDetailsComponent} from './loan-accounts/loan-account-details/loan-account-details.component';
import {SummaryComponent} from './loan-accounts/loan-account-details/summary/summary.component';
import {RepaymentComponent} from './loan-accounts/loan-account-details/repayment/repayment.component';
import {OffUsComponent} from './loan-accounts/loan-account-details/off-us/off-us.component';
import {CommentThreadComponent} from './loan-accounts/loan-account-details/comment-thread/comment-thread.component';
import {
    PreviousCollectionComponent
} from './loan-accounts/loan-account-details/loan-details/previous-collection/previous-collection.component';
import {SoftCallComponent} from './loan-accounts/loan-account-details/loan-details/soft-call/soft-call.component';
import {PtpComponent} from './ptp/ptp.component';
import {PtpFieldVisitComponent} from './ptp/ptp-field-visit/ptp-field-visit.component';
import {UpdateCashChequeComponent} from './loan-accounts/loan-account-details/update-cash-cheque/update-cash-cheque.component';
import {UpdateNachComponent} from './loan-accounts/loan-account-details/update-nach/update-nach.component';
import {UpdateNeftComponent} from './loan-accounts/loan-account-details/update-neft/update-neft.component';
import {LmsService} from './lms.service';
import {ForeclosureComponent} from './loan-accounts/loan-account-details/loan-details/foreclosure/foreclosure.component';
import {CloseApplicationComponent} from './loan-accounts/loan-account-details/loan-details/close-application/close-application.component';
import {HardCallComponent} from './loan-accounts/loan-account-details/loan-details/hard-call/hard-call.component';
import {ExtraChangesComponent} from './loan-accounts/loan-account-details/loan-details/extra-changes/extra-changes.component';
import {NeftRequestComponent} from './loan-accounts/loan-account-details/loan-details/neft-request/neft-request.component';
import {LoanTopupComponent} from './loan-accounts/loan-account-details/loan-details/loan-topup/loan-topup.component';
import {NachRequestComponent} from './loan-accounts/loan-account-details/loan-details/nach-request/nach-request.component';
import {ExportRepaymentComponent} from './loan-accounts/loan-account-details/loan-details/export-repayment/export-repayment.component';
import {PtpHistoryComponent} from './loan-accounts/loan-account-details/loan-details/ptp-history/ptp-history.component';
import {
    FieldVisitDetailsComponent
} from './loan-accounts/loan-account-details/loan-details/ptp-history/field-visit-details/field-visit-details.component';
import {AddPtpComponent} from './loan-accounts/loan-account-details/loan-details/add-ptp/add-ptp.component';
import {
    AddNachPrimaryBankComponent
} from './loan-accounts/loan-account-details/loan-details/add-nach-primary-bank/add-nach-primary-bank.component';
import {AddFieldVisitComponent} from './loan-accounts/loan-account-details/loan-details/add-field-visit/add-field-visit.component';
import {CashCreditedComponent} from './cash/cash-credited/cash-credited.component';
import {PdcCreditedComponent} from './cheque-requests/pdc-credited/pdc-credited.component';
import {NeftCreditedComponent} from './neft/neft-credited/neft-credited.component';
import {MatTabsModule} from '@angular/material/tabs';
import { LoanDetailsComponent } from "./loan-accounts/loan-account-details/loan-details/loan-details.component";
import { RepaymentTransactionsComponent } from './loan-accounts/loan-account-details/repayment-transactions/repayment-transactions.component';
import { PdcComponent } from "./pdc/pdc.component";
import { eNachDepositeComponent } from "./e-nach/eNach-deposite/deposite.component";
import { eNachRequestedComponent } from "./e-nach/eNach-requested/requested.component";
import { PartialsModule } from "../views/partials/partials.module";


const routes = [
    {
        path: 'nach', component: NachComponent,
        children: [
            // {path: 'enach', component: ENachComponent, pathMatch: 'full'},
            {path: 'deposited', component: DepositeComponent},
            {path: 'requested', component: RequestedComponent},
        ]
    },
    {
        path: 'enach', component: ENachComponent,
        children: [
            // {path: 'enach', component: ENachComponent, pathMatch: 'full'},
            {path: 'deposited', component: eNachDepositeComponent},
            {path: 'requested', component: eNachRequestedComponent},
        ]
    },
    {
        path: 'neft', component: NeftComponent
    },
    {
        path: 'cheque_requests', component: ChequeRequestsComponent
    },
    {
        path: 'cash', component: CashComponent
    },
    {
        path: 'ptp', component: PtpComponent
    },
    {
        path: 'pdc', component: PdcComponent
    },
    {
        path: 'loan-accounts', component: LoanAccountsComponent
    },
    {
        path: 'loan-account-details', component: LoanAccountDetailsComponent
    },
    {
        path: 'loan-accounts',
        children: [
            {path: '', component: LoanAccountsComponent, pathMatch: 'full'},
            {
                path: ':id',
                component: LoanAccountDetailsComponent,
                children: [
                    {path: 'details', component: LoanDetailsComponent, pathMatch: 'full'},
                    {path: 'repayments', component: RepaymentTransactionsComponent,
                            data: {source: 'loanAccount', title: 'Loan Account: Repayments'}},
                    {path: '', redirectTo: 'details', pathMatch: 'full'},
                ]
            },
        ]
    },
];


@NgModule({
    declarations: [
        NachComponent,
        LoanAccountDetailsComponent,
        ENachComponent,
        DepositeComponent,
        RequestedComponent,
        NeftComponent,
        ChequeRequestsComponent,
        CashComponent,
        LoanAccountsComponent,
        LoanAccountFilterComponent,
        LoanAccountDetailsComponent,
        SummaryComponent,
        RepaymentComponent,
        OffUsComponent,
        CommentThreadComponent,
        PreviousCollectionComponent,
        SoftCallComponent,
        PtpComponent,
        PtpFieldVisitComponent,
        UpdateCashChequeComponent,
        UpdateNachComponent,
        UpdateNeftComponent,
        HardCallComponent,
        CloseApplicationComponent,
        ForeclosureComponent,
        NeftRequestComponent,
        FieldVisitHistoryComponent,
        ExtraChangesComponent,
        LoanTopupComponent,
        NachRequestComponent,
        ExportRepaymentComponent,
        PtpHistoryComponent,
        FieldVisitDetailsComponent,
        FieldVisitComponent,
        ExtraChangesComponent,
        AddPtpComponent,
        AddNachPrimaryBankComponent,
        AddFieldVisitComponent,
        CashCreditedComponent,
        PdcCreditedComponent,
        NeftCreditedComponent,
        LoanDetailsComponent,
        RepaymentTransactionsComponent,
        PdcComponent,
        eNachDepositeComponent,
        eNachRequestedComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
        FileUploadModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule,
        MatSelectModule,
        MatSliderModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        MatRadioModule,
        MatTooltipModule,
        AuthModule,
        NgbModule,
        PartialsModule,
        NgbModule.forRoot(),
        RouterModule.forChild(routes),
    ],
    exports: [
        LoanAccountFilterComponent,
        MatTabsModule,
        MatTabsModule,
        MatCardModule,
    ],
    entryComponents: [
        LoanAccountFilterComponent,
        SummaryComponent,
        RepaymentComponent,
        OffUsComponent,
        CommentThreadComponent,
        PreviousCollectionComponent,
        SoftCallComponent,
        HardCallComponent,
        PtpFieldVisitComponent,
        UpdateCashChequeComponent,
        UpdateNachComponent,
        UpdateNeftComponent,
        CloseApplicationComponent,
        ForeclosureComponent,
        NeftRequestComponent,
        FieldVisitHistoryComponent,
        ExtraChangesComponent,
        LoanTopupComponent,
        NachRequestComponent,
        ExportRepaymentComponent,
        PtpHistoryComponent,
        FieldVisitDetailsComponent,
        FieldVisitComponent,
        ExtraChangesComponent,
        AddPtpComponent,
        AddNachPrimaryBankComponent,
        AddFieldVisitComponent,
        CashCreditedComponent,
        PdcCreditedComponent,
        NeftCreditedComponent,
        eNachDepositeComponent,
        eNachRequestedComponent
    ],
    providers: [
        LmsService,
        DatePipe,
        GetConstantPipe
    ],
})
export class LmsModule {
}
