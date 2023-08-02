import { Mono, mono } from '@core-template';

import { Scrollable } from '../../../directive';
import { DispatcherScroll } from '../../data';

/**
 * De-registers a Scrollable reference and unsubscribes from its scroll event observable.
 * @dispatcher directive, scrollContainers - Scrollable instance to be deregistered.
 */
export const deregisterDispatcherScroll = <T>(
    directive: Scrollable<T>
): Mono<DispatcherScroll<T>> =>
    mono((dispatcher) => {
        const { scrollContainers } = dispatcher;
        const scrollableReference = scrollContainers.get(directive);

        if (scrollableReference) {
            scrollableReference.unsubscribe();
            scrollContainers.delete(directive);
        }
    });
