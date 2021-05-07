import { LoanAccounts } from './../../../../core/_models/loan-accounts.model';
import { BaseComponent } from './../../../../views/theme/base/base.component';
import { Topups } from './../../../../core/_models/topups.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LmsService } from '../../../lms.service';
import { MatBottomSheet } from '@angular/material';
import { CommonService } from '../../../../services/common.service';
import { environment } from '../../../../../environments/environment';
import { LMS_URLS } from '../../../../constants/static-urls';
import { RepaymentComponent } from '../repayment/repayment.component';
import { OffUsComponent } from '../off-us/off-us.component';
import { CommentThreadComponent } from '../comment-thread/comment-thread.component';
import { FieldVisitHistoryComponent } from '../field-visit-history/field-visit-history.component';
import { PreviousCollectionComponent } from './previous-collection/previous-collection.component';
import { SoftCallComponent } from './soft-call/soft-call.component';
import { ForeclosureComponent } from './foreclosure/foreclosure.component';
import { ExtraChangesComponent } from './extra-changes/extra-changes.component';
import { HardCallComponent } from './hard-call/hard-call.component';
import { PtpHistoryComponent } from './ptp-history/ptp-history.component';
import { AddPtpComponent } from './add-ptp/add-ptp.component';
import { AddFieldVisitComponent } from './add-field-visit/add-field-visit.component';
import { UpdateCashChequeComponent } from '../update-cash-cheque/update-cash-cheque.component';
import { UpdateNachComponent } from '../update-nach/update-nach.component';
import { UpdateNeftComponent } from '../update-neft/update-neft.component';
import { CloseApplicationComponent } from './close-application/close-application.component';
import { NeftRequestComponent } from './neft-request/neft-request.component';
import { ExportRepaymentComponent } from './export-repayment/export-repayment.component';
import { AddNachPrimaryBankComponent } from './add-nach-primary-bank/add-nach-primary-bank.component';
import { LoanTopupComponent } from './loan-topup/loan-topup.component';
import { NachRequestComponent } from './nach-request/nach-request.component';


@Component({
    selector: 'kt-loan-details',
    templateUrl: './loan-details.component.html',
    styleUrls: ['./loan-details.component.scss']
})
export class LoanDetailsComponent implements OnInit {
    loadingSearchData: boolean;

    private query_string = {
        expand: 'nbfc,topups.extra,extra,business.id_proof,business.pan_card,business.primary_mailing_address,'
            + 'business.mailing_addresses.region,business.primary_registered_address.region,'
            + 'business.registered_addresses.region,business.docs,business.nominee,business.persons.person,'
            + 'business.primary_person.person.primary_mobile,ptps.repayment.field_visit'
    };
    private business_query_string = {
        expand: 'person.emergency_contact,person.primary_mailing_address,person.mailing_addresses.region,'
            + 'person.permanent_addresses.region,person.docs,person.aadhaar_card,person.pan_card,person.mobiles,'
            + 'person.emails'
    };
    data: any = {};
    public listData: LoanAccounts;
    public showDetails = 'loan';
    public id: number;
    public repaymentList: any;
    public repaymentType = false;
    public repaymentString = 'processed';
    public password: string;
    public topups: Topups;
    private currentJustify: any;
    loanAccountId: string;

    constructor(
        private route: ActivatedRoute,
        private lmsService: LmsService,
        private updateBottomSheet: MatBottomSheet,
        private commonService: CommonService,
        private openSummary: BaseComponent,
    ) {
        this.loanAccountId = route.parent.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.getLoanDetails();
        this.currentJustify = 'start';
    }

    getLoanDetails() {
        this.lmsService.getLoanDetails(this.loanAccountId).subscribe((res: any) => {
            this.listData = res;
            this.topups = this.listData.topups[0];
            this.password = this.listData.business.primary_person.person.dob.split('-').reverse().join('');
        });
    }

    getTopUp(event, topupDetails) {
        this.topups = topupDetails;
    }

    loadDetails(index) {
        this.showDetails = index;
        if (index === 1) {
            const repaymentUrl = environment.api_host + LMS_URLS.loan_accounts + this.id
                + '/repayments/?only_pending_loan_repayment=' + this.repaymentType
                + '&repayment_type=' + this.repaymentString;
            this.lmsService.getLoanAccountDetails(repaymentUrl).subscribe((res: any) => {
                this.repaymentList = res;
            });
        }
    }

    openAttachment(event, url) {
        this.commonService.copyToClipboard(event, this.password);
        const attachmentUrl = url + 'account_statement/';
        window.open(attachmentUrl, '_blank');
    }


    repayment(event) {
        this.repaymentType = event.checked;
        if (this.repaymentType) {
            this.repaymentString = 'pending';
        } else { this.repaymentString = 'processed'; }
        const repaymentUrl = environment.api_host + LMS_URLS.loan_accounts + this.id
            + '/repayments/?only_pending_loan_repayment=' + this.repaymentType
            + '&repayment_type=' + this.repaymentString;
        this.lmsService.getLoanAccountDetails(repaymentUrl).subscribe((res: any) => {
            this.repaymentList = res;
        });
    }

    summary() {
        this.openSummary.toggleSummary(this.loanAccountId);
    }

    accountRepayment() {
        const modalRepayment = this.updateBottomSheet.open(RepaymentComponent, {
            data: { id: this.listData.id },
        });
    }
    offUs() {
        const modaloffUs = this.updateBottomSheet.open(OffUsComponent, {
            data: { id: this.listData.id },
        });
    }
    commentThread() {
        const modalCommentThread = this.updateBottomSheet.open(CommentThreadComponent, {
            data: { id: this.listData.id },
        });
    }
    fieldVisitHistory() {
        const modalFieldVisitHistory = this.updateBottomSheet.open(FieldVisitHistoryComponent, { data: { id: this.listData.id }, });
    }

