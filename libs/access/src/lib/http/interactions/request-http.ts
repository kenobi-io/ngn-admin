/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest } from '@core-template';
import { lapi } from '@relax';
import { catchError, MonoTypeOperatorFunction, of } from 'rxjs';

import { unsubscribeFromAll } from '../../directive';
import { UseHttp } from '../data';

/**
 * `Role` creates http request. Subscribe on result after unsubscribe automation.
 * @param useHttp
 * @param operators
 * @returns `Use` reference
 */
export function requestHttp<T extends UseHttp, K>(
    useHttp: T,
    ...operators: MonoTypeOperatorFunction<K>[]
): T {
    if (useHttp.strategy) {
        lapi(
            (useHttp: T) => {
                const { input, strategy } = useHttp;
                useHttp.params = strategy?.changes.map(
                    (field) => input[field]
                ) as [];

                return useHttp;
            },
            unsubscribeFromAll,
            (useHttp: T) => {
                const {
                    context,
                    httpClient,
                    params,
                    strategy,
                    subscriptions,
                    viewRef,
                } = useHttp;
                const method = strategy && strategy.type;

                if (params && method) {
                    const sub = (httpClient[method] as HttpRequest<K>)(
                        ...params
                    )
                        .pipe(
                            ...(operators as []),
                            catchError((e: Error) => {
                                console.error(e);
                                return of(e);
                            })
                        )
                        .subscribe((data: K | Error) => {
                            context && (context.$implicit = data);
                            viewRef?.markForCheck();
                        });
                    subscriptions?.push(sub);
                }

                return useHttp;
            }
        )(useHttp);
    }

    return useHttp;
}
