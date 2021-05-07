import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
    selector: 'kt-lead-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

    constructor(private bottomSheetRef: MatBottomSheetRef<TaskFormComponent>) {
    }

    ngOnInit() {
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }

}
