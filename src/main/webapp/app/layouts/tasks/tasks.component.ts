import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TaskService } from 'app/entities/task';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ITask } from 'app/shared/model/task.model';

@Component({
    selector: 'jhi-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    displayedColumns: string[] = ['id', 'title', 'category', 'dueDate', 'edit'];
    dataSource: MatTableDataSource<ITask>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(protected taskService: TaskService) {}

    ngOnInit() {
        this.loadTableData();
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

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}
