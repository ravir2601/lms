import { CommonService } from './../../../services/common.service';
import { LmsService } from './../../lms.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator, MatBottomSheet } from "@angular/material";
import { ProgressService } from "../../../services/progress.service";
import { ListResponse } from "../../../shared/list-response.interface";
import { NachDepositedList } from "../../../core/_models/nach-deposited-list.model";
import { eNachDepositedOption } from "../../../core/_models/eNach-deposited-option.model";


@Component({
    selector: 'kt-deposite',
    templateUrl: './deposite.component.html',
    styleUrls: ['./deposite.component.scss']
})
export class eNachDepositeComponent implements OnInit {
    constructor(
        private lmsService: LmsService,
        private commonService: CommonService,
        private updateBottomSheet: MatBottomSheet,
        private progressService: ProgressService,
    ) { }

    // badges = new CashBadges();
    listData: ListResponse<NachDepositedList[]>;
    list: NachDepositedList[];
    options = new eNachDepositedOption();

    currentTab = 'deposited';
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
        this.lmsService.geteNachDepositedDetails(this.options).subscribe(res => {
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

    // filterSelectedNBFC(selectedNBFC) {
    //     this.query_string['nbfc'] = selectedNBFC.value;
    //     this.baseUrl = this.baseUrl
    //         + '&nbfc=' + this.query_string.nbfc;
    //
    //     this.loadListData();
    // }
    //
    // search(searchStr) {
    //     this.searchString = searchStr.value;
    //     this.lmsService.getNextPageData(this.baseUrl, null, null, this.searchString).subscribe((res: any) => {
    //         this.listdata = res;
    //     });
    // }
    //
    // updateFile(files, data) {
    //     this.fileToUpdate = files[0];
    //     this.nachService.updateNach(data.update_url, this.fileToUpdate).subscribe(response => {
    //         this.loadListData();
    //     });
    // }

    // getDepositeData() {
    //     this.nachService.currentFilterData.subscribe(fil => {
    //         const newUrl = this.url.replace('nbfc=', 'nbfc=' + fil);
    //         this.nachService.get_requested(newUrl).subscribe(data => {
    //             this.depositData = data;
    //         });
    //     });
    // }

    // ngOnDestroy(): void {
    //     this.currentFilterSubscription.unsubscribe();
    // }

}
