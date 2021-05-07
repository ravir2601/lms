import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { BusinessPerson, Person } from '../../_models/person.model';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { CoreService } from '../../core.service';
import { CommonService } from '../../../services/common.service';

@Component({
    selector: 'kt-co-applicant-form',
    templateUrl: './co-applicant-form.component.html',
    styleUrls: ['./co-applicant-form.component.scss']
})
export class CoApplicantFormComponent implements OnInit {
    data: {
        businessId: number;
    };
    businessPerson = new BusinessPerson();
    @Output() saved = new EventEmitter<BusinessPerson>();
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public input: any,
        private bottomSheetRef: MatBottomSheetRef<CoApplicantFormComponent>,
        private coreService: CoreService,
        private commonService: CommonService
    ) {
        this.businessPerson.is_primary = false;
        this.businessPerson.person = new Person();
        this.data = input;
    }

    ngOnInit() {
    }

    save() {
        this.coreService.createBusinessPerson(this.data.businessId, this.businessPerson).subscribe(res => {
            this.saved.emit(res);
            this.bottomSheetRef.dismiss();
        });
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}

