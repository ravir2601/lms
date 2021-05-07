import { ChequeFormComponent } from './cheque-form/cheque-form.component';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { NachFormComponent } from './nach-form/nach-form.component';

@Component({
    selector: 'kt-application-document-signing',
    templateUrl: './document-signing.component.html',
    styleUrls: ['./document-signing.component.scss']
})
export class DocumentSigningComponent implements OnInit {
    constructor(private taskFormBottomSheet: MatBottomSheet) { }

    ngOnInit() {
    }

    openChequeForm() {
        this.taskFormBottomSheet.open(ChequeFormComponent);
    }

    openNachForm() {
        this.taskFormBottomSheet.open(NachFormComponent);
    }
}
