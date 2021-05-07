import { BaseComponent } from '../../views/theme/base/base.component';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet, MatPaginator } from '@angular/material';
import { FiltersComponent } from './filters/filters.component';
import { LeadFormComponent } from '../../leads/lead-form/lead-form.component';
import { LogFormComponent } from '../../core/_partials/log-form/log-form.component';
import { LeadsService } from '../../leads/leads.service';
import { Application } from '../_models/application.model';
import { ListResponse } from '../../shared/list-response.interface';
import { ListOptions } from '../../core/_models/list-options.model';
import { ProgressService } from '../../services/progress.service';
import { Badges } from './badges.model';
import { ReminderFormComponent } from '../../core/_partials/reminders/reminder-form/reminder-form.component';
import { ApplicationsService } from '../applications.service';
import { Business } from '../../core/_models/business.model';

@Component({
    selector: 'kt-application-list',
    templateUrl: './application-list.component.html',
    styleUrls: ['./application-list.component.scss']
})
export class ApplicationListComponent implements OnInit {
    loading: boolean;
    baseUrl: any;
    listData: ListResponse<Application[]>;
    badges = new Badges();
    list: Application[];
    options = new ListOptions();
    public tab: string;
    pageNumber = 0;


    array = [];
    sum = 100;
    source: string;

    @ViewChild('listView', { static: false })
    listView: ElementRef;

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;

    @ViewChild(FiltersComponent, { static: false })
    businessListFilter;

    constructor(
        private bottomSheet: MatBottomSheet,
        private applicationsService: ApplicationsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private progressService: ProgressService,
        private openSummary: BaseComponent
    ) {
        this.initFilters();
        this.source = this.activatedRoute.snapshot.data.source;
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            this.tab = data.tab;
            this.getBadges();
            this.getList(data.tab);
        });
    }

    initFilters() {
        this.activatedRoute.queryParams.subscribe(params => {
            Object.entries(params).forEach(([key, value]) => {
                if (this.options[key] !== undefined) {
                    this.options[key] = value;
                }
            });
        });
    }

    search(value) {
        this.options.page = 1;
        this.options.search = value;
        this.filterData();
    }


    paginate(data) {
        this.options.page_size = data.pageSize;
        this.options.page = data.pageIndex + 1;
        this.navigateTo(this.options);
        this.getList(this.tab);
    }

    toggleSummary(id) {
        this.openSummary.toggleSummary(id, this.source);
    }

    openBottomSheet(type: string, data?: Business) {
        const components = {
            log: LogFormComponent,
            form: LeadFormComponent,
        };
        const modalFilterRef = this.bottomSheet.open(components[type], {
            data: {
                rootUrl: type !== 'form' ? data.update_url : null
            }
        });
        modalFilterRef.afterDismissed().subscribe(res => {
            Object.assign(this.options);
            this.filterData();
        });
    }

    openReminderForm(data: Business) {
        const modalFilterRef = this.bottomSheet.open(ReminderFormComponent, {
            data: {
                rootUrl: data.update_url,
            }
        });
        modalFilterRef.afterDismissed().subscribe(res => {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.navigateTo(this.options);
        });
    }

    @HostListener('window:keydown', ['$event'])
    listenKeyboard($event: KeyboardEvent) {
        if ($event.altKey && $event.code === 'KeyN') {
            this.openBottomSheet('form');
        } else if ($event.altKey && $event.code === 'KeyF') {
            this.openBottomSheet('filters');
        } else if ($event.altKey && $event.code === 'KeyS') {
            this.searchField.nativeElement.focus();
        }
    }

    openFilters(): void {
        const modalFilterRef = this.bottomSheet.open(FiltersComponent, { data: this.options });
        modalFilterRef.afterDismissed().subscribe((data) => {
            Object.assign(this.options, data);
            this.filterData();
        });
    }

    filterData() {
        this.navigateTo(this.options);
        this.getList(this.tab);
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

    getBadges() {
        this.badges = new Badges();
        // this.applicationsService.getBadges(this.options).subscribe(res => {
        //     this.badges = res;
        // });
    }

    getList(tab) {
        const progressRef = this.progressService.showProgress(this.listView);
        this.loading = true;
        this.applicationsService.getApplications(tab, this.options).subscribe(res => {
            this.progressService.detach(progressRef);
            this.loading = false;
            this.listData = res;
            this.list = res.results;
        });
    }

    changeTab(tab) {
        this.options.page = 1;
        this.options.tab = tab;
        this.getList(this.options.tab);
        this.navigateTo(this.options);
    }
}

