import { Unary, unary } from '@core-template';

import { DispatcherScroll } from '../../data';

/**
 * Cleans up the global scroll listener.
 * @dispatcher globalSubscription?
 */
export const removeGlobalListenerDispatcherScroll = <T>(): Unary<
    DispatcherScroll<T>
> =>
    unary((dispatcher) => {
        const { globalSubscription } = dispatcher;

        if (globalSubscription) {
            globalSubscription.unsubscribe();
            dispatcher.globalSubscription = undefined;
        }
    });
