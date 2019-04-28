import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-task-details',
    templateUrl: './task-details.component.html',
    styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
    taskDetailsForm: FormGroup;
    taskDetails: ITask = {};

    constructor(
        private bottomSheetRef: MatBottomSheetRef<TaskDetailsComponent>,
        protected taskService: TaskService,
        private fb: FormBuilder,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.taskDetailsForm = this.fb.group({
            title: [this.taskDetails.title],
            description: [this.taskDetails.description],
            category: [this.taskDetails.category],
            dueDate: [this.taskDetails.dueDate],
            completed: true
        });
    }

    submitForm() {
        this.taskDetails.title = this.taskDetailsForm.value['title'];
        this.taskDetails.description = this.taskDetailsForm.value['description'];
        this.taskDetails.category = this.taskDetailsForm.value['category'];
        // this.taskDetails.dueDate = this.datePipe.transform(this.taskDetailsForm.value['dueDate'], 'yyyy-MM-DD');
        this.taskDetails.dueDate = this.taskDetailsForm.value['dueDate'];
        this.taskDetails.completed = this.taskDetailsForm.value['completed'];
        console.log(this.taskDetails);
        this.taskService.create(this.taskDetails).subscribe(
            (res: HttpResponse<ITask>) => {
                console.log(res.body);
                this.bottomSheetRef.dismiss();
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
    }
}
