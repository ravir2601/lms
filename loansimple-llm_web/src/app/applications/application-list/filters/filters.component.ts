import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from "@angular/material";
import { LeadsService } from "../../../leads/leads.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { ConstantService } from "../../../services/constant.service";

@Component({
    selector: 'kt-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FiltersComponent implements OnInit, OnDestroy {
    view: any;
    public params: any;
    select: any[] = [];
    @Output()
    filterByEvent = new EventEmitter<any>();
    active: any;
    users: any;
    leadSource: any;
    cities: any;
    private list: any[] = [];
    public selected: any;
    searchModel: string;
    private unsubscribeAll: Subject<any>;

    filters = [
        {key: 'source__in', name: 'Source', icon: 'la-bolt', multi: true},
        {key: 'city', name: 'City', icon: 'la-location-arrow', multi: true},
        {key: 'state__status__in', name: 'Status', icon: 'la-money', multi: true},
        {key: 'case_owner_id__in', name: 'Case Owner', icon: 'la-user', multi: true},
        {key: 'territory_owner_id__in', name: 'Territory Owner', icon: 'la-user', multi: true},
        {key: 'quality_check_user__id__in', name: 'Quality Checker', icon: 'la-user-secret', multi: true},
    ];


    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private bottomSheetRef: MatBottomSheetRef<FiltersComponent>,
        private leadsService: LeadsService,
        private route: ActivatedRoute,
        private router: Router,
        private constantService: ConstantService
    ) {
        this.view = 'source__in';
        this.unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.initSelected();
        this.populateSelected();
    }

    initSelected(): void {
        this.getSource();
        this.getStatus();
        this.getUsers();
        this.getCities();
        this.selected = {
            source__in: [], city: [], state__status__in: [], state__sub_status__in: [], product_type: [], case_owner_id__in: [],
            territory_owner_id__in: [], quality_check_user__id__in: []
        };
    }

    populateSelected(): void {
        this.route.queryParams.subscribe(params => {
            Object.keys(params).forEach(key => {
                if (typeof (this.selected[key]) === 'string') {
                    this.selected[key] = params[key];
                } else {
                    this.selected[key] = [];
                    if(params[key]) {
                        params[key].split(',').forEach(val => {
                            this.selected[key].push(val.toString());
                        });
                    }
                }
            });
        });
    }

    getStatus(): void {
        this.constantService.los_constants_subject.subscribe(res => {
            this.list['state__status__in'] = res['application_status_with_sub_status'];
        });
    }

    getUsers(): void {
        this.leadsService.getUserList()
            .subscribe(response => {
                const userList = response['results'];
                const users = [];
                userList.forEach(user => {
                    users.push({name: user.display_name, value: user.id});
                });
                this.list['case_owner_id__in'] =
                this.list['territory_owner_id__in'] =
                this.list['quality_check_user__id__in'] = users;
            });
    }

    getSource(): void {
        this.leadsService.getLeadSource()
            .subscribe(res => {
                this.leadSource = res['results'];
                const sources = [];
                this.leadSource.forEach(s => {
                    sources.push({name: s.name, value: s.name});
                });
                this.list['source__in'] = sources;
            });
    }

    getCities(): void {
        this.leadsService.getCity()
            .subscribe(response => {
                this.cities = response['results'];
                const citiesList = [];
                this.cities.forEach(c => {
                    citiesList.push({name: c.name, value: c.name});
                });
                this.list['city'] = citiesList;
            });
    }

    toggleFilter(key: string, value: string, multi: boolean) {
        value = value.toString();
        if (multi === false) {
            this.selected[key] = value;
            return;
        }
        const index = this.selected[key].indexOf(value);
        if (index < 0) {
            this.selected[key].push(value);
        } else {
            this.selected[key].splice(index, 1);
        }
    }

    filterBusiness() {
        const params = {};
        Object.keys(this.selected).forEach(key => {
            const selectedType = typeof (this.selected[key]);
            if (selectedType === 'object' && this.selected[key].length > 0) {
                params[key] = this.selected[key].join(',');
            } else if (selectedType !== 'object' && this.selected[key] !== '') {
                params[key] = this.selected[key];
            } else {
                params[key] = null;
            }
        });
        // if (params['city']) {
        //     if (params['city'] === "New Delhi") {
        //         params['city'] = 'Delhi';
        //     }
        // }

        this.navigateTo(params);
        this.params = params;
        localStorage.setItem('sessionid', JSON.stringify(params));
        this.filterByEvent.emit(this.selected);
        this.filterByEvent.emit(this.params);
        this.bottomSheetRef.dismiss(this.params);
        event.preventDefault();
    }

    clearAll(): void {
        this.initSelected();
        this.router.navigate([], {queryParams: {}});
        this.filterByEvent.emit(this.selected);
        this.bottomSheetRef.dismiss(this.selected);
        event.preventDefault();
    }

    navigateTo(params): void {
        this.router.navigate([], {
            queryParams: params,
            queryParamsHandling: 'merge',
        });
    }

    stringify(obj): string {
        return obj.toString();
    }

    indexof(str, arr): string {
        return arr.indexOf(str);
    }

    close(): void {
        this.bottomSheetRef.dismiss();
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

}
