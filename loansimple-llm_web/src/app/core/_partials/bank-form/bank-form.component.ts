import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
    selector: 'kt-lead-bank-form',
    templateUrl: './bank-form.component.html',
    styleUrls: ['./bank-form.component.scss']
})
export class BankFormComponent implements OnInit {
    type = '';
    constructor(
        private bottomSheetRef: MatBottomSheetRef
    ) {
    }

    ngOnInit() {
    }

    dismiss(): void {
        this.bottomSheetRef.dismiss();
    }
}
