import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EntryRoutingModule } from './entry-routing.module';

@NgModule({
    imports: [CommonModule, HttpClientModule, EntryRoutingModule],
})
export class RemoteEntryModule {}
