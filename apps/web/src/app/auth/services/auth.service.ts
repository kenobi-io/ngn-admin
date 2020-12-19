import { Injectable } from '@angular/core';
// import { HeroById, HeroServiceClient } from '@api/core';
import { HeroServiceClient } from './proto/hero/hero_pb_service';
import { HeroById, Hero } from './proto/hero/hero_pb';
import { GrpcApiService, RestApiService } from '@web/api';
import { Observable } from 'rxjs';
// import { Metadata } from 'grpc-web';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private grpcApiService: GrpcApiService,
    private client: HeroServiceClient,
    private restApiServcie: RestApiService
  ) {}

  // test(data: number): Observable<HeroById.AsObject> {
  //   const heroById = new HeroById();
  //   heroById.setId(data);
  //   const meta: Metadata = { 'X-HTTP-Method': 'GET' };
  //   return this.grpcApiService.unary<HeroById.AsObject>(
  //     this.client.findOne(heroById, meta)
  //   );
  // }
  test(data: number): Promise<object> {
    const heroById = new HeroById();
    heroById.setId(data);
    // const meta: Metadata = { 'X-HTTP-Method': 'GET' };
    // return this.grpcApiService.unary<HeroById>(
    return new Promise((resolve, reject) => {
      this.client.getHeroById(heroById, null, (err, response: Hero) => {
        console.log('ApiService.get.response', response.toObject());
        if (err) {
          return reject(err);
        }
        resolve(response.toObject());
      });
    });
    // );
  }
  test1(): Observable<object> {

    return this.restApiServcie.get('/hero/1');
    // const heroById = new HeroById();
    // heroById.setId(data);
    // return new Promise((resolve, reject) => {
    //   // this.client.getHeroById(heroById, null, (err, response: Hero) => {
    //   //   console.log('ApiService.get.response', response.toObject());
    //   //   if (err) {
    //   //     return reject(err);
    //   //   }
    //   //   resolve(response.toObject());
    //   // });
    // });
  }
}
