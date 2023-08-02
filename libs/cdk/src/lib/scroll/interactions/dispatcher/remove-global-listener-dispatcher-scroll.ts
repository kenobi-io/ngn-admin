import { Mono, mono } from '@core-template';

import { DispatcherScroll } from '../../data';

/**
 * Cleans up the global scroll listener.
 * @dispatcher globalSubscription?
 */
export const removeGlobalListenerDispatcherScroll = <T>(): Mono<
    DispatcherScroll<T>
> =>
    mono((dispatcher) => {
        const { globalSubscription } = dispatcher;

        if (globalSubscription) {
            globalSubscription.unsubscribe();
            dispatcher.globalSubscription = undefined;
        }
    });
