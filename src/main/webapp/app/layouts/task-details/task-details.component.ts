import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from 'app/entities/task';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { JhiEventManager } from 'ng-jhipster';

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
        protected eventManager: JhiEventManager,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) {}

    ngOnInit() {
        if (this.data.id) {
            // Edit task
            this.taskService.find(this.data.id).subscribe((res: HttpResponse<ITask>) => {
                console.log(res.body);
                this.taskDetails = res.body;
                this.taskDetailsForm = this.fb.group({
                    title: [this.taskDetails.title],
                    description: [this.taskDetails.description],
                    category: [this.taskDetails.category],
                    dueDate: [this.taskDetails.dueDate],
                    completed: false
                });
            });
        } else {
            // Add task
            this.taskDetailsForm = this.fb.group({
                title: [this.taskDetails.title],
                description: [this.taskDetails.description],
                category: [this.taskDetails.category],
                dueDate: [this.taskDetails.dueDate],
                completed: false
            });
        }
    }

    submitForm() {
        this.taskDetails.title = this.taskDetailsForm.value['title'];
        this.taskDetails.description = this.taskDetailsForm.value['description'];
        this.taskDetails.category = this.taskDetailsForm.value['category'];
        this.taskDetails.dueDate = this.taskDetailsForm.value['dueDate'];
        this.taskDetails.completed = this.taskDetailsForm.value['completed'];

        console.log(this.taskDetails);
        if (this.data.id) {
            // Edit task
            this.taskDetails.id = this.data.id;
            this.taskService.update(this.taskDetails).subscribe(
                (res: HttpResponse<ITask>) => {
                    this.eventManager.broadcast({ name: 'taskListModification' });
                    this.bottomSheetRef.dismiss();
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );
        } else {
            // Add task
            this.taskService.create(this.taskDetails).subscribe(
                (res: HttpResponse<ITask>) => {
                    this.eventManager.broadcast({ name: 'taskListModification' });
                    this.bottomSheetRef.dismiss();
                },
                (res: HttpErrorResponse) => console.log(res.message)
            );
        }
    }

    deleteTask() {
        this.taskService.delete(this.data.id).subscribe((res: HttpResponse<ITask>) => {
            this.eventManager.broadcast({ name: 'taskListModification' });
            this.bottomSheetRef.dismiss();
        });
    }
}
