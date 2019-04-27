import { Moment } from 'moment';

export const enum Category {
    Home = 'Home',
    Work = 'Work',
    Personal = 'Personal'
}

export interface ITask {
    id?: number;
    title?: string;
    description?: string;
    category?: Category;
    dueDate?: Moment;
    completed?: boolean;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public category?: Category,
        public dueDate?: Moment,
        public completed?: boolean
    ) {
        this.completed = this.completed || false;
    }
}
