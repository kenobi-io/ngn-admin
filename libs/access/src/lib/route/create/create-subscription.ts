import { distinctUntilChanged, Observable, Subscription } from 'rxjs';

import { KeyofContextRoute } from '../context-route';
import { UseRoute } from '../use-route';

export const createsSubscription = <T extends UseRoute>(useRoute: T): T => {
    const { context, fields, route, viewRef } = useRoute;
    useRoute.subscriptions = fields?.map((field) => {
        type KeyofActiveRoute = keyof typeof route;
        const property = field as KeyofActiveRoute;

        return (route[property] as Observable<KeyofContextRoute>)
            .pipe(distinctUntilChanged())
            .subscribe((value) => {
                context && (context[field] = value);
                viewRef?.markForCheck();
            });
    }) as Subscription[] | null;

    return useRoute;
};
