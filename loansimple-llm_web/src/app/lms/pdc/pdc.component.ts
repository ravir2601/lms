import { CommonService } from './../../services/common.service';
import { LmsService } from '../lms.service';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatBottomSheet } from '@angular/material';
import { ListResponse } from "../../shared/list-response.interface";
import { ProgressService } from "../../services/progress.service";
import { PdcOption } from "../../core/_models/pdc-option.model";
import { PdcList } from "../../core/_models/pdc-list.model";


@Component({
    selector: 'kt-pdc',
    templateUrl: './pdc.component.html',
    styleUrls: ['./pdc.component.scss']
})
export class PdcComponent implements OnInit {

    constructor(
        private lmsService: LmsService,
        private commonService: CommonService,
        private updateBottomSheet: MatBottomSheet,
        private progressService: ProgressService,
    ) { }

    // badges = new PDCBadges();
    listData: ListResponse<PdcList[]>;
    list: PdcList[];
    options = new PdcOption();

    currentTab = 'pending_confirmation';
    loadingSearchData: boolean;

    @ViewChild('listView', { static: false })
    listView: ElementRef;

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;


    ngOnInit() {
        this.options.tab = this.currentTab;
        this.getList(this.currentTab);
        // this.getBadges();
    }

    // getBadges() {
    //     this.lmsService.getPDCBadges(this.options).subscribe(res => {
    //         this.badges = res;
    //     });
    // }

    getList(tab) {
        const progressRef = this.progressService.showProgress(this.listView);
        this.loadingSearchData = true;
        this.lmsService.getPdcDetails(tab, this.options).subscribe(res => {
            this.progressService.detach(progressRef);
            this.listData = res;
            this.list = res['results'];
            this.loadingSearchData = false;
        });
    }

    search(value) {
        this.options.page = 1;
        this.options.search = value;
        if(value === ''){
            this.paginator.pageIndex = 0;
        }
        this.getList(this.currentTab);
    }

    currentApplicationTab(currentTab) {
        this.options.tab = this.currentTab = currentTab;
        this.options.sub_type = currentTab;
        this.options.page = 1;
        this.getList(currentTab);
        // this.getBadges();
    }

    paginate(data) {
        this.options.page_size = data.pageSize;
        this.options.page = data.pageIndex + 1;
        this.getList(this.currentTab);
    }
}
