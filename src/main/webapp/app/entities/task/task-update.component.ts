import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { ITask } from 'app/shared/model/task.model';
import { TaskService } from './task.service';

@Component({
    selector: 'jhi-task-update',
    templateUrl: './task-update.component.html'
})
export class TaskUpdateComponent implements OnInit {
    task: ITask;
    isSaving: boolean;
    dueDateDp: any;

    constructor(protected taskService: TaskService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ task }) => {
            this.task = task;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.task.id !== undefined) {
            this.subscribeToSaveResponse(this.taskService.update(this.task));
        } else {
            this.subscribeToSaveResponse(this.taskService.create(this.task));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITask>>) {
        result.subscribe((res: HttpResponse<ITask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
