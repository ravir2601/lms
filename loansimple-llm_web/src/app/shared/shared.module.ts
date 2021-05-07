import { HideStringPipe } from './pipes/hide-string.pipe';
import { DocumentComponent } from '../core/details/banking/document/document.component';
import { ReplacePipe } from './pipes/replace.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatBottomSheetModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatPaginatorModule, MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSnackBarModule, MatSpinner,
    MatChipsModule,
    MatIconModule,
    MatListModule
} from '@angular/material';
import {
    NgbButtonsModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbModule,
    NgbPaginationModule,
    NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { LsFormComponent } from './partials/ls-form/ls-form.component';
import { LsSelectComponent } from './partials/ls-select/ls-select.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { LsFormInlineComponent } from './partials/ls-form-inline/ls-form-inline.component';
import { LsSelectInlineComponent } from './partials/ls-select-inline/ls-select-inline.component';
import { LsRadioComponent } from './partials/ls-radio/ls-radio.component';
import { LsCheckboxComponent } from './partials/ls-checkbox/ls-checkbox.component';
import { GetConstantPipe } from './pipes/get-constant.pipe';
import { ClassPipe } from './pipes/class.pipe';
import { ChartsModule } from 'ng2-charts';
import { RemoveUnderscorePipe } from './pipes/remove-underscore.pipe';
import { LeadSummaryComponent } from './partials/lead-summary/lead-summary.component';
import { AssigneesComponent } from './partials/assignees/assignees.component';
import { HotKeysComponent } from './partials/hot-keys/hot-keys.component';
import { DateTimePipe } from './pipes/date-time.pipe';
import { ActivitiesComponent } from '../core/_partials/activities/activities.component';
import { BeautifyStringPipe } from './pipes/beautify-string.pipe';
import { OverviewComponent } from '../core/details/overview/overview.component';
import { BusinessComponent } from '../core/details/business/business.component';
import { BankingComponent } from '../core/details/banking/banking.component';
import { PersonalComponent } from '../core/details/personal/personal.component';
import { DocumentsComponent } from '../core/_partials/documents/documents.component';
import { ProofNumbersFormComponent } from '../core/_partials/proof-numbers-form/proof-numbers-form.component';
import { AddressComponent } from '../core/_partials/address/address.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PhotosComponent } from '../core/details/photos/photos.component';
import { PersonBasicFormComponent } from '../core/_partials/person-basic-form/person-basic-form.component';
import { BusinessBasicFormComponent } from '../core/_partials/business-basic-form/business-basic-form.component';
import { ReferenceFormComponent } from '../core/_partials/references/reference-form/reference-form.component';
import { CoApplicantFormComponent } from '../core/_partials/co-applicant-form/co-applicant-form.component';
import { ReferencesComponent } from '../core/_partials/references/references.component';
import { DynamicOverlayContainer } from '../services/overlay/dynamic-overlay-container.service';
import { DynamicOverlay } from '../services/overlay/dynamic-overlay.service';
import { ProgressService } from '../services/progress.service';
import { NullValuePipe } from '../shared/pipes/null-value.pipe';
import { OtpVerificationComponent } from '../core/_partials/otp-verification/otp-verification.component';
import { ContactsComponent } from '../core/_partials/contacts/contacts.component';
import { EmptyComponent } from '../core/_partials/empty/empty.component';
import { IssueFormCompoment } from '../core/_partials/issue-form/issue-form.component';
import { AvatarPipe } from './pipes/avatar.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { ProgressContainerComponent } from './progress-container/progress-container.component';
import { ngfModule } from 'angular-file';
import { LsBadgeComponent } from '../shared/partials/ls-badge/ls-badge.component';
import { LsSnackBarComponent } from './partials/ls-snack-bar/ls-snack-bar.component';
import { LsReleaseNotesComponent } from './partials/ls-release-notes/ls-release-notes.component';


@NgModule({
    declarations: [
        LsFormComponent,
        LsSelectComponent,
        LsFormInlineComponent,
        ContactsComponent,
        ReferencesComponent,
        ReferenceFormComponent,
        CoApplicantFormComponent,
        LsSelectInlineComponent,
        LsRadioComponent,
        LsCheckboxComponent,
        IssueFormCompoment,
        GetConstantPipe,
        ClassPipe,
        ActivitiesComponent,
        DateTimePipe,
        BeautifyStringPipe,
        OtpVerificationComponent,
        RemoveUnderscorePipe,
        ReplacePipe,
        NullValuePipe,
        HideStringPipe,
        AvatarPipe,
        SafePipe,
        LeadSummaryComponent,
        AssigneesComponent,
        HotKeysComponent,

        OverviewComponent,
        PersonalComponent,
        BusinessComponent,
        BankingComponent,
        DocumentsComponent,
        PhotosComponent,
        PersonBasicFormComponent,
        BusinessBasicFormComponent,
        ProofNumbersFormComponent,
        AddressComponent,
        ProgressContainerComponent,
        DocumentComponent,
        EmptyComponent,
        LsBadgeComponent,
        LsSnackBarComponent,
        LsReleaseNotesComponent
    ],
    imports: [
        CommonModule,
        MatPaginatorModule,
        NgbPaginationModule,
        NgbDropdownModule,
        NgbTooltipModule,
        MatBottomSheetModule,
        NgbModalModule,
        NgbButtonsModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        NgxDropzoneModule,
        ChartsModule,
        NgbModule,
        OverlayModule,
        MatProgressSpinnerModule,
        ngfModule
    ],
    exports: [
        MatPaginatorModule,
        NgbPaginationModule,
        NgbDropdownModule,
        NgbTooltipModule,
        NgbButtonsModule,
        MatBottomSheetModule,
        NgbModalModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatListModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatIconModule,
        LsFormComponent,
        LsFormInlineComponent,
        LsSelectComponent,
        LsSelectInlineComponent,
        LsRadioComponent,
        LsCheckboxComponent,
        MatSlideToggleModule,
        MatDatepickerModule,
        NgxDropzoneModule,
        ContactsComponent,
        ReferencesComponent,
        ReferenceFormComponent,
        CoApplicantFormComponent,
        ActivitiesComponent,
        IssueFormCompoment,
        GetConstantPipe,
        ClassPipe,
        DateTimePipe,
        BeautifyStringPipe,
        ChartsModule,
        RemoveUnderscorePipe,
        ReplacePipe,
        NullValuePipe,
        HideStringPipe,
        AvatarPipe,
        SafePipe,
        LeadSummaryComponent,
        AssigneesComponent,
        HotKeysComponent,
        EmptyComponent
    ],
    entryComponents: [
        ReferenceFormComponent,
        IssueFormCompoment,
        ProgressContainerComponent,
        CoApplicantFormComponent,
        LsSnackBarComponent,
        LsReleaseNotesComponent
    ],
    providers: [
        ProgressService,
        DynamicOverlay,
        DynamicOverlayContainer
    ]
})
export class SharedModule {
}
