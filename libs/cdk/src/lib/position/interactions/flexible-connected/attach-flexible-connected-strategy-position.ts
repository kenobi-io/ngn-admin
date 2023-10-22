import { mono, tube, unary } from '@core-template';

import { Overlay } from '../../../overlay';
import { boundingBoxClass } from '../../../platform';
import { changeViewportRulerScroll } from '../../../scroll';
import {
    FlexibleConnectedStrategyPositionCapability,
    MonoStrategyPositionCapability,
    ParamsMonoStrategyPositionCapability,
} from '../../data';
import { applyFlexibleConnectedStrategyPosition } from './apply-flexible-connected-strategy-position';
import { validateFlexibleConnectedStrategyPosition } from './validate-standard-dropdown-flexible-connected-position';

type RF = MonoStrategyPositionCapability<
    Required<FlexibleConnectedStrategyPositionCapability>
>;
type PRF = ParamsMonoStrategyPositionCapability<
    Required<FlexibleConnectedStrategyPositionCapability>,
    Overlay
>;

export const attachFlexibleConnectedStrategyPosition: ParamsMonoStrategyPositionCapability<
    FlexibleConnectedStrategyPositionCapability,
    Overlay
> = (overlay) =>
    unary(
        ({ strategyPosition }) =>
            strategyPosition &&
            tube(
                // validate(overlay),
                validateFlexibleConnectedStrategyPosition(),
                addBoundingBoxClass(),
                setOverlayRef(overlay),
                setStrategyPosition(overlay),
                resizeSubscribe()
            )({ strategyPosition })
    );

const addBoundingBoxClass: RF = () =>
    mono(({ strategyPosition: { overlay } }) => {
        overlay?.hostElement?.classList.add(boundingBoxClass);
    });

const setOverlayRef: PRF = (overlay) =>
    mono(({ strategyPosition }) => (strategyPosition.overlay = overlay));

const setStrategyPosition: PRF = (overlay) =>
    mono(({ strategyPosition }) => {
        strategyPosition.boundingBox = overlay.hostElement;
        strategyPosition.pane = overlay.overlayElement;
        strategyPosition.isDisposed = false;
        strategyPosition.isInitialRender = true;
        strategyPosition.lastPosition = undefined;
    });

const resizeSubscribe: RF = () =>
    mono(
        ({
            strategyPosition,
            strategyPosition: {
                ngZone,
                resizeSubscription,
                viewportRulerScroll,
            },
        }) => {
            if (resizeSubscription && viewportRulerScroll) {
                resizeSubscription.unsubscribe();
                changeViewportRulerScroll()({
                    strategyScroll: { ngZone, viewportRulerScroll },
                });
                if (viewportRulerScroll.timeChange) {
                    strategyPosition.resizeSubscription =
                        viewportRulerScroll.timeChange.subscribe(() => {
                            // When the window is resized, we want to trigger the next reposition as if it
                            // was an initial render, in order for the strategy to pick a new optimal position,
                            // otherwise position locking will cause it to stay at the old one.
                            strategyPosition.isInitialRender = true;
                            applyFlexibleConnectedStrategyPosition()({
                                strategyPosition,
                            });
                        });
                }
            }
        }
    );

// const validate = <T>(): // overlay: OverlayRef<T>
// Condition<FlexibleConnectedStrategyPosition<T>> =>
//     condition((strategyPosition) => {
//         if (strategyPosition) {
//             // const { overlay } = strategyPosition;
//             // if (
//             //     overlay &&
//             //     overlay !== overlay &&
//             //     (typeof ngDevMode === 'undefined' || ngDevMode)
//             // ) {
//             //     throw new Error(
//             //         'This position strategy is already attached to an overlay'
//             //     );
//             // }
//             validateFlexibleConnectedStrategyPosition(strategyPosition);
//             return true;
//         }
//         return false;
//     });
