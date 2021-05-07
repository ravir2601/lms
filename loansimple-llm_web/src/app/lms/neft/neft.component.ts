import { NeftCreditedComponent } from './neft-credited/neft-credited.component';
import { CommonService } from './../../services/common.service';
import { LmsService } from '../lms.service';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatBottomSheet } from '@angular/material';
import { ProgressService } from "../../services/progress.service";
import { ListResponse } from "../../shared/list-response.interface";
import { NEFTOption } from "../../core/_models/neft-option.model";
import { NEFTList } from "../../core/_models/neft-list.model";


@Component({
    selector: 'kt-neft',
    templateUrl: './neft.component.html',
    styleUrls: ['./neft.component.scss']
})
export class NeftComponent implements OnInit {
    constructor(
        private lmsService: LmsService,
        private commonService: CommonService,
        private updateBottomSheet: MatBottomSheet,
        private progressService: ProgressService,
    ) { }

    listData: ListResponse<NEFTList[]>;
    list: NEFTList[];
    options = new NEFTOption();

    loadingSearchData: boolean;

    @ViewChild('listView', { static: false })
    listView: ElementRef;

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;


    ngOnInit() {
        this.getList();
    }

    getList() {
        const progressRef = this.progressService.showProgress(this.listView);
        this.loadingSearchData = true;
        this.lmsService.getNEFTDetails(this.options).subscribe(res => {
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
        this.getList();
    }

    paginate(data) {
        this.options.page_size = data.pageSize;
        this.options.page = data.pageIndex + 1;
        this.getList();
    }

    openNeftCredited(selectedData: any) {
        // this.repaymentData = selectedData;
        // this.amount = selectedData.loan_expected;
        // this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
        let modalNeftCredited = this.updateBottomSheet.open(NeftCreditedComponent, {
            data: selectedData,
        });

        modalNeftCredited.afterDismissed().subscribe(res => {
            if (res === 'success') {
                this.getList();
                this.commonService.showToast('Update successfully', 'alert-success');
            }
        })
    }
}
