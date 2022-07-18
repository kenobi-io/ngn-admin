/* eslint-disable @typescript-eslint/ban-types */
import { lapi } from '@relax';
import { catchError, MonoTypeOperatorFunction, Observable, of } from 'rxjs';

import { unsubscribeFromAll } from '../../directive';
import { OptionHttp } from '../option-http';
import { UseHttp } from '../use-http';

/**
 * `Role` creates http request. Subscribe on result after unsubscribe automation.
 * @param useHttp
 * @param operators
 * @returns `Use` reference
 */
export function request<T extends UseHttp, Result>(
    useHttp: T,
    ...operators: MonoTypeOperatorFunction<Result>[]
): T {
    if (useHttp.strategy) {
        lapi(
            (useHttp: T) => {
                const { optionHttp, strategy } = useHttp;
                useHttp.params = strategy?.changes.map(
                    (field) => optionHttp[field]
                ) as [];

                return useHttp;
            },
            unsubscribeFromAll,
            (useHttp: T) => {
                const { context, params, strategy, subscriptions, viewRef } =
                    useHttp;
                const methodName = strategy ? strategy.type : 'request'; // TODO: add request to strategy http

                const method = useHttp.http[methodName] as unknown as (
                    ...params: OptionHttp[]
                ) => Observable<Result>;

                if (params) {
                    const subscription = method(...params)
                        .pipe(
                            ...(operators as []),
                            catchError((e: Error) => {
                                console.error(e);
                                return of(e);
                            })
                        )
                        .subscribe((data: unknown) => {
                            context && (context.$implicit = data);
                            viewRef?.markForCheck();
                        });
                    subscriptions?.push(subscription);
                }

                return useHttp;
            }
        )(useHttp);
    }

    return useHttp;
}
