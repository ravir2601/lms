import { Component, OnInit } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'kt-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ContactFormComponent>) { }

  ngOnInit() {
  }

  dismiss() {
    this.bottomSheetRef.dismiss();
  }

}
