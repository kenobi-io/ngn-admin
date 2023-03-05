/* eslint-disable unicorn/no-empty-file */
// import {
//    catchError,
//    distinctUntilChanged,
//    MonoTypeOperatorFunction,
//    Observable,
//    of,
// } from 'rxjs';
//
// import { KeyofContextRoute, UseRoute } from '../data';
//
// export const createSubscriptionsRoute = <
//    T extends UseRoute,
//    K extends KeyofContextRoute
// >(
//    useRoute: T,
//    ...operators: MonoTypeOperatorFunction<K>[]
// ): T => {
//    const { context, fields, route, viewRef } = useRoute;
//    useRoute.subscriptions = fields?.map((field) => {
//        const property = field as keyof typeof route;
//
//        return (route[property] as Observable<K>)
//            .pipe(
//                ...(operators as []),
//                distinctUntilChanged(),
//                catchError((e: Error) => {
//                    console.error(e);
//                    return of(e);
//                })
//            )
//            .subscribe((value) => {
//                context && (context[field] = value);
//                viewRef?.markForCheck();
//            });
//    });
//
//    return useRoute;
// };
