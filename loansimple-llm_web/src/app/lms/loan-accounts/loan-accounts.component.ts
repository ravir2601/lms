import { Router } from '@angular/router';
import { LoanAccounts } from './../../core/_models/loan-accounts.model';
import { ListOptions } from './../../core/_models/list-options.model';
import { Badges } from './../../applications/application-list/badges.model';
import { LMS_URLS } from './../../constants/static-urls';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatBottomSheet, MatPaginator } from "@angular/material";
import { LmsService } from '../lms.service';
import { environment } from '../../../environments/environment';
import { LoanAccountFilterComponent } from './loan-account-filter/loan-account-filter.component';


@Component({
    selector: 'kt-loan-accounts',
    templateUrl: './loan-accounts.component.html',
    styleUrls: ['./loan-accounts.component.scss']
})
export class LoanAccountsComponent implements OnInit {

    currentTab = 'all';
    loadingSearchData: boolean;

    private queryString = {
        expand: 'business.lead,business.primary_person.person.primary_mobile,' +
            'business.territory_user,extra.active_pdcs,extra.active_spdcs,account_manager,case_owner,nbfc',
        fields: 'id,product_type,is_nach_active,extra.days_onboard,extra.active_pdcs.id,' +
            'extra.active_spdcs.id,extra.current_dpds,extra.total_outstanding,extra.daily_repayment,extra.total_repayment_bounces,' +
            'extra.current_dpds,business.business_id,business.name,business.primary_person.person.full_name,' +
            'business.primary_person.person.primary_mobile.mobile,' +
            'account_manager.id,account_manager.display_name,case_owner.display_name,nbfc.name,' +
            'loan_type,business.territory_user.display_name,business.lead.referral_link',
    };

    badges: Badges;
    options = new ListOptions();
    private baseUrl: string;
    list: LoanAccounts[];
    listData: any;
    public pageNumber = 0;
    private filterBy: any;
    private searchString = '';

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;

    constructor(private lmsService: LmsService,
                private filterBottomSheet: MatBottomSheet,
                private router: Router,
    ) { }

    ngOnInit() {
        this.options.tab = this.currentTab;
        this.baseUrl = environment.api_host + LMS_URLS.loan_accounts
            + '?expand=' + this.queryString.expand
            + '&fields=' + this.queryString.fields;

        this.getBadges();
        this.getList(this.currentTab);
    }

    getBadges() {
        this.lmsService.getBadges(this.options).subscribe(res => {
            this.badges = res;
        });
    }

    getList(tab) {
        this.lmsService.getLoanAccounts(tab, this.options).subscribe((res: any) => {
            this.listData = res;
            this.list = res.results;
        });
    }
    changeTab(tab) {
        this.options.page = 1;
        this.options.tab = this.currentTab = tab;
        this.getList(this.options.tab);
        this.navigateTo(this.options);
    }

    search(value) {
        this.options.page = 1;
        this.options.search = value;
        if(value === ''){
            this.paginator.pageIndex = 0;
        }
        this.getList(this.currentTab);
    }

    topupReport() {
        const newUrl = environment.api_host + LMS_URLS.topups_report;
        window.open(newUrl, '_blank');
    }

    exportLoanAccount() {
        let attachmentUrl = '';
        if (this.filterBy) {
            attachmentUrl = this.baseUrl + '&export=true' + '&tab=' + this.currentTab;
        } else {
            attachmentUrl = this.baseUrl + '&export=true' + '&tab=' + this.currentTab + '&search=' + this.searchString;
        }
        window.open(attachmentUrl, '_blank');
    }

    paginate(data) {
        this.options.page_size = data.pageSize;
        this.options.page = data.pageIndex + 1;
        this.navigateTo(this.options);
        this.getList(this.currentTab);
    }

    openFilters(): void {
        const modalFilterRef = this.filterBottomSheet.open(LoanAccountFilterComponent);
        modalFilterRef.afterDismissed().subscribe((data) => {
            Object.assign(this.options, data);
            this.filterData();
        });
    }

    filterData() {
        this.navigateTo(this.options);
        this.getList(this.currentTab);
        this.getBadges();
    }

    navigateTo(options) {
        const params = {};
        Object.entries(options).forEach(
            ([key, value]) => {
                if (value) {
                    params[key] = value;
                } else {
                    if (key === 'search') {
                        params[key] = '';
                    }
                }
            }
        );
        this.router.navigate([], {
            queryParams: params,
            queryParamsHandling: 'merge',
        });
    }
}
