import { PdcCreditedComponent } from './pdc-credited/pdc-credited.component';
import { CommonService } from './../../services/common.service';
import { LmsService } from '../lms.service';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatBottomSheet } from '@angular/material';
import { ProgressService } from "../../services/progress.service";
import { ListResponse } from "../../shared/list-response.interface";
import { ChequeOption } from "../../core/_models/cheque-option.model";
import { ChequeList } from "../../core/_models/cheque-list.model";


@Component({
    selector: 'kt-cheque-requests',
    templateUrl: './cheque-requests.component.html',
    styleUrls: ['./cheque-requests.component.scss']
})
export class ChequeRequestsComponent implements OnInit {
    constructor(
        private lmsService: LmsService,
        private commonService: CommonService,
        private updateBottomSheet: MatBottomSheet,
        private progressService: ProgressService,
    ) { }

    // badges = new CashBadges();
    listData: ListResponse<ChequeList[]>;
    list: ChequeList[];
    options = new ChequeOption();

    currentTab = 'pending_receiving';
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
    //     this.lmsService.getChequeBadges(this.options).subscribe(res => {
    //         this.badges = res;
    //     });
    // }

    getList(tab) {
        const progressRef = this.progressService.showProgress(this.listView);
        this.loadingSearchData = true;
        this.lmsService.getChequeDetails(tab, this.options).subscribe(res => {
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

    openPdcCredited(selectedData: any) {
        let modalPdcCredited = this.updateBottomSheet.open(PdcCreditedComponent, {
            data: selectedData,
        });

        modalPdcCredited.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getList(this.currentTab);
                this.commonService.showToast('Update successfully', 'alert-success');
            }
        })
    }
}
