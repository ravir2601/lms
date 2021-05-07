import { Component, OnInit } from '@angular/core';
import { UnrService } from '../unr.service';
import { environment } from '../../../environments/environment';
import { UNR_URLS } from '../../../app/constants/static-urls';
import { AddFunctionalityComponent } from './add-functionality/add-functionality.component';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'kt-functionalities',
  templateUrl: './functionalities.component.html',
  styleUrls: ['./functionalities.component.scss']
})
export class FunctionalitiesComponent implements OnInit {

  public baseUrl: string;
  public functionalitiesData: any;
  loadingSearchData: boolean;

  constructor(
    private unrService: UnrService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit() {
    this.baseUrl = environment.api_host + UNR_URLS.functionalities + '?'
    this.loadInitialData();
  }

  loadInitialData() {
    this.unrService.getNextPageData(this.baseUrl).subscribe((res: any) => {
      this.functionalitiesData = res;
    });
  }

  searchUsers(ev) {
    let searchValue = ev.target.value;
    this.loadingSearchData = true;
    this.unrService.getNextPageData(this.baseUrl, null, null, searchValue).subscribe((res: any) => {
      this.functionalitiesData = res;
      this.loadingSearchData = false;
    });
  }

  openFunctionalityForm() {
    let modalRef = this.bottomSheet.open(AddFunctionalityComponent, {
      data: {
        'actionType': 'ADD'
      },
    });

    modalRef.afterDismissed().subscribe(res => {
      if (res === 'sucess') {
        this.loadInitialData();
      }
    });
  }

  updateFunctionalityForm(userDetail) {
    let modalRef = this.bottomSheet.open(AddFunctionalityComponent, {
      data: {
        'info': userDetail,
        'actionType': 'UPDATE'
      },
    });

    modalRef.afterDismissed().subscribe(res => {
      if (res === 'sucess') {
        this.loadInitialData();
      }
    });
  }
}
