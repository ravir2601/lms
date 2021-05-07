import { Router, ActivatedRoute } from '@angular/router';
import { LmsService } from './../lms.service';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NachService } from './nach.service';
import { ddList } from './nachModel';
import { ManualNachRequestedOption } from "../../core/_models/manual-nach-requested-option.model";
@Component({
    selector: 'kt-nach',
    templateUrl: './nach.component.html',
    styleUrls: ['./nach.component.scss']
})
export class NachComponent implements OnInit {

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    constructor(private nachService: NachService, private lmsService: LmsService) {
     }
    selectedNBFC = '';
    ddList = ddList;
    public currentTab: string;
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
        if( this.currentTab === 'requested') {
            this.lmsService.getNachRequestedDetails(this.options).subscribe(res => {
                this.loadingSearchData = false;
            });
        }
        else if (this.currentTab === 'deposited') {
            this.lmsService.getNachDepositedDetails(this.options).subscribe(res => {
                this.loadingSearchData = false;
            });
        }
    }
}
