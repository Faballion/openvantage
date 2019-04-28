import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
    selector: 'jhi-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
    constructor(private bottomSheetRef: MatBottomSheetRef<TaskDetailsComponent>) {}

    ngOnInit() {}
}
