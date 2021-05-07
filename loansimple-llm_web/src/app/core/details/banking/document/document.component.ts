import { Issue } from './../../../_models/issue.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { IssueFormCompoment } from './../../../_partials/issue-form/issue-form.component';
import { CommonService } from './../../../../services/common.service';
import { Bank } from '../../../_models/bank.model';
import { CoreService } from '../../../core.service';
import { ConstantService } from '../../../../services/constant.service';
import { Component, OnInit, Input } from '@angular/core';
import { Constant } from '../../../_models/constant.model';

@Component({
    selector: 'kt-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

    @Input() rootUrl;
    @Input() key;

    constructor(
        private constantService: ConstantService,
        private coreService: CoreService,
        private commonService: CommonService,
        private bottomSheet: MatBottomSheet,
    ) { }

    files: File[];
    bankDocs: Constant[];
    bankDoc: File;
    docName: string;
    edit: boolean;
    bankDetails = new Bank();
    doc = new Bank();

    ngOnInit() {
        this.getBankDocs();
        this.getUploadedDocs(this.rootUrl);
    }

    getBankDocs() {
        const key = 'business_bank_doc_names';
        this.constantService.constants_subject.subscribe(res => {
            this.bankDocs = res[key];
        });
    }

    getUploadedDocs(rootUrl) {
        if (this.rootUrl) {
            this.coreService.getBankDocs(rootUrl).subscribe((res: Bank) => {
                this.bankDetails.file = res.file || '';
                this.bankDetails.doc_name = res.doc_name;
                this.edit = false;
                this.doc = res;
            });
        }
    }

    uploadDoc() {
        const data = this.commonService.filterSafe(this.bankDetails, ['doc_name']);
        this.coreService.uploadBankDocs(this.rootUrl, data, this.files).subscribe(res => {
            this.edit = false;
            this.files = [];
            this.bankDetails.file = res.file + '?' + Date.now();
            this.bankDetails.doc_name = res.doc_name;
            this.getUploadedDocs(this.rootUrl);
            this.commonService.showToast('Bank proof was uploaded successfully', 'alert-success');
        });
    }

    getDate(): Date {
        return new Date();
    }

    issueForm() {
        this.bottomSheet.open(IssueFormCompoment, {
            data: {
                rootUrl: this.rootUrl
            }
        }).instance.saved.subscribe(res => {
            this.doc.doc_issues.push(res);
        });
    }

    updateIssue(issue: Issue, index) {
        const next = {
            pending: 'uploaded',
            commited: 'uploaded',
            uploaded: 'approved'
        };
        this.commonService.confirm('Do you really want to resolve this issue?', () => {
            this.coreService.updateIssue(issue.update_url, { status: next[issue.status] }).subscribe(res => {
                this.doc.doc_issues[index] = res;
                this.commonService.showToast('The issue has been updated successfully', 'alert-success');
            });
        });
    }
}
