import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationsService } from '../../../applications.service';
import { ConstantService } from '../../../../services/constant.service';
import { Constant, BusinessCategory, BusinessVertical } from '../../../../core/_models/constant.model';
import { Business } from '../../../../core/_models/business.model';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { ListResponse } from '../../../../shared/list-response.interface';
import { CoreService } from '../../../../core/core.service';
import { CommonService } from '../../../../services/common.service';
import { Income } from '../../../_models/income.model';

@Component({
    selector: 'kt-business-extra',
    templateUrl: './business-extra.component.html',
    styleUrls: ['./business-extra.component.scss']
})
export class BusinessExtraComponent implements OnInit {
    @Input() data: Business;
    @Output() saved = new EventEmitter<boolean>();
    businessModels: Constant[];
    businessCategories: BusinessCategory[];
    businessVerticals: BusinessVertical[];
    selectedCategories: Income[];

    safe = [
        'business_model', 'business_vertical'
    ];
    constructor(
        private constantService: ConstantService,
        private commonService: CommonService,
        private coreService: CoreService,
        private applicationsService: ApplicationsService,
    ) {
    }

    ngOnInit() {
        this.getConstants();
        this.selectedCategories = this.data.financial.categories;
        if (!this.selectedCategories || this.selectedCategories.length === 0) {
            this.selectedCategories = [new Income()];
        }
        console.log(this.selectedCategories);
    }

    addIncome() {
        if (this.selectedCategories.length >= this.businessCategories.length) {
            this.commonService.showError('You can\'t add more categories.');
            return;
        }
        this.selectedCategories.push(new Income());
    }

    removeIncome(index) {
        if (this.selectedCategories[index].update_url) {
            this.coreService.delete(this.selectedCategories[index].update_url).subscribe(res => {
                this.saved.emit();
                this.selectedCategories.splice(index, 1);
            });
        } else {
            this.selectedCategories.splice(index, 1);
        }
    }

    calculateIncome(index) {
        const row = this.selectedCategories[index];
        if (row.no_of_pieces > 0 && row.price_per_piece > 0) {
            row.revenue = row.no_of_pieces * row.price_per_piece;
        }
        row.income = (row.margin / 100) * row.revenue;
        this.selectedCategories[index] = row;
    }

    getConstants() {
        this.constantService.constants_subject.subscribe(res => {
            this.businessModels = res['business_model_types'];
        });
        this.constantService.getBusinessVerticals().subscribe(res => {
            this.businessVerticals = res.results;
        });
        this.getBusinessCategories();
    }

    getBusinessCategories() {
        if (this.data.business_model && this.data.business_vertical) {
            this.constantService.getBusinessCategories(this.data.business_model, this.data.business_vertical).subscribe(res => {
                this.businessCategories = res.results;
            });
        }
    }

    saveData() {
        const data = this.commonService.filterSafe(this.data, this.safe);
        this.coreService.updateBusinessDetails(this.data.update_url, data).subscribe(res => {
            this.saveCategories();
            this.saved.emit();
        });
    }

    saveCategories() {
        const safe = (this.data.business_model === 'job' || this.data.business_model === 'manufacturing') ?
            ['category', 'margin', 'no_of_pieces', 'price_per_piece'] :
            ['category', 'margin', 'revenue'];
        const url = this.data.financial.update_url;
        this.selectedCategories.forEach((row, index) => {
            const data = this.commonService.filterSafe(row, safe);
            if (row.update_url && row.category) {
                this.applicationsService.updateBusinessIncome(row.update_url, data).subscribe(res => {
                    this.selectedCategories[index] = res;
                });
            } else if (row.category) {
                this.applicationsService.createBusinessIncome(url, data).subscribe(res => {
                    this.selectedCategories[index] = res;
                });
            }
        });
    }

}
