/* eslint-disable @typescript-eslint/no-unused-vars */
import { Observable } from 'rxjs';

import { UseHttp } from '../data';
/*
export type ContextCreateHttp<T> = Bounden<UseHttp<T>, 'data'>;*/

export const contextCreateHttp = <T>(use: UseHttp<T>): UseHttp<T> => {
    const { context } = use;
    context
        ? (context.$implicit = new Observable<T>())
        : (use.context = {
              $implicit: new Observable<T>(),
              get data() {
                  return this.$implicit;
              },
          });
    return use;
};
