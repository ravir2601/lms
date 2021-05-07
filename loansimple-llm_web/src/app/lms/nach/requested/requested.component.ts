import { CommonService } from './../../../services/common.service';
import { LmsService } from './../../lms.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatBottomSheet } from "@angular/material";
import { ProgressService } from "../../../services/progress.service";
import { ListResponse } from "../../../shared/list-response.interface";
import { ManualNachRequestedOption } from "../../../core/_models/manual-nach-requested-option.model";
import { NachRequestedList } from "../../../core/_models/nach-requested-list.model";

@Component({
    selector: 'kt-requested',
    templateUrl: './requested.component.html',
    styleUrls: ['./requested.component.scss']
})
export class RequestedComponent implements OnInit {
    constructor(
        private lmsService: LmsService,
        private commonService: CommonService,
        private updateBottomSheet: MatBottomSheet,
        private progressService: ProgressService,
    ) { }

    // badges = new CashBadges();
    listData: ListResponse<NachRequestedList[]>;
    list: NachRequestedList[];
    options = new ManualNachRequestedOption();

    currentTab = 'requested';
    loadingSearchData: boolean;

    @ViewChild('listView', { static: false })
    listView: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;


    ngOnInit() {
        this.options.tab = this.currentTab;
        this.options.sub_type = this.currentTab;
        this.getList();
    }

    getList() {
        const progressRef = this.progressService.showProgress(this.listView);
        this.loadingSearchData = true;
        this.lmsService.getNachRequestedDetails(this.options).subscribe(res => {
            this.progressService.detach(progressRef);
            this.listData = res;
            this.list = res['results'];
            this.loadingSearchData = false;
        });
    }

    paginate(data) {
        this.options.page_size = data.pageSize;
        this.options.page = data.pageIndex + 1;
        this.getList();
    }
}
