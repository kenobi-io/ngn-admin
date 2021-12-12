import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { UserModule } from '../../user/user.module';
// import { environment } from '@web/env';

// const GRPC_CLIENTS: FactoryProvider[] = [
//   {
//     provide: HeroServiceClient,
//     useFactory: () => new HeroServiceClient(environment.hostUrl, null, null),
//   },
//   {
//     provide: HSC,
//     useFactory: () => new HSC(environment.hostUrl),
//   },
// ];
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, UserModule],
  exports: [LoginComponent],
  // providers: [...GRPC_CLIENTS],
})
export class LoginModule {}
