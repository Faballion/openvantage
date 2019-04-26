import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [BrowserAnimationsModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule],
    exports: [BrowserAnimationsModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule],
    providers: []
})
export class MaterialModule {}
