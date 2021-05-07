import { Component, OnInit, Input } from '@angular/core';
import { ConstantService } from '../../../../services/constant.service';
import { Constant } from '../../../../core/_models/constant.model';
import { ApplicationExtra } from '../../../_models/application.model';
import { ApplicationsService } from '../../../applications.service';
import { CommonService } from '../../../../services/common.service';

@Component({
    selector: 'kt-pd-observation',
    templateUrl: './pd-observation.component.html',
    styleUrls: ['./pd-observation.component.scss']
})
export class PdObservationComponent implements OnInit {
    @Input() data: ApplicationExtra;
    resultChoices: Constant[];
    file: File;
    safe = ['pd_result', 'pd_note', 'is_physical_pd_required'];

    constructor(
        private constantService: ConstantService,
        private commonService: CommonService,
        private applicationsService: ApplicationsService
    ) {
        this.getConstants();
    }

    ngOnInit() {
    }

    getConstants() {
        this.constantService.los_constants_subject.subscribe(res => {
            this.resultChoices = res['pd_detail_result_choices'];
        });
    }

    saveData() {
        const data = this.commonService.filterSafe(this.data, this.safe);
        this.applicationsService.saveExtra(this.data.update_url, data, this.file).subscribe(res => {
            this.data = res;
            this.commonService.showToast('PD Observations have been saved successfully', 'alert-success');
        });
    }

    fileChange(el) {
        this.file = el.target.files[0];
    }

}
