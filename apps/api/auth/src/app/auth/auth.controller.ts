import { Controller, Get } from '@nestjs/common';

import { Metadata } from 'grpc';

import { 
  AuthServiceController, 
  AuthServiceControllerMethods, 
  ReqAuth, 
  ResAuth,
  GetCertStreamReAuth,
  Stub
} from '@api/core/gen';
import { Observable, of } from 'rxjs';
@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {

  private readonly resAuth: ResAuth = { token: 'Grpc work))'}

  @Get()
  gettering(): string {
    console.log('Rest work))');
    return 'Rest work))';
  }

  auth(request: ReqAuth, metadata: Metadata, ...rest: any): Observable<ResAuth> {
    console.log('its work))');
    return of(this.resAuth);
  }
  update(request: Stub, metadata: Metadata, ...rest: any): Observable<ResAuth> {
    throw new Error('Method not implemented.');
  }
  getCertStream(request: Stub, metadata: Metadata, ...rest: any): Observable<GetCertStreamReAuth> {
    throw new Error('Method not implemented.');
  }

}
