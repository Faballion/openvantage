import { Moment } from 'moment';

export const enum Category {
    Home = 'Home',
    Work = 'Work',
    Personal = 'Personal'
}

export interface ITask {
    id?: number;
    title?: string;
    description?: Moment;
    category?: Category;
    dueDate?: Moment;
    complete?: boolean;
}

export class Task implements ITask {
    constructor(
        public id?: number,
        public title?: string,
        public description?: Moment,
        public category?: Category,
        public dueDate?: Moment,
        public complete?: boolean
    ) {
        this.complete = this.complete || false;
    }
}
