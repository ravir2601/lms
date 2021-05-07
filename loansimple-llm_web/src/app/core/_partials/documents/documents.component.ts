import { Component, Input, OnInit, SimpleChanges, OnChanges, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { ConstantService } from '../../../services/constant.service';
import { CoreService } from '../../core.service';
import { Document } from '../../_models/document.model';
import { Constant } from '../../_models/constant.model';
import { Address } from '../../_models/address.model';
import { Issue } from '../../_models/issue.model';
import { MatBottomSheet } from '@angular/material';
import { IssueFormCompoment } from '../issue-form/issue-form.component';
import { BeautifyStringPipe } from '../../../shared/pipes/beautify-string.pipe';
import { ProgressService } from '../../../services/progress.service';

@Component({
    selector: 'kt-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit, OnChanges {
    @Input() rootUrl;
    @Input() key;
    @Input() docNamesKeys;
    @Input() extra;
    @Output() saved = new EventEmitter();

    @ViewChild('docView', { static: false })
    docView: ElementRef;

    loading = false;
    docs = [];
    doc = new Document();
    files: File[];
    safe = ['doc_type', 'doc_name'];
    primary = ['pan', 'aadhaar', 'cibil'];
    edit = false;
    docNames: Constant[];
    progressRef = null;

    constructor(
        private commonService: CommonService,
        private constantService: ConstantService,
        private coreService: CoreService,
        private progressService: ProgressService,
        private bottomSheet: MatBottomSheet
    ) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.docs = [];
        this.getUploadedDocs();
        this.getAddresses();
    }

    issueForm() {
        this.bottomSheet.open(IssueFormCompoment, {
            data: {
                rootUrl: this.doc.update_url
            }
        }).instance.saved.subscribe(res => {
            this.doc.doc_issues.push(res);
        });
    }

    getAddresses() {
        this.coreService.getAddresses(this.rootUrl).subscribe(res => {
            this.parseAddressDocs(res.results);
        });
    }

    getUploadedDocs() {
        this.coreService.getDocuments(this.rootUrl).subscribe(res => {
            const temp = {};
            res.results.forEach(row => {
                temp[row.doc_type] = row;
            });
            this.getDocs(temp);
        });
    }

    getDocs(uploaded) {
        const keys = Object.keys(uploaded);
        this.constantService.constants_subject.subscribe(res => {
            if (Object.keys(res).length) {
                res[this.key].forEach(row => {
                    this.docs.push({
                        doc_type: row.value,
                        doc_name: keys.indexOf(row.value) !== -1 ?
                            uploaded[row.value].doc_name :
                            (row.value.indexOf(this.primary) !== -1 ? row.value : ''),
                        display_name: row.name,
                        doc_issues: keys.indexOf(row.value) !== -1 ? uploaded[row.value].doc_issues : [],
                        doc_histories: keys.indexOf(row.value) !== -1 ? uploaded[row.value].doc_histories : [],
                        update_url: keys.indexOf(row.value) !== -1 ? uploaded[row.value].update_url : '',
                        file: keys.indexOf(row.value) !== -1 ? uploaded[row.value].file : ''
                    });
                });
                this.doc = this.docs[0];
            }
        });
    }

    parseAddressDocs(res: Address[]) {
        const beautifyPipe = new BeautifyStringPipe();
        res.forEach(row => {
            const display_name = beautifyPipe.transform([
                row.address_type,
                row.doc_name,
                row.city,
                row.address_line
            ].filter(x => x).join(' ~ '));
            if (row.is_same_as_permanent !== true && row.is_same_as_registered !== true) {
                this.docs.push({
                    doc_type: 'address_proof',
                    doc_name: row.doc_name || '',
                    display_name,
                    update_url: row.update_url,
                    doc_issues: row.doc_issues,
                    doc_histories: row.doc_histories,
                    file: row.file
                });
            }
        });
    }

    uploadDoc() {
        const url = this.doc.update_url || (this.rootUrl + 'documents/');
        const data = this.commonService.filterSafe(this.doc, this.safe);
        const method = this.doc.update_url ? 'patch' : 'post';
        this.progressRef = this.progressService.showProgress(this.docView);
        this.coreService.uploadDocument(url, data, this.files, method).subscribe(res => {
            this.files = [];
            this.edit = false;
            this.doc.file = res.file + '?' + Date.now();
            this.doc.update_url = res.update_url;
            this.progressService.detach(this.progressRef);
            this.saved.emit({data: res, method});
            this.commonService.showToast(this.doc.doc_type + ' was uploaded successfully', 'alert-success');
        }).add(() => {
            this.progressService.detach(this.progressRef);
        });
    }

    updateIssue(issue: Issue, index) {
        this.commonService.confirm('Do you really want to resolve this issue?', () => {
            const next = {
                pending: 'uploaded',
                commited: 'uploaded',
                uploaded: 'approved'
            };
            this.coreService.updateIssue(issue.update_url, { status: next[issue.status] }).subscribe(res => {
                this.doc.doc_issues[index] = res;
                this.commonService.showToast('The issue has been updated successfully', 'alert-success');
            });
        });
    }

    onDocChange(ev: Document) {
        this.getDocNames(ev.doc_type);
    }

    getDocNames(key) {
        this.constantService.constants_subject.subscribe(res => {
            this.docNames = res[this.docNamesKeys[key]];
        });
    }

    getDate(): Date {
        return new Date();
    }
}
