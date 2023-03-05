import { filter } from 'rxjs/operators';

import { DispatcherScroll } from '../../data';
import { scrolledDispatcherScroll } from './scrolled-dispatcher-scroll';
import { setAncestorContainersDispatcherScroll } from './set-ancestor-containers-dispatcher-scroll';

/**
 * Returns an observable that emits whenever any of the
 * scrollable ancestors of an element are scrolled.
 * @dispatcher elementOrElementRef Element whose ancestors to listen for.
 * @dispatcher auditTimeInMs Time to throttle the scroll events.
 */
export const ancestorDispatcherScroll = <T>(
    dispatcher: DispatcherScroll<T>
): DispatcherScroll<T> => {
    const { directives, scrolled } = dispatcher;

    if (directives) {
        setAncestorContainersDispatcherScroll(dispatcher);
        scrolledDispatcherScroll(dispatcher);
        dispatcher.ancestorEmitsEvent = scrolled.pipe(
            filter((target) => {
                return !target || directives.includes(target);
            })
        );
    }

    return dispatcher;
};
