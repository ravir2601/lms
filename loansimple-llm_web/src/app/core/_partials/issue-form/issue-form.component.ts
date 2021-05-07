import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { ConstantService } from '../../../services/constant.service';
import { Constant } from '../../../core/_models/constant.model';
import { Issue } from '../../../core/_models/issue.model';
import { CoreService } from '../../core.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'kt-issue-form',
    templateUrl: './issue-form.component.html',
    styleUrls: ['./issue-form.component.scss']
})
export class IssueFormCompoment implements OnInit {
    @Input() rootUrl;
    public reasonTypes: Constant[];
    public data = new Issue();
    @Output() saved = new EventEmitter<Issue>();
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public input: any,
        private bottomSheetRef: MatBottomSheetRef<IssueFormCompoment>,
        private commonService: CommonService,
        private constantService: ConstantService,
        private coreService: CoreService,
    ) {
        this.getReasonTypes();
        this.rootUrl = input.rootUrl;
    }

    ngOnInit() {
    }

    saveData() {
        this.coreService.createIssue(this.rootUrl, this.data).subscribe(res => {
            this.commonService.showToast('The issue has been raised successfully', 'alert-success');
            this.saved.emit(res);
            this.dismiss();
        });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    getReasonTypes() {
        const key = 'doc_issue_reason_types';
        this.constantService.constants_subject.subscribe(res => {
            this.reasonTypes = res[key];
        });
    }
}
