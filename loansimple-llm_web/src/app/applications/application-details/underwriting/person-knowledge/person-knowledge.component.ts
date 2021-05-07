import { Component, OnInit, Input } from '@angular/core';
import { Constant } from '../../../../core/_models/constant.model';
import { ConstantService } from '../../../../services/constant.service';
import { CoreService } from '../../../../core/core.service';
import { Person } from '../../../../core/_models/person.model';
import { CommonService } from '../../../../services/common.service';

@Component({
    selector: 'kt-person-knowledge',
    templateUrl: './person-knowledge.component.html',
    styleUrls: ['./person-knowledge.component.scss']
})
export class PersonKnowledgeComponent implements OnInit {
    @Input() data: Person;
    qualificationTypes: Constant[];
    safe = ['education_qualification', 'business_experience', 'business_experience_comment'];
    constructor(
        public constantService: ConstantService,
        public commonService: CommonService,
        public coreService: CoreService
    ) {
        this.getConstants();
    }

    ngOnInit() {
    }

    getConstants() {
        this.constantService.constants_subject.subscribe(res => {
            this.qualificationTypes = res['person_education_qualification'];
        });
    }

    saveData() {
        const data = this.commonService.filterSafe(this.data, this.safe);
        this.coreService.savePerson(this.data.update_url, data).subscribe(res => {
            this.data = res;
            this.commonService.showToast('Knowledge data was saved successfully', 'alert-success');
        });
    }
}
