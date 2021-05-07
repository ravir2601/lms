import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UnrService } from '../unr.service';
import { AddRegionComponent } from './add-region/add-region.component';
import { MatBottomSheet, MatPaginator } from '@angular/material';
import { ListResponse } from '../../shared/list-response.interface';
import { Badges } from '../../applications/application-list/badges.model';
import { UserListOptions } from '../../core/_models/user-list-options.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressService } from '../../services/progress.service';
import { unrRegions } from '../../core/_models/unr-regions.model';

@Component({
  selector: 'kt-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss']
})
export class RegionsComponent implements OnInit {
    loadingSearchData: boolean;
    listData: ListResponse<unrRegions[]>;
    badges = new Badges();
    list: unrRegions[];
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
        this.unrService.getRegions(this.options).subscribe(res => {
            this.progressService.detach(progressRef);
            this.loadingSearchData = false;
            this.listData = res;
            this.list = res.results;
        });
    }

    openRegionForm() {
        let modalRef = this.bottomSheet.open(AddRegionComponent, {
          data: {
            'actionType': 'ADD'
          },
        });
        modalRef.afterDismissed().subscribe(x => {
            this.getList();
        });
     }

      updateRegionForm(userDetail) {
        let modalRef = this.bottomSheet.open(AddRegionComponent, {
          data: {
            'info': userDetail,
            'actionType': 'UPDATE'
          },
        });
        modalRef.afterDismissed().subscribe(res => {
            this.getList();
        });
      }
}