    previousCollection() {
        const modalPreviousCollection = this.updateBottomSheet.open(PreviousCollectionComponent, {
            data: { id: this.listData.id },
        });
    }
    softCall() {
        const modalSoftCall = this.updateBottomSheet.open(SoftCallComponent, {
            data: { id: this.listData.id, mobile: this.listData.business.primary_person.person.primary_mobile.detail }
        });
    }

    markAbsconding(listData) {
        this.commonService.confirm('Are you sure?', () => {
            this.lmsService.markAbsconded(listData.update_url, { is_absconded: true }).subscribe(res => {
            });
        });
    }
    markEscalation() {

    }



    extraChanges() {
        this.updateBottomSheet.open(ExtraChangesComponent, {
            data: this.listData
        });
    }

    hardCall() {
        const modalHardCall = this.updateBottomSheet.open(HardCallComponent, {
            data: {
                id: this.listData.id, mobile: this.listData.business.primary_person.person.primary_mobile.detail
            }
        });
    }

    ptpHistory() {
        const modalPtpHistory = this.updateBottomSheet.open(PtpHistoryComponent, {
            data: this.listData,
        });
    }

    addPTP() {
        const modalPtpHistory = this.updateBottomSheet.open(AddPtpComponent, {
            data: this.listData,
        });
        modalPtpHistory.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getLoanDetails();
                this.loadDetails('loan');
                this.commonService.showToast('Added successfully', 'alert-success');
            }
        });
    }

    addFieldVisit() {
        const modalAddFieldVisit = this.updateBottomSheet.open(AddFieldVisitComponent, {
            data: this.listData,
        });
        modalAddFieldVisit.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getLoanDetails();
                this.loadDetails('loan');
                this.commonService.showToast('Added successfully', 'alert-success');
            }
        });
    }
    updateCashChequeRequest(repayment, str) {
        const modalRef = this.updateBottomSheet.open(UpdateCashChequeComponent, {
            data: repayment
        });
        modalRef.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.loadDetails('repayment');
            }
        });
    }
    updateNachRequest(repayment, str) {
        const modalRef = this.updateBottomSheet.open(UpdateNachComponent, {
            data: { datalist: repayment },
        });
        modalRef.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.loadDetails('repayment');
            }
        });
    }
    updateNeftRequest(repayment, str) {
        const modalRef = this.updateBottomSheet.open(UpdateNeftComponent, {
            data: { datalist: repayment },
        });
        modalRef.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.loadDetails('repayment');
            }
        });
    }

    reCalculated() {
        const repaymentUrl = environment.api_host + LMS_URLS.loan_accounts
            + 'calculate_extra_data/?loan_account_ids=' + this.id;
        this.lmsService.getLoanAccountDetails(repaymentUrl).subscribe((res: any) => {
            this.getLoanDetails();
        });
    }

    foreclosure() {
        const modalForeClosure = this.updateBottomSheet.open(ForeclosureComponent, {
            data: {
                topupInfo: this.listData
            }
        });

        modalForeClosure.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getLoanDetails();
                this.loadDetails('loan');
                this.commonService.showToast('Update successfully', 'alert-success');
            }

        });
    }

    closeTopup() {
        const modalCloseTopup = this.updateBottomSheet.open(CloseApplicationComponent, {
            data: {
                id: this.listData.topups[0].id,
                pos_surrender_date: this.listData.topups[0].pos_surrender_date,
                ls_credit_point: this.listData.topups[0].ls_credit_point,
                topup_over_comment: this.listData.topups[0].topup_over_comment
            }
        });

        modalCloseTopup.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getLoanDetails();
                this.loadDetails('loan');
                this.commonService.showToast('Update successfully', 'alert-success');
            }

        });
    }

    neftRequest() {
        const modalNeftRequest = this.updateBottomSheet.open(NeftRequestComponent, {
            data: this.listData,
        });

        modalNeftRequest.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getLoanDetails();
                this.loadDetails('loan');
                this.commonService.showToast('Added successfully', 'alert-success');
            }
        });
    }

    exportRepayment() {
        const modalExportRepayment = this.updateBottomSheet.open(ExportRepaymentComponent, {
            data: this.listData,
        });
    }
    addNachPrimaryBank() {
        const modalAddNachBank = this.updateBottomSheet.open(AddNachPrimaryBankComponent, {
            data: this.listData,
        });
        modalAddNachBank.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getLoanDetails();
                this.loadDetails('loan');
                this.commonService.showToast('Added successfully', 'alert-success');
            }
        });
    }

    loanTopup() {
        const modalLoanTopup = this.updateBottomSheet.open(LoanTopupComponent, {
            data: this.listData,
        });

        modalLoanTopup.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getLoanDetails();
                this.loadDetails('loan');
                this.commonService.showToast('Added successfully', 'alert-success');
            }
        });
    }

    nachTrigger() {
        if (this.listData.is_nach_active) {
            const modalNachTrigger = this.updateBottomSheet.open(NachRequestComponent, {
                data: this.listData,
            });

            modalNachTrigger.afterDismissed().subscribe(res => {
                if (res === 'success') {
                    this.getLoanDetails();
                    this.loadDetails('loan');
                    this.commonService.showToast('Added successfully', 'alert-success');
                }
            });
        } else {
            this.commonService.showError('NACH is not active for this Loan Account');
        }
    }

}
