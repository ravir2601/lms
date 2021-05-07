import {Component, OnInit} from '@angular/core';
import {TaskFormComponent} from './task-form/task-form.component';
import {MatBottomSheet} from '@angular/material';

@Component({
    selector: 'kt-lead-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

    constructor(
        private taskFormBottomSheet: MatBottomSheet,
    ) {
    }

    ngOnInit() {
    }

    openTaskForm(): void {
        this.taskFormBottomSheet.open(TaskFormComponent);
    }

}
