import { Unary, unary } from '@core-template';
import { outZone } from '@ngn-template/cdk';
import { fromEvent, Observable, Observer } from 'rxjs';
import { auditTime } from 'rxjs/operators';

import { Scrollable } from '../../../directive';
import { DispatcherScroll } from '../../data';
import { removeGlobalListenerDispatcherScroll } from './remove-global-listener-dispatcher-scroll';

/**
 * Returns an observable that emits an event whenever any of the registered Scrollable
 * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
 * to override the default "throttle" time.
 *
 * **Note:** in order to avoid hitting change detection for every scroll event,
 * all of the events emitted from this stream will be run outside the Angular zone.
 * If you need to update any data bindings as a result of a scroll event, you have
 * to run the callback using `NgZone.run`.
 * @dispatcher auditTimeInMs, globalSubscription, platform, scrolled
 */
export const scrolledDispatcherScroll = <T>(): Unary<DispatcherScroll<T>> =>
    unary((dispatcher) => {
        const { auditTimeInMs, globalSubscription, scrolled } = dispatcher;

        dispatcher.registeredEmitsEvent = new Observable(
            (observer: Observer<Scrollable<T> | void>) => {
                if (!globalSubscription) {
                    addGlobalListenerDispatcherScroll(dispatcher);
                }
                // In the case of a 0ms delay, use an observable without auditTime
                // since it does add a perceptible delay in processing overhead.
                const subscription =
                    auditTimeInMs > 0
                        ? scrolled
                              .pipe(auditTime(auditTimeInMs))
                              .subscribe(observer)
                        : scrolled.subscribe(observer);
                dispatcher.count++;

                return () => {
                    subscription.unsubscribe();
                    dispatcher.count--;

                    if (!dispatcher.count) {
                        removeGlobalListenerDispatcherScroll()(dispatcher);
                    }
                };
            }
        );
    });

/** Sets up the global scroll listeners. */
const addGlobalListenerDispatcherScroll = <T>(
    dispatcher: DispatcherScroll<T>
): void => {
    const { document, ngZone, scrolled } = dispatcher;

    if (ngZone && document) {
        dispatcher.globalSubscription = outZone(ngZone, () => {
            const windowRef = document.defaultView || window;
            return fromEvent(windowRef.document, 'scroll').subscribe(() =>
                scrolled.next()
            );
        });
    }
};
