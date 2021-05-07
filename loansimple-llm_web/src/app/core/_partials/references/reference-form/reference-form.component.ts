import { CommonService } from './../../../../services/common.service';
import { CoreService } from './../../../core.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { OtherContact } from '../../../_models/other-contact.model';
import { Constant } from '../../../_models/constant.model';
import { ConstantService } from '../../../../services/constant.service';

@Component({
    selector: 'kt-lead-reference-form',
    templateUrl: './reference-form.component.html',
    styleUrls: ['./reference-form.component.scss']
})
export class ReferenceFormComponent implements OnInit {
    data: {
        title: string,
        rootUrl: string,
        type: string,
        relationKey: string,
        referenceDetails: OtherContact
    };
    reference = new OtherContact();
    relations: Constant[];

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public input: any,
        private bottomSheetRef: MatBottomSheetRef<ReferenceFormComponent>,
        private coreService: CoreService,
        private commonService: CommonService,
        private constantService: ConstantService,
    ) {
        this.data = input;
        this.reference = this.data.referenceDetails || new OtherContact();
        this.reference.type = this.data.type;
        this.getRelations();
    }

    ngOnInit() {
    }

    getRelations() {
        this.constantService.constants_subject.subscribe(res => {
            this.relations = res[this.input.relationsKey];
        });
    }

    save() {
        const url = this.reference.update_url || (this.data.rootUrl + 'other_contacts/');
        this.coreService.saveOtherContact(url, this.reference, this.reference.update_url ? 'patch' : 'post').subscribe(res => {
            this.bottomSheetRef.dismiss({ key: 'success', msg: ' saved successfully' });
        });
    }

    dismiss(): void {
        this.bottomSheetRef.dismiss();
    }

}
