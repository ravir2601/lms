import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'kt-cheque-form',
    templateUrl: './cheque-form.component.html',
    styleUrls: ['./cheque-form.component.scss']
})
export class ChequeFormComponent implements OnInit {

    constructor(private bottomSheetRef: MatBottomSheetRef<ChequeFormComponent>) { }

    ngOnInit() {
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}
