import { DispatcherScroll } from '../../data';

/**
 * Cleans up the global scroll listener.
 * @dispatcher globalSubscription?
 */
export const removeGlobalListenerDispatcherScroll = <T>(
    dispatcher: DispatcherScroll<T>
): DispatcherScroll<T> => {
    if (dispatcher.globalSubscription) {
        dispatcher.globalSubscription.unsubscribe();
        dispatcher.globalSubscription = undefined;
    }

    return dispatcher;
};
