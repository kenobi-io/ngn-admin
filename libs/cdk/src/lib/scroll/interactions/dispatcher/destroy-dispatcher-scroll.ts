import { DispatcherScroll } from '../../data';
import { deregisterDispatcherScroll } from './deregister-dispatcher-scroll';
import { removeGlobalListenerDispatcherScroll } from './remove-global-listener-dispatcher-scroll';

/**
 * De-registers a Scrollable reference and unsubscribes from its scroll event observable.
 * @dispatcher scrolled, subscriptionsOfDirectives - Scrollable instance to be deregistered.
 */
export const destroyDispatcherScroll = <T>(
    dispatcher: DispatcherScroll<T>
): DispatcherScroll<T> => {
    const { scrolled, subscriptionsOfDirectives } = dispatcher;
    removeGlobalListenerDispatcherScroll(dispatcher);
    subscriptionsOfDirectives.forEach((_, container) => {
        dispatcher.directive = container;
        deregisterDispatcherScroll(dispatcher);
    });
    scrolled.complete();
    return dispatcher;
};
