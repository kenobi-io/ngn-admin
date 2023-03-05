/* eslint-disable unicorn/no-empty-file */
// import {
//    catchError,
//    distinctUntilChanged,
//    MonoTypeOperatorFunction,
//    Observable,
//    of,
// } from 'rxjs';
//
// import { KeyofContextRouter, UseRouter } from '../data';
//
// export const createSubscriptionsRouter = <
//    T extends UseRouter,
//    K extends KeyofContextRouter
// >(
//    useRouter: T,
//    ...operators: MonoTypeOperatorFunction<K>[]
// ): T => {
//    const { context, fields, router, viewRef } = useRouter;
//    useRouter.subscriptions = fields?.map((field) => {
//        const property = field as keyof typeof router;
//
//        return (router[property] as Observable<K>)
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
//    return useRouter;
// };
