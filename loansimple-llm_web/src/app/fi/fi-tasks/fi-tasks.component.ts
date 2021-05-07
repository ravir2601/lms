import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatBottomSheet, MatPaginator } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { ProgressService } from "../../services/progress.service";
import { ListResponse } from "../../shared/list-response.interface";
import { FiService } from "../fi.service";
import { FiTasks } from "../../core/_models/fi-tasks.model";
import { FiTaskOptions } from "../../core/_models/fi-task-options.model";
import { FiTaskDetailsComponent } from "./fi-task-details/fi-task-details.component";

@Component({
    selector: 'kt-fi-tasks',
    templateUrl: './fi-tasks.component.html',
    styleUrls: ['./fi-tasks.component.scss']
})
export class FiTasksComponent implements OnInit {
    loadingSearchData: boolean = false;
    listData: ListResponse<FiTasks[]>;
    list: FiTasks[];
    options = new FiTaskOptions();

    @ViewChild('listView', { static: false })
    listView: ElementRef;

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;

    constructor(
        private bottomSheet: MatBottomSheet,
        private fiService: FiService,
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
        this.fiService.getFITaskList(this.options).subscribe(res => {
            this.progressService.detach(progressRef);
            this.listData = res;
            this.list = res.results;
            this.loadingSearchData = false;
        });
    }

    viewDetailsForm(data: FiTasks) {
        const modalFilterRef = this.bottomSheet.open(FiTaskDetailsComponent, {
            data: {
                data: data,
            }
        });
        modalFilterRef.afterDismissed().subscribe(res => {
            this.getList();
        });
    }

}
