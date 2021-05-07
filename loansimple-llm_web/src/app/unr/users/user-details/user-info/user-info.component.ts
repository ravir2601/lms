import { CommonService } from './../../../../services/common.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { UnrService } from '../../../unr.service';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from "@angular/material";
import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import 'rxjs/add/observable/of';
import { startWith } from 'rxjs/operators/startWith';


@Component({
    selector: 'kt-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
    @Input() usersInfo: any;
    safe = ['id', 'emp_code', 'username', 'password', 'first_name', 'middle_name', 'last_name', 'joining_date',
        'dob', 'mobile', 'email', 'is_active', 'permissions', 'update_url'];
    managerList = [];
    managerListData = []
    reporting_manager: string;
    permissionsList = [];
    mobile: string;
    update_url: any;
    functionalities: any[] = [];
    data = [];
    all_functionalities: any = [];
    mapper_regions: any;
    visible = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    functionalityCtrl = new FormControl();
    filteredFunctionalities: Observable<string[]>;
    functionality: any;
    selectable: boolean = true;
    is_functionality_selected = false;
    managerListCtrl = new FormControl();
    filteredManagerList: Observable<any[]>;


    @ViewChild('functionalityInput', { static: false }) functionalityInput: ElementRef<HTMLInputElement>;
    @ViewChild('managerInput', { static: false }) managerInput: ElementRef;
    @ViewChild('chipAutocomplete', { static: false }) chipAutocomplete: MatAutocomplete;
    @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

    constructor(private unrService: UnrService, private router: Router, private commonService: CommonService, ) {
        this.filteredFunctionalities = this.functionalityCtrl.valueChanges
            .pipe(
                startWith(null),
                map((functionality: string | null) => functionality ? this._filter(functionality) : this.new_array.slice())
            );
        this.filteredManagerList = this.managerListCtrl.valueChanges
            .pipe(
                startWith(''),
                map(manager => manager ? this.filterReportingManager(manager) : this.managerList.slice())
            );
    }

    ngOnInit() {
        this.getFunctionality();
        this.mapperRegions(this.usersInfo.id);
        this.getReportingManager();
        console.log("this.filteredManagerList...", this.filteredManagerList);
        this.loadInitialData();
    }
    private new_array = [];
    getFunctionality() {
        this.unrService.getFunctionalityData().subscribe(res => {
            this.new_array = this.all_functionalities = res['results'];
            this.filterFunctionalities();
        });
    }

    loadInitialData() {
        this.functionalities = this.usersInfo.functionalities;
        this.reporting_manager = this.usersInfo.reporting_manager.display_name || '';
        this.permissionsList = this.usersInfo.permissions || [];

        if (this.functionalities.length !== 0) {
            this.is_functionality_selected = true;
        }
        else {
            this.is_functionality_selected = false;
        }
    }

    mapperRegions(id) {
        this.unrService.getMapperRegions(id).subscribe(res => {
            this.mapper_regions = res['data'];
        });
    }
    getReportingManager() {
        this.unrService.getReportingMangerPositionsData().subscribe(res => {
            this.managerListData = res['results'];
            this.managerListData.forEach(value => {
                if (value.reporting_manager) {
                    this.managerList.push(value.reporting_manager);
                }
            }
            );
        });
    }


    private filterReportingManager(value: any): any[] {
        return this.managerList.filter(manager => manager.display_name.toLowerCase().includes(value.toString().toLowerCase()));
    }

    selectedReportingManager(event: MatAutocompleteSelectedEvent): void {
        this.usersInfo.reporting_manager = event.option.value.id;
        this.reporting_manager = event.option.value.display_name || '';
        this.safe.push('reporting_manager');
        const data = this.commonService.filterSafe(this.usersInfo, this.safe);
        this.unrService.updateUserDetails(data).subscribe(res => {
            this.commonService.showToast('Update successfully', 'alert-success');
        });
    }

    updateActiveStatus(ev) {
        if (ev.checked !== this.usersInfo['is_active']) {
            this.usersInfo['is_active'] = ev.checked;
            this.updateUserDetails();
        }
    }

    updateUserDetails() {
        this.usersInfo.dob = this.commonService.parseDate(this.usersInfo.dob);
        this.usersInfo.joining_date = this.commonService.parseDate(this.usersInfo.joining_date);
        const data = this.commonService.filterSafe(this.usersInfo, this.safe);
        this.unrService.updateUserDetails(data).subscribe(res => {
            this.usersInfo.dob = res['dob'];
            this.usersInfo.joining_date = res['joining_date'];
            this.commonService.showToast('Update successfully', 'alert-success');
        });
    }

    updateFunctionalities() {
        const functionalities = [];
        this.functionalities.forEach(row => {
            functionalities.push(row.id);
        });
        this.unrService.updateUserFunctionality({ functionalities }, this.usersInfo.id).subscribe(res => {
            this.permissionsList = res['permissions'];
            this.usersInfo = res;
            this.commonService.showToast('Update successfully', 'alert-success');
        });
    }

    logout() {
        this.commonService.confirm('Do you really want to logged out this user from all devices?', () => {
            this.usersInfo['delete_sessions'] = true;
            this.unrService.updateUserDetails(this.usersInfo).subscribe(res => {
                this.commonService.showToast('Logout successfully', 'alert-danger');
                this.router.navigate(['./auth/login']);
            });
        });
    }

    ngOnChanges(changes) {
        if (changes.usersInfo.previousValue !== changes.usersInfo.currentValue) {
            this.loadInitialData();
        }
    }

    add(event: MatChipInputEvent): void {
        // Add functionality
        if (this.chipAutocomplete && !this.chipAutocomplete.isOpen) {
            if ((event.value || '').trim()) {
                this.functionalities.push({
                    id: Math.random(),
                    name: event.value.trim()
                });
                this.filterFunctionalities();
            }
            // Reset the input value
            if (event.input) {
                event.input.value = '';
            }
            this.functionalityCtrl.setValue(null);
        }
    }


    remove(functionality, index): void {
        this.functionalities.splice(index, 1);
    }

    filterFunctionalities() {
        this.all_functionalities.forEach((row, index) => {
            this.functionalities.forEach((item) => {
                console.log(row.id, item.id, row.id == item.id)
                if (row.id == item.id) {
                    this.new_array.splice(index, 1);
                }
                console.log("after delete..", this.new_array);
            });
        });
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.is_functionality_selected = true;
        this.functionalities.push(event.option.value);
        this.functionalityInput.nativeElement.value = '';
        this.functionalityCtrl.setValue(null);
        this.filterFunctionalities();
    }

    private _filter(value: any): any[] {
        return this.new_array.filter(functionality => functionality.name.toLowerCase().includes(value.toString().toLowerCase()));
    }
}
