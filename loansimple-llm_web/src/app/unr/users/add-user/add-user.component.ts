import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { UnrService } from '../../unr.service';
import { AuthNoticeService } from '../../../core/auth';
import { Router } from '@angular/router';
import { CommonService } from "../../../services/common.service";

@Component({
  selector: 'kt-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public lastName: string;
  public firstName: string;
  public userName: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef,
    private unrService: UnrService,
    private authNoticeService: AuthNoticeService,
    private router: Router,
    private commonService: CommonService)
  {
  }

  ngOnInit() {
  }

  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }

  addNewUser() {
    let userPayload = {
      'username': this.userName,
      'first_name': this.firstName,
      'last_name': this.lastName
    }

    this.unrService.addNewUser(userPayload).subscribe((data: any) => {
        this.commonService.showToast('User Added successfully', 'alert-success')
        this.router.navigate(['/unr/users/' + data.id + '/detail'])
        this.bottomSheetRef.dismiss();
    }, err => {
      if (err.error && err.error.username) {
        this.authNoticeService.setNotice(err.error.username[0], 'danger');
      }
    });
  }

  ngOnDestroy(){
		this.authNoticeService.setNotice(null);
	}
}
