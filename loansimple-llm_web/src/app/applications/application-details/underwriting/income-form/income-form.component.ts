import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ConstantService } from '../../../../services/constant.service';
import { Constant } from '../../../../core/_models/constant.model';
import { IncomeSource } from '../../../_models/income-source.model';
import { ApplicationsService } from '../../../applications.service';
import { LOS_URLS } from '../../../../constants/static-urls';

@Component({
    selector: 'kt-income-form',
    templateUrl: './income-form.component.html',
    styleUrls: ['./income-form.component.scss']
})
export class IncomeFormComponent implements OnInit {
    config: {
        rootUrl: string;
        incomeSource: IncomeSource;
    };
    incomeSourceTypes: Constant[];
    data: IncomeSource;
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public input: any,
        private bottomSheetRef: MatBottomSheetRef<IncomeFormComponent>,
        private constantService: ConstantService,
        private applicationsService: ApplicationsService
    ) {
        this.config = input;
        this.getConstants();
    }

    ngOnInit() {
        if (this.config.incomeSource) {
            this.config.rootUrl = this.config.incomeSource.update_url;
            this.data = this.config.incomeSource;
        } else {
            this.config.rootUrl += LOS_URLS.incomeSources;
            this.data = new IncomeSource();
        }
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

    getConstants() {
        this.constantService.constants_subject.subscribe(res => {
            this.incomeSourceTypes = res['income_source_types'];
        });
    }

    saveData() {
        this.applicationsService.saveIncomeSource(
            this.config.rootUrl,
            this.data,
            this.data.update_url ? 'patch' : 'post'
        ).subscribe(res => {
            this.dismiss();
        });
    }

    getDate() {
        return new Date();
    }
}
