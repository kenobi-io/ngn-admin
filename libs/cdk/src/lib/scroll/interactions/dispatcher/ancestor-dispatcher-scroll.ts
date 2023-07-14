import { tube, Unary, unary } from '@core-template';
import { filter } from 'rxjs/operators';

import { Scrollable } from '../../../directive';
import { DispatcherScroll } from '../../data';
import { scrolledDispatcherScroll } from './scrolled-dispatcher-scroll';
import { setAncestorContainersDispatcherScroll } from './set-ancestor-containers-dispatcher-scroll';

type AncestorDispatcherScroll<T> = DispatcherScroll<T> & {
    directive?: Scrollable<T>;
    directives?: Scrollable<T>[];
};

/**
 * Returns an observable that emits whenever any of the
 * scrollable ancestors of an element are scrolled.
 * @dispatcher elementOrElementRef Element whose ancestors to listen for.
 * @dispatcher auditTimeInMs Time to throttle the scroll events.
 */
export const ancestorDispatcherScroll = <T>(
    directive: Scrollable<T>
): Unary<AncestorDispatcherScroll<T>> =>
    unary((dispatcher) =>
        tube(
            setAncestorContainersDispatcherScroll(directive),
            scrolledDispatcherScroll(),
            setAncestorEmitsEvent()
        )(dispatcher)
    );

const setAncestorEmitsEvent = <T>(): Unary<AncestorDispatcherScroll<T>> =>
    unary((dispatcher) => {
        const { directives, scrolled } = dispatcher;
        dispatcher.ancestorEmitsEvent = scrolled.pipe(
            filter((target) => {
                return !!(!target || directives?.includes(target));
            })
        );
    });
