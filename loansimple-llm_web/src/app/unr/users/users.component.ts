import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {UnrService} from '../unr.service';
import { MatBottomSheet, MatPaginator } from '@angular/material';
import {AddUserComponent} from './add-user/add-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { unrUsers } from '../../core/_models/unr.model';
import { UserListOptions } from '../../core/_models/user-list-options.model';
import { ListResponse } from '../../shared/list-response.interface';
import { ActionHistoriesPopupComponent } from './action-histories-popup/action-histories-popup.component';

@Component({
    selector: 'kt-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    loadingSearchData = false;
    listData: ListResponse<unrUsers[]>;
    list: unrUsers[];
    options = new UserListOptions();

    @ViewChild('listView', { static: false })
    listView: ElementRef;

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;

    constructor(
        private bottomSheet: MatBottomSheet,
        private unrService: UnrService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private progressService: ProgressService,
    ) {
    }

    ngOnInit() {
        this.options.page = 1;
        this.activatedRoute.data.subscribe(data => {
            this.getList();
        });
    }

    search(value) {
        this.loadingSearchData = false;
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

    getList() {
        const progressRef = this.progressService.showProgress(this.listView);
        this.loadingSearchData = true;
        this.unrService.getUsers(this.options).subscribe(res => {
            this.progressService.detach(progressRef);
            this.listData = res;
            this.list = res.results;
            this.loadingSearchData = false;
        });
    }

    openUserForm() {
        this.bottomSheet.open(AddUserComponent);
    }
    openActionHistories(user) {
        this.bottomSheet.open(ActionHistoriesPopupComponent, {data: user.id});
    }
}
