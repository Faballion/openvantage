import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
    selector: 'jhi-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
    constructor(private bottomSheet: MatBottomSheet) {}

    ngOnInit() {}

    addTask() {
        this.bottomSheet.open(TaskDetailsComponent, {
            data: { id: null }
        });
    }
}
