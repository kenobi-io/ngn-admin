import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Entry1RoutingModule } from './entry-routing.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, Entry1RoutingModule],
})
export class RemoteEntryModule {}
