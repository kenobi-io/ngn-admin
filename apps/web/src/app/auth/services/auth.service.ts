import { Injectable } from '@angular/core';
// import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { from, Observable, of } from 'rxjs';

// import { AuthServiceClientImpl, GrpcWebImpl } from '@api/core';
// import {
//   AuthService as AuthServicePb,
//   AuthServiceClient,
//   ReqAuth,
//   ResAuth,
// } from '@api/core';
// import { grpc } from '@improbable-eng/grpc-web';
// import { GrpcApiService } from '@web/api';
import { ReqAuth, AuthServiceClient } from '@api/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // constructor(private grpcApiService: GrpcApiService) {}
  constructor(private authServiceClient: AuthServiceClient) {}

  // test(data: number): Promise<object> {
  //   const heroById = new HeroById();
  //   heroById.setId(data);
  //   // const meta: Metadata = { 'X-HTTP-Method': 'GET' };
  //   // return this.grpcApiService.unary<HeroById>(
  //   return new Promise((resolve, reject) => {
  //     this.client.getHeroById(heroById, null, (err, response: Hero) => {
  //       console.log('ApiService.get.response', response.toObject());
  //       if (err) {
  //         return reject(err);
  //       }
  //       resolve(response.toObject());
  //     });
  //   });
  //   // );
  // }
  test1() {
    
    // // # try ngx-grpc
    const request = new ReqAuth({
      email: 'kkkkkk@mail.ru',
      password: 'blabla'
    })

    // if (this.receiveAllEvents === false) {
      return this.authServiceClient.auth(request)
    // } else {
    //   this.sub = this.echoClient.$raw.echoOnce(request).subscribe(
    //     event => this.displayGrpcEvent(event),
    //     () => null, // no errors expected in this mode
    //     () => this.displayExampleEvent({ type: ExampleEventType.complete }),
    //   );
    // }

    // // =====================================================================

    // tslint:disable-next-line: no-any
    // console.log('calling client.UserSettings');
    // return of({ email: 'aaa@mail.ru', password: 'g24531' });
    // // # try ts-proto
    // const rpc = new GrpcWebImpl('http://loclahost:4200/api', {
    //   transport: NodeHttpTransport(),
    //   debug: true,
    // });
    // const client = new AuthServiceClientImpl(rpc);
    // console.log('start!!');
    // return client.auth({ email: 'aaa@mail.ru', password: 'g24531' });

    // // =====================================================================

    // // # try improbable-eng + ts proto
    // // 1.
    // const req = new ReqAuth();
    // req.setEmail('aaa@mail.ru');
    // req.setPassword('g24531');
    // const service = new AuthServiceClient('http://0.0.0.0:50051');
    // console.log('AuthServiceClient auth: ', service.auth(req, null));
    // // 2.
    //   const call = ser.auth(req, {'custom-header-1': 'value1'},
    //     (err, response: ResAuth) => {
    //       if (err) {
    //         if (err.code) {
    //           console.log('Error code: ' + err.code + ' "' + err.message + '"');
    //         }
    //       } else {
    //         setTimeout(() => {
    //           console.log(response.getToken());
    //         }, 2000);
    //       }
    //     });
    // call.on('status', (status) => {
    //   if (status.metadata) {
    //     console.log('Received metadata');
    //     console.log(status.metadata);
    //   }
    // });
    // try {
    //   return of(ser.auth(req, null));
    // } catch (error) {
    //   console.log('AuthService error: ', error);
    // }
    // return of(ser.auth(req, null));
    //  // 3.
    //     return of(grpc.invoke(AuthServicePb.auth, {
    //       request: req,
    //       host: 'http://loclahost:4200/api',
    //       // tslint:disable-next-line: no-any
    //       onMessage: (message: any) => {
    //         console.log('got book: ');
    //       },
    //       onEnd: (
    //         code: grpc.Code,
    //         msg: string | undefined,
    //         trailers: grpc.Metadata
    //       ) => {
    //         if (code == grpc.Code.OK) {
    //           console.log('all ok');
    //         } else {
    //           console.log('hit an error', code, msg, trailers);
    //         }
    //       },
    //     }));
  }
}
