import { LeadsService } from './../../../../leads/leads.service';
import { CommonService } from './../../../../services/common.service';
// Angular
import { Component, ViewChild, OnInit } from '@angular/core';
// Layout
import { OffcanvasOptions } from '../../../../core/_base/layout';
import { MatSidenav } from '@angular/material';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kt-quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss']
    // encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit {
    // Public properties
    // offcanvasOptions: OffcanvasOptions = {
    //     overlay: true,
    //     baseClass: 'kt-quick-panel',
    //     closeBy: 'kt_quick_panel_close_btn',
    //     toggleBy: 'kt_quick_panel_toggler_btn'
    // };

    @ViewChild('sidenav', { static: false }) public sidenav: MatSidenav;
    @ViewChild('tab', {static: false}) public tab: NgbTabset;

    shouldRun = true;
    public businessData: any;
    public businessAddress: any;
    public personDetails: any;
    public leadSummary: any;
    public source: string;
    public isActive: boolean;
    public activeTab: string;

    constructor(
                private commonService: CommonService,
                private leadsService: LeadsService,
                ) { }

    ngOnInit() {
    }

    close() {
        this.activeTab = '';
        this.sidenav.close();
    }

    changeTab(tab) {
        this.activeTab = tab;
    }

    getSummary(receivedUserId, source?) {
        this.source = source;
        this.sidenav.open();
        this.tab.select('tab-summary');
        this.activeTab = 'summary';

        this.commonService.getBusinessData(receivedUserId).subscribe(res => {
            this.businessData = res;
        });

        this.commonService.getBusinessAddress(receivedUserId).subscribe(res => {
            this.businessAddress = res;
        });

        this.commonService.getPersonDetails(receivedUserId).subscribe(res => {
            this.personDetails = res;
        });

        this.leadsService.getLeadSummary(receivedUserId).subscribe(res => {
            this.leadSummary = res;
        });
    }
}
