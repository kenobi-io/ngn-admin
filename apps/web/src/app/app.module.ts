import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from './api/api.module';
import { AppRoutingModule } from './app-routing.module';
import { GrpcCoreModule } from '@ngx-grpc/core';
import { GrpcWebClientModule } from '@ngx-grpc/grpc-web-client';
import { environment } from '@web/env';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ApiModule,
    GrpcCoreModule.forRoot(),
    GrpcWebClientModule.forRoot({
      settings: { host: environment.grpcProxyUrl },
    }),
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
