import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { TodoSharedLibsModule, TodoSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { MaterialModule } from 'app/core/material.module';

@NgModule({
    imports: [TodoSharedLibsModule, TodoSharedCommonModule, MaterialModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    entryComponents: [JhiLoginModalComponent],
    exports: [TodoSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, MaterialModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoSharedModule {
    static forRoot() {
        return {
            ngModule: TodoSharedModule
        };
    }
}
