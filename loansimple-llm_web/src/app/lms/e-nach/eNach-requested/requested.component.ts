import { CommonService } from './../../../services/common.service';
import { LmsService } from './../../lms.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatBottomSheet } from "@angular/material";
import { ProgressService } from "../../../services/progress.service";
import { ListResponse } from "../../../shared/list-response.interface";
import { NachRequestedList } from "../../../core/_models/nach-requested-list.model";
import { eNachRequestedOption } from "../../../core/_models/eNach-requested-option.model";


@Component({
    selector: 'kt-requested',
    templateUrl: './requested.component.html',
    styleUrls: ['./requested.component.scss']
})
export class eNachRequestedComponent implements OnInit {
    constructor(
        private lmsService: LmsService,
        private commonService: CommonService,
        private updateBottomSheet: MatBottomSheet,
        private progressService: ProgressService,
    ) { }

    // badges = new CashBadges();
    listData: ListResponse<NachRequestedList[]>;
    list: NachRequestedList[];
    options = new eNachRequestedOption();

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
        this.lmsService.geteNachRequestedDetails(this.options).subscribe(res => {
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

    //
    // filterSelectedNBFC(selectedNBFC) {
    //     this.query_string['loan_account__nbfc__id'] = selectedNBFC.value;
    //     this.baseUrl = this.baseUrl + '&loan_account__nbfc__id=' + this.query_string.loan_account__nbfc__id;
    //
    //     if (selectedNBFC.value !== '') {
    //         this.nbfc = this.nbfcArray[selectedNBFC.value - 1].name;
    //         this.idArray = [];
    //     }
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
    // loadListData() {
    //     const payloadUrl = this.baseUrl;
    //     this.lmsService.getNextPageData(payloadUrl).subscribe((res: any) => {
    //         this.listdata = res;
    //     });
    // }

    // generateArr(value, check) {
    //     const index = this.idArray.findIndex(id => id === value);
    //     if (index !== -1 && check === false) {
    //         this.idArray.splice(index, 1);
    //     } else if (index === -1 && check === true) {
    //         this.idArray.push(value);
    //     }
    // }
    //
    // selectAll() {
    //     this.is_all_selected = true;
    //     this.idArray = [];
    //     for (const item of this.listdata.results) {
    //         item.is_checked_for_deposit = this.is_all_selected;
    //         this.generateArr(item.id, this.is_all_selected);
    //     }
    // }
    //
    // deSelectAll() {
    //     this.is_all_selected = false;
    //     for (const item of this.listdata.results) {
    //         item.is_checked_for_deposit = this.is_all_selected;
    //         this.generateArr(item.id, this.is_all_selected);
    //     }
    // }
    //
    // open(content: any) {
    //     if (this.nbfc === '') {
    //         this.commonService.showToast('Please Select NBFC First', 'alert-danger');
    //     } else if (this.idArray.length === 0) {
    //         this.commonService.showToast('Please Select alteast ONE Nach', 'alert-danger');
    //     }
    //
    //     if (this.nbfc !== '' && this.idArray.length !== 0) {
    //         this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    //     }
    // }
    //
    // deposit() {
    //     const obj = { nbfc: this.idArray.length, nach_repayments_ids: this.idArray,
    //                     deposited_date: this.date.year + '-' + this.date.month + '-' + this.date.day };
    //     this.lmsService.uploadNachData(obj).subscribe(res => {
    //         this.filter = '';
    //         this.getRequestedData();
    //     });
    // }
    //
    // getRequestedData() {
    //     this.baseUrl = environment.api_host + LMS_URLS.repayments
    //         + '?expand=' + this.query_string.expand
    //         + '&loan_account__nbfc__id=' + this.query_string.loan_account__nbfc__id
    //         + '&search=' + this.query_string.search
    //         + '&sub_type=' + this.query_string.sub_type
    //         + '&type=' + this.query_string.type;
    //
    //     this.idArray = [];
    //     this.loadListData();
    // }
    //
    // getNextPage(ev) {
    //     const currentPageIndex = ev.pageIndex + 1;
    //     this.pageNumber = ev.pageIndex * ev.pageSize;
    //     const currentPageSize = ev.pageSize;
    //
    //     this.lmsService.getNextPageData(this.baseUrl, currentPageIndex, currentPageSize, this.searchString).subscribe((res: any) => {
    //         this.listdata = res;
    //     });
    // }
    //
    // ngOnDestroy(): void {
    //     this.currentFilterSubscription.unsubscribe();
    // }

}
