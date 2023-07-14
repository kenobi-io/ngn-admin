import { Unary, unary } from '@core-template';

import { Scrollable } from '../../../directive';
import { DispatcherScroll } from '../../data';

/**
 * Registers a scrollable instance with the service and listens for its scrolled events. When the
 * scrollable is scrolled, the service emits the event to its scrolled observable.
 * @dispatcher directive, scrolled, scrollContainers Scrollable instance to be registered.
 */
export const registerDispatcherScroll = <T>(
    directive: Scrollable<T>
): Unary<DispatcherScroll<T>> =>
    unary((dispatcher) => {
        const { scrollContainers, scrolled } = dispatcher;

        if (!scrollContainers.has(directive)) {
            scrollContainers.set(
                directive,
                directive.elementScrolled.subscribe(() =>
                    scrolled.next(directive)
                )
            );
        }
    });
