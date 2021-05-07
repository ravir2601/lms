import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { UnrService } from '../../../unr.service';
import { ListResponse } from '../../../../shared/list-response.interface';
import { UserListOptions } from '../../../../core/_models/user-list-options.model';
import { MatBottomSheet, MatPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService } from '../../../../services/progress.service';
import { UserLogoutLoginHistory } from '../../../../core/_models/user-logout-login-history.model';

@Component({
  selector: 'kt-action-histories-list',
  templateUrl: './action-histories-list.component.html',
  styleUrls: ['./action-histories-list.component.scss']
})
export class ActionHistoriesListComponent implements OnInit {
    loadingSearchData: boolean;
    listData: ListResponse<UserLogoutLoginHistory[]>;
    list: UserLogoutLoginHistory[];
    options = new UserListOptions();
    pageNumber = 0;
    @Input() userId: string;

    array = [];
    sum = 100;
    source: string;

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
        this.options.page = 1;
        this.options.search = value;
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
        this.unrService.userActionHistories(this.userId, this.options).subscribe(res => {
            this.progressService.detach(progressRef);
            this.loadingSearchData = false;
            this.listData = res;
            this.list = res.results;
        });
    }

    openMap(user) {
        if (user.lat && user.long)  {
            window.open('https://www.google.com/maps/preview/?q=' + `${user.lat},${user.long}`, '_blank')
        }
    }
}
