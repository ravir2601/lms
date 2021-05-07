import { Component, OnInit, Input } from '@angular/core';
import { Cibil } from '../../../_models/cibil.model';
import { CommonService } from '../../../../services/common.service';
import { ApplicationsService } from '../../../applications.service';
import { LOS_URLS } from '../../../../constants/static-urls';
import { CoreService } from '../../../../core/core.service';
import { Document } from '../../../../core/_models/document.model';

@Component({
    selector: 'kt-cibil-details',
    templateUrl: './cibil-details.component.html',
    styleUrls: ['./cibil-details.component.scss']
})
export class CibilDetailsComponent implements OnInit {
    @Input() rootUrl;
    mode = 'createCibil';
    safe = [
        'score',
        'enquiries',
        'date',
        'is_to_include'
    ];
    data: Document;
    constructor(
        private commonService: CommonService,
        private applicationsService: ApplicationsService,
        private coreService: CoreService,
    ) {
    }

    ngOnInit() {
        this.getCibils();
    }

    getCibils() {
        this.coreService.getDocuments(this.rootUrl, false, 'cibil').subscribe(res => {
            this.data = res.results[0];
        });
    }

    saveData() {
        const data = this.commonService.filterSafe(this.data, this.safe);
        data['date'] = this.commonService.parseDate(this.data['date']);
        this.coreService.updateDocument(this.data.update_url, data).subscribe(res => {
            this.commonService.showToast('CIBIL data was saved successfully', 'alert-success');
        });
    }

}
