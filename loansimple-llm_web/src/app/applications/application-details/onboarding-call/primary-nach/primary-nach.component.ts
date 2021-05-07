import { Component, OnInit, Input } from '@angular/core';
import { CoreService } from '../../../../core/core.service';
import { Bank } from '../../../../core/_models/bank.model';
import { CommonService } from '../../../../services/common.service';

@Component({
    selector: 'kt-primary-nach',
    templateUrl: './primary-nach.component.html',
    styleUrls: ['./primary-nach.component.scss']
})
export class PrimaryNachComponent implements OnInit {
    @Input() businessId: number;
    public banks: Bank[];
    constructor(
        private coreService: CoreService,
        private commonService: CommonService
    ) { }

    ngOnInit() {
        this.coreService.getBanks(this.businessId).subscribe(res => {
            this.banks = res.results;
        });
    }

    updateBank(url: string) {
        const data = { is_primary: true };
        this.coreService.updateBank(url, data).subscribe(res => {
            this.commonService.showToast('The bank was marked as primary successfully', 'alert-success');
        });
    }
}
