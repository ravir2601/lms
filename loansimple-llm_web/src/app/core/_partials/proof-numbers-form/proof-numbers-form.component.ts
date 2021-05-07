import { Component, OnInit, Input } from '@angular/core';
import { ConstantService } from '../../../services/constant.service';
import { Constant } from '../../_models/constant.model';
import { CoreService } from '../../core.service';
import { CommonService } from '../../../services/common.service';
import { Document } from '../../_models/document.model';

@Component({
    selector: 'kt-proof-numbers-form',
    templateUrl: './proof-numbers-form.component.html',
    styleUrls: ['./proof-numbers-form.component.scss']
})
export class ProofNumbersFormComponent implements OnInit {
    @Input() doc: Document;
    @Input() extra = {};
    safe = ['doc_number'];
    locked = true;
    constructor(
        public commonService: CommonService,
        public coreService: CoreService
    ) {
    }

    ngOnInit() {
        if (['pan', 'aadhaar'].indexOf(this.doc.doc_type) === -1) {
            this.locked = false;
        }
        try {
            const key = 'value';
            this.extra[key] = JSON.parse(this.extra[key]);
        } catch {
        }
    }

    saveNumber() {
        const data = this.commonService.filterSafe(this.doc, this.safe);
        this.coreService.updateDocument(this.doc.update_url, data).subscribe(res => {
            this.commonService.showToast(this.doc.doc_type.toUpperCase() + ' number was saved successfully', 'alert-success');
        });
    }
}
