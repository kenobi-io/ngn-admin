import { RestApiService } from '@web/api';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Pch } from '../../../chainable/chain';
import { User } from '../../user';
import { Descriptions } from './Descriptions';
import { Descriptor } from './Descriptor';
import { IUserService } from './IUserService';
// import { descriptors } from './descriptors';

// export function addUser<T extends User>(
//   this: Pch<T>,
//   action: {
//     descriptors?: Descriptor[];
//     params?: any[];
//   }
// ): Pch<T>;

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
    service: IUserService;
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

declare global {
  namespace Platform {
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
          // api: RestApiService;
          service: IUserService;
          url: string;
        }
      ): Pch<T>;
    }
  }
}
