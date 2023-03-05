import {
    detachOverlayRef,
    updatePositionOverlayRef,
} from '../../../../overlay';
import { Dimension, inZone } from '../../../../platform';
import { RepositionStrategyScroll } from '../../../data';
import { isElementScrolledOutsideView } from '../../clip-scroll';
import { sizeViewportRulerScroll } from '../../scrollable';
import { disableRepositionStrategyScroll } from './disable-reposition-strategy-scroll';

/** Enables repositioning of the attached overlay on scroll. */
export const enableRepositionStrategyScroll = <T>(
    strategy: RepositionStrategyScroll<T>
): RepositionStrategyScroll<T> => {
    const {
        config,
        dispatcher,
        ngZone,
        overlayRef,
        subscription,
        viewportRuler: viewportRuler,
    } = strategy;

    if (!subscription) {
        dispatcher.auditTimeInMs = config
            ? config.scrollThrottle
                ? config.scrollThrottle
                : 0
            : 0;
        strategy.subscription = dispatcher.scrolled.subscribe(() => {
            // overlayRef.updatePosition();
            if (overlayRef) {
                updatePositionOverlayRef(overlayRef);

                // TODO(crisbeto): make `close` on by default once all components can handle it.
                if (config?.autoClose) {
                    const overlayRect =
                        overlayRef.overlayElement?.getBoundingClientRect();
                    sizeViewportRulerScroll(viewportRuler);
                    // TODO: fix is approach - destructor + spread
                    const { height, width } = { ...viewportRuler.viewportSize };
                    // TODO(crisbeto): include all ancestor scroll containers here once
                    // we have a way of exposing the trigger element to the scroll strategy.
                    const parentRects: Dimension[] = [
                        {
                            bottom: height || 0,
                            height: height || 0,
                            left: 0,
                            right: width || 0,
                            top: 0,
                            width: width || 0,
                        },
                    ];

                    if (
                        overlayRect &&
                        parentRects &&
                        isElementScrolledOutsideView(overlayRect, parentRects)
                    ) {
                        disableRepositionStrategyScroll(strategy);
                        inZone(ngZone, () => detachOverlayRef(overlayRef));
                    }
                }
            }
        });
    }

    return strategy;
};
