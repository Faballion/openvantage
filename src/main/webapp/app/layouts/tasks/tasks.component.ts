import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatBottomSheet } from '@angular/material';
import { TaskService } from 'app/entities/task';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ITask } from 'app/shared/model/task.model';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
    selector: 'jhi-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['id', 'title', 'category', 'dueDate', 'edit'];
    dataSource: MatTableDataSource<ITask>;
    eventSubscriber: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(protected taskService: TaskService, protected eventManager: JhiEventManager, private bottomSheet: MatBottomSheet) {}

    ngOnInit() {
        this.loadTableData();
        this.registerChangeInTasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    loadTableData() {
        this.taskService.query().subscribe(
            (res: HttpResponse<ITask[]>) => {
                console.log(res.body);
                this.dataSource = new MatTableDataSource(res.body);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            (res: HttpErrorResponse) => console.log(res.message)
        );
    }

    registerChangeInTasks() {
        this.eventSubscriber = this.eventManager.subscribe('taskListModification', response => {
            console.log('CHANGE DETECTED!!!!');
            this.loadTableData();
        });
    }

    updateTask(id: number) {
        this.bottomSheet.open(TaskDetailsComponent, {
            data: { id: id }
        });
    }

    completeTask() {
        console.log('complete');
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
