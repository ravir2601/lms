import { Component, OnInit, Inject, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { LmsService } from '../../../../lms.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { CommonService } from '../../../../../services/common.service';

@Component({
  selector: 'kt-extra-changes',
  templateUrl: './extra-changes.component.html',
  styleUrls: ['./extra-changes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExtraChangesComponent implements OnInit {

  account_manager_list = [];


  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  @ViewChild('accountManager', { static: true }) account_manager: ElementRef;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private commonService: CommonService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public userData: any,
    private lmsService: LmsService
  ) { }

  ngOnInit() {
    this.getAccountManagerList();
  }

  getAccountManagerList() {
    const info = {
      functionality_code: 'LS-FUNC012',
      pincode: this.userData.business.primary_registered_address.pincode
    };

    this.lmsService.getAccountManagerList(info).subscribe((res: any) => {
      this.account_manager_list = res.data;
      this.account_manager.nativeElement.value = res.data.find(el => el.id === this.userData.account_manager).full_name;
    });
  }

  updateAccountManager(ev) {
    this.userData.account_manager = ev.item.id;
    const data = { account_manager: ev.item.id };
    this.updateExtraChanges(data);
  }

  updateNachDailyTxn() {
    this.userData.is_auto_nach_daily_repayment = !this.userData.is_auto_nach_daily_repayment;
    const data = { is_auto_nach_daily_repayment: this.userData.is_auto_nach_daily_repayment };
    this.updateExtraChanges(data);
  }

  updateExtraChanges(payload) {
    this.lmsService.updateExtraChanges(payload, this.userData.id).subscribe(res => {
      this.commonService.showToast('Update successfully', 'alert-success');
    });
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.account_manager_list
        : this.account_manager_list.filter(v => v.full_name.toLowerCase().indexOf(term.toLowerCase()) > -1))
      ));
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

  resultFormatForManagerList(value: any) {
    return value.full_name;
  }
}
