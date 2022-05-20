import { RestApiService } from '@web/api';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Pch } from '../../../chainable/chain';
import { User } from '../../user';
import { Descriptions } from './descriptions';
import { Descriptor } from './descriptor';
import { IUserService } from './iuser-service';
// import { descriptors } from './descriptors';

// export function addUser<T extends User>(
//   this: Pch<T>,
//   action: {
//     descriptors?: Descriptor[];
//     params?: any[];
//   }
// ): Pch<T>;
declare namespace Platform {
  interface Chainable<T> {
    addUser<T extends User>(
      this: Pch<T>,
      action: {
        descriptors?: Descriptor[];
        params?: any[];
        getUser?: (model?: T) => T;
        map?: Descriptions;
      },
      options?: {
        service: IUserService<T>;
        url: string;
      }
    ): Pch<T>;
  }
}
export function addUser<T extends Partial<User>>(
  this: Pch<T>,
  action: {
    descriptors?: Descriptor[];
    params?: any[];
    getUser?: (model?: T) => T;
    map?: Descriptions;
  },
  options?: {
    // api: RestApiService;
    service: IUserService<T>;
    url: string;
  }
): Pch<T> {
  let result;
  if (action.getUser) {
    // this.observable = options.api
    //   .post('/user', action.getUser(this.model))
    //   .pipe(
    //     map((res: Response) => res.status === 200),
    //     map(() => this.model)
    //   );
    this.observable = options.service.getUser(options.url);
    result = action.getUser(this.model);
  }
  // else if (action.descriptors) {
  //   const first = 0;
  //   const second = 1;
  //   if (action.map) {
  //     const elements = action.map.get(action.descriptors[first])(
  //       action.params[first]
  //     );
  //     result = action.map.get(action.descriptors[second])(elements);
  //   } else {
  //     const elements = descriptors.get(action.descriptors[first])(
  //       action.params[first]
  //     );
  //     result = descriptors.get(action.descriptors[second])(elements);
  //   }
  // }
  return chain(result);
}

// declare namespace Busapi {
// declare namespace BusApi {
// declare namespace Busiapi {
// declare namespace BusiApi {
// declare namespace BusLogic {
// declare namespace BusiLogic {
// declare namespace BusinessLogic {
declare namespace BusinessLogic {
  interface Chainable<T> {
    addUser<T extends User>(
      this: Pch<T>,
      action: {
        descriptors?: Descriptor[];
        params?: any[];
        getUser?: (model?: T) => T;
        map?: Descriptions;
      },
      options?: {
        service: IUserService<T>;
        url: string;
      }
    ): Pch<T>;
  }

  // // ===============================
  // import { addUser } from '@busapi/core';

  // interface Core<T> {}
  // // ===============================
  // import { addUser } from '@busiapi/client';
  // import { addUser } from '@busiapi/server';
  // import { addUser } from '@busiapi/bff';

  // interface Client<T> {}
  // interface Bff<T> {}
  // interface Server<T> {}

  // // ===============================
  // import { addUser } from '@bus-logic/front-end';
  // import { addUser } from '@bus-logic/back-end';
  // import { addUser } from '@bus-logic/bff';

  // interface Frontend<T> {}
  // interface Bff<T> {}
  // interface Backend<T> {}

  // // ===============================
  // import { addUser } from '@busi-logic/front';
  // import { addUser } from '@busi-logic/back';
  // import { addUser } from '@busi-logic/bff';

  // interface Front<T> {}
  // interface Bff<T> {}
  // interface Back<T> {}

  // // ===============================
  // import { addUser } from '@business-logic/web';
  // import { addUser } from '@business-logic/api';
  // import { addUser } from '@business-logic/bff';

  // interface Web<T> {}
  // interface Api<T> {}
  // interface Bff<T> {}
  // // ===============================
}
