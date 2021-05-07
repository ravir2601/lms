import { CommonService } from './../../../services/common.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { UnrService } from '../../unr.service';
import { AuthNoticeService } from '../../../core/auth';

@Component({
  selector: 'kt-add-functionality',
  templateUrl: './add-functionality.component.html',
  styleUrls: ['./add-functionality.component.scss']
})
export class AddFunctionalityComponent implements OnInit {
  public permissionsList = [];
  public name: string;
  public selectedPermissions = [];
  unique_code: any;
  permissionsListMap = {};

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private unrService: UnrService,
    private commonService: CommonService,
    private authNoticeService: AuthNoticeService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public infoDataSet: any,
  ) {
  }

  ngOnInit() {
    this.permissionsList = this.unrService.unr_constants.permissions;
    this.evaluteRequest();
  }

  evaluteRequest() {
    if (this.infoDataSet.actionType === 'UPDATE') {
      this.name = this.infoDataSet.info.name;
      this.unique_code = this.infoDataSet.info.code;
      this.selectedPermissions = this.infoDataSet.info.permissions;
      this.evalutePermissionsFields(this.infoDataSet.info.permissions);
    }
  }

  evalutePermissionsFields(arr) {
    arr.forEach(el => {
      this.permissionsListMap[el] = el;
    });
  }

  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }

  addPermissions(ev, currEle) {
    this.unrService.evaluteInsertionForList(ev.target.checked, this.selectedPermissions, currEle.value);
  }

  assignFuctionality() {
    let userPayload = {
      'name': this.name,
      'permissions': this.selectedPermissions,
      'is_for_add': true,
    }

    if (this.infoDataSet.actionType === 'ADD') {
      this.addNewFunctionality(userPayload);
    } else if (this.infoDataSet.actionType === 'UPDATE') {
      this.updateNewFunctionality(userPayload);
    }
  }

    addNewFunctionality(userPayload) {
      this.unrService.addNewFuctionality(userPayload).subscribe((data: any) => {
      this.commonService.showToast('Added successfully', 'alert-success');
      this.bottomSheetRef.dismiss('sucess');
        }, err => {
          if (err.error && err.error.name) {
            this.authNoticeService.setNotice('Name field is required.', 'danger');
          }
        });
    }

    updateNewFunctionality(userPayload) {
      this.unrService.updateNewFuctionality(userPayload, this.infoDataSet.info.id).subscribe((data: any) => {
      this.commonService.showToast('Update successfully', 'alert-success');
      this.bottomSheetRef.dismiss('sucess');
        }, err => {
          if (err.error && err.error.name) {
            this.authNoticeService.setNotice('Name field is required.', 'danger');
          }
        });
  }

  ngOnDestroy() {
    this.authNoticeService.setNotice(null);
  }
}
