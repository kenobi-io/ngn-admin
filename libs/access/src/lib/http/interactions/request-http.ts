/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest } from '@core-template';
import { pipe } from 'rxjs';

import { UseHttp } from '../data';

const setParamsUseHttp = <T>(use: UseHttp<T>) => {
    const { input, strategy } = use;
    if (strategy) {
        use.params = strategy.changes.map((field) => input[field]) as [];
    } else {
        throw new Error('Strategy http request not initialized');
    }
    return use;
};

const createRequestHttp = <T>(use: UseHttp<T>) => {
    const { context, params, restApi, strategy } = use;
    const method = strategy && strategy.type;

    if (params && method && context) {
        context.$implicit = (restApi[method] as HttpRequest<T>)(...params);
    } else {
        throw new Error(
            'params | method | context http request not initialized'
        );
    }
    return use;
};

/**
 * `Role` creates http request and set result in $implicit as `Observable<T>`
 * @param use
 * @returns `UseHttp` reference
 */
export function requestHttp<T>(use: UseHttp<T>): UseHttp<T> {
    return pipe(setParamsUseHttp, createRequestHttp)(use);
}
