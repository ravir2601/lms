import { Issue } from './../../_models/issue.model';
import { IssueFormCompoment } from './../../_partials/issue-form/issue-form.component';
import { DocumentComponent } from './document/document.component';
import { CommonService } from './../../../services/common.service';
import { Bank, Branch, BankStatement } from './../../_models/bank.model';
import { ActivatedRoute } from '@angular/router';
import { AddBankDetailsComponent } from './add-bank-details/add-bank-details.component';
import { CoreService } from './../../core.service';
import { MatBottomSheet } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationsService } from '../../../applications/applications.service';

@Component({
    selector: 'kt-application-banking',
    templateUrl: './banking.component.html',
    styleUrls: ['./banking.component.scss']
})
export class BankingComponent implements OnInit {

    markBankAsOptions = [
        { key: 'is_for_disbursement', name: 'is_for_disbursement', value: 'Disbursement Bank', isChecked: false},
        { key: 'is_for_nach', name: 'is_for_nach', value: 'NACH', isChecked: false },
        { key: 'is_for_pdcs', name: 'is_for_pdcs', value: 'PDC', isChecked: false },
        { key: 'is_for_spdcs', name: 'is_for_spdcs', value: 'Security PDC', isChecked: false },
        { key: 'is_for_pos_deposit_cheque', name: 'is_for_pos_deposit_cheque', value: 'POS Deposit Cheque', isChecked: false },
    ];

    safe = [ 'account_holder_name', 'account_number', 'account_type', 'is_for_disbursement', 'is_for_pos_collection',
        'is_for_nach', 'is_for_pdcs', 'pdcs_count', 'is_for_spdcs', 'spdcs_count', 'is_for_pos_deposit_cheque', 'is_netbanking_available',
                'doc_name', 'ifsc', 'update_url'
            ];
    safeStatement = ['is_password_protected', 'password', 'from_date', 'to_date'];
    id = 0;
    businessId = 0;
    bankName: string;
    bankList: Bank[];
    bankStatement = new BankStatement();
    bankStatementList: BankStatement[];
    selectedBank = new Bank();

    branch = new Branch();
    showPassword = -1;
    files: File[];

    @ViewChild('banking', {static: false})
    banking: DocumentComponent;

    constructor(
        private bottomSheet: MatBottomSheet,
        private coreService: CoreService,
        private applicationsService: ApplicationsService,
        private commonService: CommonService,
        private route: ActivatedRoute,
    ) {
        this.id = parseInt(route.parent.snapshot.paramMap.get('id'), 10);
        this.getApplication();
    }

    ngOnInit() {
    }

    getApplication() {
        this.applicationsService.getApplication(this.id).subscribe(res => {
            this.businessId = res.business.id;
            this.getBankList();
        });
    }

    getBankList() {
        this.coreService.getBanks(this.businessId).subscribe((res: any) => {
            this.bankList = res.results;
            if (this.bankList.length !== 0) {
                this.bankName = this.bankName ? this.bankName : this.bankList[0].branch.name;
                this.selectedBank = this.bankList[0];
                this.getSelectedBankDetails();
            }
        });
    }

    getSelectedBankDetails() {
        this.branch = this.selectedBank.branch;
        this.files = [];
        this.getBankStatement(this.selectedBank.update_url);
    }

    getBankStatement(bankUrl) {
        this.coreService.getBankStatement(bankUrl).subscribe((res: any) => {
            this.bankStatementList = res.results;
            this.banking.getUploadedDocs(this.selectedBank.update_url);
            this.initChange();
        });
    }

    changedOption(options: any) {
        for (const option of  options) {
            this.selectedBank[option.key] = option.isChecked;
        }
    }

    initChange() {
        for (const option of  this.markBankAsOptions) {
            option.isChecked = this.selectedBank[option.key];
        }
    }

    saveDetails() {
        const data = this.commonService.filterSafe(this.selectedBank, this.safe);
        this.coreService.updateBank(this.selectedBank.update_url, data).subscribe(res => {
            this.commonService.showToast('Bank Detail Saved Successfully', 'alert-success');
            this.selectedBank = res;
            this.getSelectedBankDetails();
        },
        err => {
            this.commonService.showError('Please Select a Bank');
        });
    }

    updloadStatement() {
        this.bankStatement.from_date = this.commonService.parseDate(this.bankStatement.from_date);
        this.bankStatement.to_date = this.commonService.parseDate(this.bankStatement.to_date);
        this.bankStatement.is_password_protected = this.bankStatement.password ? true : false;
        const data = this.commonService.filterSafe(this.bankStatement, this.safeStatement);

        if (this.selectedBank.update_url) {
            this.coreService.addBankStatement(this.selectedBank.update_url, data, this.files).subscribe(res => {
                this.commonService.showToast('Bank statement added Successfully', 'alert-success');
                this.files = [];
                this.getBankStatement(this.selectedBank.update_url);
                this.bankStatement = new BankStatement();
            },
            err => {
                this.commonService.showError(err.error);
            });
        } else {
            this.commonService.showError('Please Select a Bank');
        }
    }

    openStatement(fileUrl) {
        window.open(fileUrl, '_blank');
    }

    delete(updateUrl, type) {
        this.commonService.confirm('Do you want to delete this Bank ' + type + '?', () => {
            this.coreService.delete(updateUrl).subscribe(res => {
                this.commonService.showToast(`Bank ${type} Deleted SuccessFully`, 'alert-success');
                type === 'Statement'
                    ? this.getBankStatement(this.selectedBank.update_url)
                    : this.bankName = '', this.getBankList();
            });
        });
    }

    openBankForm() {
        const bankForm = this.bottomSheet.open(AddBankDetailsComponent, {
            data: {
                id: this.businessId,
            }
        });
        bankForm.afterDismissed().subscribe(res => {
            if (res.type === 'success') {
                this.bankName = res.bankName;
                this.commonService.showToast('Bank Added Successfully', 'alert-success');
                this.getBankList();
            }
        });
    }

    toggleShowPassword(id) {
        if (this.showPassword === id) {
            this.showPassword = -1;
        } else {
            this.showPassword = id;
        }
    }

    issueForm(url, index) {
        this.bottomSheet.open(IssueFormCompoment, {
            data: {
                rootUrl: url
            }
        }).instance.saved.subscribe(res => {
            this.bankStatementList[index].doc_issues.push(res);
        });
    }

    updateIssue(issue: Issue, listIndex, issuesIndex) {
        const next = {
            pending: 'uploaded',
            commited: 'uploaded',
            uploaded: 'approved'
        };
        this.commonService.confirm('Do you really want to resolve this issue?', () => {
            this.coreService.updateIssue(issue.update_url, { status: next[issue.status] }).subscribe(res => {
                this.bankStatementList[listIndex].doc_issues[issuesIndex] = res;
                this.commonService.showToast('The issue has been updated successfully', 'alert-success');
            });
        });
    }
}

