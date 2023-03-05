import { DispatcherScroll } from '../../data';

/**
 * Registers a scrollable instance with the service and listens for its scrolled events. When the
 * scrollable is scrolled, the service emits the event to its scrolled observable.
 * @dispatcher directive, scrolled, subscriptionsOfDirectives Scrollable instance to be registered.
 */
export const registerDispatcherScroll = <T>(
    dispatcher: DispatcherScroll<T>
): DispatcherScroll<T> => {
    const { directive, scrolled, subscriptionsOfDirectives } = dispatcher;

    if (directive && !subscriptionsOfDirectives.has(directive)) {
        subscriptionsOfDirectives.set(
            directive,
            directive.use.elementScrolled.subscribe(() =>
                scrolled.next(directive)
            )
        );
    }

    return dispatcher;
};
