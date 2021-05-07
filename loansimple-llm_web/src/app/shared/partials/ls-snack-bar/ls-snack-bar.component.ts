import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'kt-ls-snack-bar',
    templateUrl: './ls-snack-bar.component.html',
    styleUrls: ['./ls-snack-bar.component.scss']
})
export class LsSnackBarComponent implements OnInit {

    constructor(
        public snackBarRef: MatSnackBarRef<LsSnackBarComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) { }

    ngOnInit() {
    }

}
