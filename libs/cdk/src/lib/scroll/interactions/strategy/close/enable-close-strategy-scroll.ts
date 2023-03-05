import { Subscription } from 'rxjs';

import { updatePositionOverlayRef } from '../../../../overlay';
import { inZone } from '../../../../platform';
import { hasAttached } from '../../../../portal';
import { CloseStrategyScroll } from '../../../data';
import { scrolledDispatcherScroll } from '../../dispatcher';
import { positionViewportRulerScroll } from '../../scrollable';
import { detachCloseStrategyScroll } from './detach-close-strategy-scroll';
import { disableCloseStrategyScroll } from './disable-close-strategy-scroll';

/** Enables the closing of the attached overlay on scroll. */
export const enableCloseStrategyScroll = <T>(
    strategy: CloseStrategyScroll<T>
): CloseStrategyScroll<T> => {
    const {
        config,
        dispatcher: dispatcherScroll,
        ngZone,
        overlay,
        scrollSubscriptions,
        viewportRuler: viewportRulerScroll,
    } = strategy;
    /** Detaches the overlay ref and disables the scroll strategy. */
    const detach = (): void => {
        disableCloseStrategyScroll(strategy);

        if (hasAttached(overlay?.portal)) {
            inZone(ngZone, () => detachCloseStrategyScroll(strategy));
        }
    };
    const length = scrollSubscriptions?.length;

    if (length && length > 0) {
        return strategy;
    }
    let scrollSubscription: Subscription | undefined;
    dispatcherScroll.auditTimeInMs = 0;
    scrolledDispatcherScroll(dispatcherScroll);

    if (config && config.threshold > 1) {
        const { threshold } = config;
        positionViewportRulerScroll(viewportRulerScroll);
        const { startPosition } = viewportRulerScroll;

        if (startPosition) {
            strategy.initialScrollPosition = startPosition.top;
            scrollSubscription =
                dispatcherScroll.registeredEmitsEvent?.subscribe(() => {
                    positionViewportRulerScroll(viewportRulerScroll);
                    const { top } = startPosition;

                    if (
                        strategy.initialScrollPosition &&
                        Math.abs(top - strategy.initialScrollPosition) >
                            threshold
                    ) {
                        detach();
                    } else if (overlay) {
                        updatePositionOverlayRef(overlay.ref);
                    }
                });
        }
    } else {
        scrollSubscription =
            dispatcherScroll.registeredEmitsEvent?.subscribe(detach);
    }
    scrollSubscription && scrollSubscriptions?.push(scrollSubscription);

    return strategy;
};
