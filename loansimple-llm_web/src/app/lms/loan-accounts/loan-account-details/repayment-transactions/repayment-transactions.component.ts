import { Repayment } from './../../../../core/_models/repayment.model';
import { ListResponse } from './../../../../shared/list-response.interface';
import { ListOptions } from './../../../../core/_models/list-options.model';
import { LmsService } from './../../../lms.service';
import { DatePipe } from '@angular/common';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material";

@Component({
  selector: 'kt-repayment-transactions',
  templateUrl: './repayment-transactions.component.html',
  styleUrls: ['./repayment-transactions.component.scss']
})
export class RepaymentTransactionsComponent implements OnInit {
  @ViewChild('tab', {static: false}) public tab: NgbTabset;
  activeTab = 'pending';
  repaymentType = false;
  loadingSearchData: boolean;
  repaymentList: Repayment[];


  listData: ListResponse<Repayment>;

    @ViewChild('searchField', { static: false })
    searchField: ElementRef;

    @ViewChild('paginator', { static: false })
    paginator: MatPaginator;


  constructor(private lmsService: LmsService) { }

  date: string;
  id = 1;
  options = new ListOptions();

  ngOnInit() {
      this.options.tab = 'pending';
      this.getRepaymentList(this.id, this.options.tab);
  }

  changeTab(tab) {
      this.activeTab = this.options.tab = tab;
      this.repaymentType = !this.repaymentType;
      this.options.search = '';
      this.options.page = 1;
      this.paginator.pageIndex = 0;
      this.getRepaymentList(this.id, this.options.tab);
  }

  transform(value: any): any {
    const datePipe = new DatePipe('en-IN');
    return datePipe.transform(value, 'MMMM, y');
  }

  search(value) {
    this.options.page = 1;
    this.options.search = value;
    this.getRepaymentList(this.id, this.options.tab);
  }

  openListView() {
  }

  openCalendarView() {
  }

  updateNeftRequest(data, bool) {
  }

  updateNachRequest(data, bool) {
  }

  updateCashChequeRequest(data, bool) {
  }

  getRepaymentList(id, tab) {
    this.loadingSearchData = true;
    this.lmsService.getRepaymentList(id, tab, this.options).subscribe((res: any) => {
        this.loadingSearchData = false;
        this.listData = res;
        this.repaymentList = res.results;
    });
  }

  paginate(data) {
    this.options.page_size = data.pageSize;
    this.options.page = data.pageIndex + 1;
    this.getRepaymentList(this.id, this.options.tab);
}

}
