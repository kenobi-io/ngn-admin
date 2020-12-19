import { FactoryProvider, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { HeroServiceClient } from '@api/core';
import { HeroServiceClient as HSC } from '../services/proto/hero/hero_pb_service';
import { environment } from '@web/env';

const GRPC_CLIENTS: FactoryProvider[] = [
  {
    provide: HeroServiceClient,
    useFactory: () => new HeroServiceClient(environment.hostUrl, null, null),
  },
  {
    provide: HSC,
    useFactory: () => new HSC(environment.hostUrl),
  },
];
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule],
  exports: [LoginComponent],
  providers: [...GRPC_CLIENTS],
})
export class LoginModule {}
