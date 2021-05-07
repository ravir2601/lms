import { Component, OnInit, Input } from '@angular/core';
import { STRUCTURE } from '../structure';
import { LoanData } from '../../../_models/loan-data.model';
import { CommonService } from '../../../../services/common.service';
import { ApplicationsService } from '../../../applications.service';

@Component({
    selector: 'kt-cam-structure',
    templateUrl: './cam-structure.component.html',
    styleUrls: ['./cam-structure.component.scss']
})
export class CamStructureComponent implements OnInit {
    @Input() data: LoanData;
    structure = STRUCTURE;
    constructor(
        private commonService: CommonService,
        private applicationsService: ApplicationsService
    ) { }

    ngOnInit() {
    }

    increment(map, inverse = false) {
        let step = parseFloat(map['steps']);
        if (inverse) {
            step = -step;
        }
        const updated = parseFloat(this.data[map['key']]) + step;
        if (updated < map['min'] || updated > map['max']) {
            return;
        }
        this.data[map['key']] = updated;
        this.saveLoanData([map['key']]);
    }

    saveLoanData(safe) {
        const data = this.commonService.filterSafe(this.data, safe);
        this.applicationsService.saveLoanData(this.data.update_url, data).subscribe(res => {
            this.data = res;
        });
    }

}
