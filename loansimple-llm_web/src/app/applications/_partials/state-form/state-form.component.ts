import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { State } from '../../_models/state.model';
import { CommonService } from '../../../services/common.service';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { ApplicationsService } from '../../applications.service';

@Component({
    selector: 'kt-state-form',
    templateUrl: './state-form.component.html',
    styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent implements OnInit {
    @Output() saved = new EventEmitter();
    data: {
        btnText: string,
        action: string,
        state: State
    };
    safe = ['status', 'sub_status', 'comment', 'is_document_issue'];

    constructor(
        private commonService: CommonService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public input: any,
        private bottomSheetRef: MatBottomSheetRef<StateFormComponent>,
        private applicationsService: ApplicationsService
    ) {
        this.data = input;
    }

    ngOnInit() {
    }

    save() {
        this.applicationsService.updateApplicationState(this.data.state.update_url, {
            action: this.data.action,
            comment: this.data.state.comment
        }).subscribe(res => {
            this.data.state = res;
            this.bottomSheetRef.dismiss(res);
        });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}
