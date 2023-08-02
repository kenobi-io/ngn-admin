import { Condition, condition, Mono, tube, unary } from '@core-template';

import { OverlayRef, OverlayRefCapability } from '../../../overlay';
import { boundingBoxClass } from '../../../platform';
import { changeViewportRulerScroll } from '../../../scroll';
import {
    FlexibleConnectedStrategyPosition,
    ParamsCapabilityUnaryFlexibleConnectedStrategyPosition,
} from '../../data';
import { applyFlexibleConnectedStrategyPosition } from './apply-flexible-connected-strategy-position';
import { validateFlexibleConnectedStrategyPosition } from './validate-standard-dropdown-flexible-connected-position';

export const attachFlexibleConnectedStrategyPosition: ParamsCapabilityUnaryFlexibleConnectedStrategyPosition<
    unknown,
    OverlayRefCapability<unknown>
> = ({ overlayRef }) =>
    unary(({ strategyPosition }) => {
        if (strategyPosition) {
            tube(
                validate(overlayRef),
                addBoundingBoxClass(),
                setOverlayRef(),
                setStrategyPosition(),
                resizeSubscribe()
            )(strategyPosition);
        }
    });

const validate = <T>(
    overlayRef: OverlayRef<T>
): Condition<FlexibleConnectedStrategyPosition<T>> =>
    condition((strategyPosition) => {
        if (strategyPosition) {
            const { overlay } = strategyPosition;
            if (
                overlay &&
                overlay.ref !== overlayRef &&
                (typeof ngDevMode === 'undefined' || ngDevMode)
            ) {
                throw new Error(
                    'This position strategy is already attached to an overlay'
                );
            }
            validateFlexibleConnectedStrategyPosition(strategyPosition);
            return true;
        }
        return false;
    });

const addBoundingBoxClass = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
    unary((strategyPosition) => {
        strategyPosition?.overlay?.ref?.hostElement?.classList.add(
            boundingBoxClass
        );
    });

const setOverlayRef = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
    unary((strategyPosition) => {
        strategyPosition?.overlay?.ref &&
            (strategyPosition.overlay.ref = overlayRef);
    });

const setStrategyPosition = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
    unary((strategyPosition) => {
        strategyPosition.boundingBox = overlayRef.hostElement;
        strategyPosition.pane = overlayRef.overlayElement;
        strategyPosition.isDisposed = false;
        strategyPosition.isInitialRender = true;
        strategyPosition.lastPosition = undefined;
    });

const resizeSubscribe = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
    unary((strategyPosition) => {
        const { resizeSubscription, viewportRulerScroll } = strategyPosition;
        if (resizeSubscription && viewportRulerScroll) {
            resizeSubscription.unsubscribe();
            changeViewportRulerScroll()(strategyPosition);
            if (viewportRulerScroll.timeChange) {
                strategyPosition.resizeSubscription =
                    viewportRulerScroll.timeChange.subscribe(() => {
                        // When the window is resized, we want to trigger the next reposition as if it
                        // was an initial render, in order for the strategy to pick a new optimal position,
                        // otherwise position locking will cause it to stay at the old one.
                        strategyPosition.isInitialRender = true;
                        applyFlexibleConnectedStrategyPosition({
                            strategyPosition,
                        });
                    });
            }
        }
    });
