import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'kt-business-reference-form',
  templateUrl: './business-reference-form.component.html',
  styleUrls: ['./business-reference-form.component.scss']
})
export class BusinessReferenceFormComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<BusinessReferenceFormComponent>) { }

  ngOnInit() {
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

}
