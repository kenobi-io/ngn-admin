import { DispatcherScroll } from '../../data';

/**
 * De-registers a Scrollable reference and unsubscribes from its scroll event observable.
 * @dispatcher directive, subscriptionsOfDirectives - Scrollable instance to be deregistered.
 */
export const deregisterDispatcherScroll = <T>(
    dispatcher: DispatcherScroll<T>
): DispatcherScroll<T> => {
    const { directive, subscriptionsOfDirectives } = dispatcher;

    if (directive) {
        const scrollableReference = subscriptionsOfDirectives.get(directive);

        if (scrollableReference) {
            scrollableReference.unsubscribe();
            subscriptionsOfDirectives.delete(directive);
        }
    }

    return dispatcher;
};
