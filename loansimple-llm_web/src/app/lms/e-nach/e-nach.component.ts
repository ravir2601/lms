import { CommonService } from '../../services/common.service';
import { ActivatedRoute, Router } from "@angular/router";
import { LmsService } from '../lms.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NachService } from '../nach/nach.service';
import { ManualNachRequestedOption } from "../../core/_models/manual-nach-requested-option.model";

@Component({
    selector: 'kt-e-nach',
    templateUrl: './e-nach.component.html',
    styleUrls: ['./e-nach.component.scss']
})
export class ENachComponent implements OnInit {

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    constructor(private nachService: NachService, private lmsService: LmsService, private router: Router, private route: ActivatedRoute) {

    }
    selectedNBFC = '';
    public currentTab: string = 'requested';
    loadingSearchData: boolean;
    options = new ManualNachRequestedOption();

    ngOnInit() {
        this.lmsService.filterDataList({action: 'select', value: ''});
    }

    change() {
        const payload = {action: 'select', value: this.selectedNBFC};
        this.lmsService.filterDataList(payload);
    }

    checkCurrentTab(tab) {
        this.currentTab = tab;
    }

    search(value) {
        this.options.page = 1;
        this.options.search = value;
        if (this.currentTab === 'requested') {
            this.lmsService.geteNachRequestedDetails(this.options).subscribe(res => {
                this.loadingSearchData = false;
            });
        }
        else if (this.currentTab === 'deposited') {
            this.lmsService.geteNachDepositedDetails(this.options).subscribe(res => {
                this.loadingSearchData = false;
            });
        }
    }
}
