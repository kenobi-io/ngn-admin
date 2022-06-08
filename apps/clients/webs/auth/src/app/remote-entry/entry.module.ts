import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RegComponent } from '../reg/reg.component';
import { Entry1RoutingModule } from './entry-routing.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        RegComponent,
        Entry1RoutingModule,
    ],
    providers: [],
})
export class RemoteEntryModule {}
