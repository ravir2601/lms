import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { UnrService } from '../../unr.service';

@Component({
  selector: 'kt-action-histories-popup',
  templateUrl: './action-histories-popup.component.html',
  styleUrls: ['./action-histories-popup.component.scss']
})
export class ActionHistoriesPopupComponent implements OnInit {

  actionHistoriesList: object;
  pageNumber: number = 0;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public userId: any,
    private bottomSheetRef: MatBottomSheetRef,
    private unrService: UnrService,
  ) { }

  ngOnInit() {
    this.loadActionHistories();
  }

  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }

  loadActionHistories() {
    this.unrService.userCurrentActionHistories(this.userId).subscribe((res: any) => {
      this.actionHistoriesList = res;
    });
  }
}
