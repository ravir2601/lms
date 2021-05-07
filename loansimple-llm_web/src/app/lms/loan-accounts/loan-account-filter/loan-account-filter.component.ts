import { ActivatedRoute, Router } from '@angular/router';
import { LmsService } from './../../lms.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';


@Component({
    selector: 'kt-loan-account-filter',
    templateUrl: './loan-account-filter.component.html',
    styleUrls: ['./loan-account-filter.component.scss']
})
export class LoanAccountFilterComponent implements OnInit {
    active = 'loan_type';
    select: any;
    view: any;
    public params: any;
    filterByEvent = new EventEmitter<any>();
    filters = [
        {key: 'loan_type', name: 'Loan Type', icon: 'la-money', multi: true},
        {key: 'case_owner_id_in', name: 'Case Owner', icon: 'la-user', multi: true},
        {key: 'territory_owner_id_in', name: 'Territory Owner', icon: 'la-user', multi: true},
        {key: 'account_manager', name: 'Account Manager', icon: 'la-user', multi: true},
        {key: 'nbfc', name: 'NBFC', icon: 'la-square-o', multi: true},
    ];
    searchModel: string;
    filterData: any;
    private list: any[] = [];
    public selected: any;
    lmsConstant: any;

    constructor(private bottomSheetRef: MatBottomSheetRef<LoanAccountFilterComponent>,
                private lmsService: LmsService,
                private route: ActivatedRoute,
                private router: Router,
                ) {
                this.view = 'loan_type';
    }

    ngOnInit() {
        this.lmsConstant = this.lmsService.lmsConstants;
        this.list['loan_type'] = this.lmsService.lmsConstants.loan_types;
        this.lmsService.getFilterData().subscribe(res => {
            this.filterData = res;
        });
        this.initSelected();
        this.populateSelected();
        this.getUsers();
        this. getNbfcList();
    }

    initSelected(): void {
        this.selected = {
            loan_type: [], product_type: [], account_manager: [], case_owner_id_in: [],
            territory_owner_id_in: [], nbfc: []
        };
    }

    populateSelected(): void {
        this.route.queryParams.subscribe(params => {
            Object.keys(params).forEach(key => {
                if (typeof (this.selected[key]) === 'string') {
                    this.selected[key] = params[key];
                } else {
                    this.selected[key] = [];
                    params[key].split(',').forEach(val => {
                        this.selected[key].push(val.toString());
                    });
                }
            });
        });
    }

    getNbfcList(): void {
        this.lmsService.getNBFCData().subscribe(res => {
            const nbfcList = res['results'];
            const nbfcData = [];
            nbfcList.forEach(nbfc => {
                nbfcData.push({name: nbfc.name, value: nbfc.id});
            });
            this.list['nbfc'] = nbfcData;
        });
    }

    getUsers(): void {
        this.lmsService.getUserList()
            .subscribe(response => {
                const userList = response['results'];
                const users = [];
                userList.forEach(user => {
                    users.push({name: user.display_name, value: user.id});
                });
                this.list['case_owner_id_in'] =
                this.list['territory_owner_id_in'] =
                this.list['account_manager'] = users;
            });
    }

    toggleFilter(key: string, value: string, multi: boolean): void {
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
}
