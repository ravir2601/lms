import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'kt-ls-release-notes',
    templateUrl: './ls-release-notes.component.html',
    styleUrls: ['./ls-release-notes.component.scss']
})
export class LsReleaseNotesComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<LsReleaseNotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        console.log(this.data);
    }

}
