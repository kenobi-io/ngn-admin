import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestApiService } from './services/rest-api.service';
import { GrpcApiService } from './services/grpc-api.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[RestApiService, GrpcApiService]
})
export class ApiModule { }
