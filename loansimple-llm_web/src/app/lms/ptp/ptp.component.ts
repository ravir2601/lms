import { PtpFieldVisitComponent } from './ptp-field-visit/ptp-field-visit.component';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatBottomSheet, MatPaginator } from "@angular/material";
import { LmsService } from '../lms.service';
import { PtpListModel } from "../../core/_models/ptp-list.model";
import { ListResponse } from "../../shared/list-response.interface";
import { PtpOptionModel } from "../../core/_models/ptp-option.model";
import { ProgressService } from "../../services/progress.service";
import { PTPBadges } from "./badges.model";

@Component({
  selector: 'kt-ptp',
  templateUrl: './ptp.component.html',
  styleUrls: ['./ptp.component.scss']
})
export class PtpComponent implements OnInit {
    badges = new PTPBadges();
    listData: ListResponse<PtpListModel[]>;
    list: PtpListModel[];
    options = new PtpOptionModel();

    currentTab = 'all';
    loadingSearchData: boolean;

    @ViewChild('listView', { static: false })
    listView: ElementRef;

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;

    constructor(private lmsService: LmsService,
                private filterBottomSheet: MatBottomSheet,
                private progressService: ProgressService,
    ) { }

    ngOnInit() {
        this.options.tab = this.currentTab;
        this.getList(this.currentTab);
        this.getBadges();
    }

    getBadges() {
        this.lmsService.getPtpBadges(this.options).subscribe(res => {
            this.badges = res;
        });
    }

    getList(tab) {
        const progressRef = this.progressService.showProgress(this.listView);
        this.loadingSearchData = true;
        this.lmsService.getPtpDetails(tab, this.options).subscribe(res => {
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
        this.options.page = 1;
        this.getList(currentTab);
        this.getBadges();
    }

    paginate(data) {
        this.options.page_size = data.pageSize;
        this.options.page = data.pageIndex + 1;
        this.getList(this.currentTab);
    }

    fieldVisitDetail(fieldVisit) {
        this.filterBottomSheet.open(PtpFieldVisitComponent, {data: { visitData: fieldVisit }, });
    }

    deleteEntity(ptp, data) {
        if (confirm('Are you sure to delete ')) {
            this.lmsService.deletePTP(data.update_url).subscribe((res) => {
                this.getList(this.currentTab);
                this.getBadges();
            });
          } else {
            console.log('Implement close functionality here');
          }
    }
}
