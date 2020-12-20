import { Controller } from '@nestjs/common';

import { Metadata } from 'grpc';

import { 
  AuthServiceControllerSr, 
  AuthServiceControllerMethodsSr, 
  ReqAuthSr, 
  ResAuthSr,
  GetCertStreamReAuthSr,
  StubSr
} from '@api/core/gen';
import { Observable, of } from 'rxjs';
@Controller('auth')
@AuthServiceControllerMethodsSr()
export class AuthController implements AuthServiceControllerSr {

  private readonly resAuth: ResAuthSr = { token: 'asdfasdfasfdasdf'}

  auth(request: ReqAuthSr, metadata: Metadata, ...rest: any): Observable<ResAuthSr> {
    console.log('its work))');
    return of(this.resAuth);
  }
  update(request: StubSr, metadata: Metadata, ...rest: any): Observable<ResAuthSr> {
    throw new Error('Method not implemented.');
  }
  getCertStream(request: StubSr, metadata: Metadata, ...rest: any): Observable<GetCertStreamReAuthSr> {
    throw new Error('Method not implemented.');
  }

}
