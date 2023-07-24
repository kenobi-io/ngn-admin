/* eslint-disable no-unused-vars */
import { inject, InjectionToken } from '@angular/core';
import {
    Condition,
    condition,
    finish,
    Model,
    tube,
    Unary,
    unary,
} from '@core-template';
import { Subscription } from 'rxjs';

import { updatePositionOverlayRef } from '../../../../overlay';
import { inZone } from '../../../../platform';
import { hasAttached } from '../../../../portal';
import { CloseStrategyScroll } from '../../../data';
import { scrolledDispatcherScroll } from '../../dispatcher';
import { positionViewportRulerScroll } from '../../scrollable';
import { detachCloseStrategyScroll } from './detach-close-strategy-scroll';
import { DISABLE_CLOSE_STRATEGY_SCROLL } from './disable-close-strategy-scroll';

type CCS<T> = Condition<CloseStrategyScroll<T>>;
type UCS<T> = Unary<CloseStrategyScroll<T>>;

/** Enables the closing of the attached overlay on scroll. */
export const enableCloseStrategyScroll = <T>(): UCS<T> =>
    unary((strategy) => {
        const { scrollSubscriptions } = strategy;
        /** Detaches the overlay ref and disables the scroll strategy. */
        const scrollSubscription: Subscription | undefined = new Subscription();

        tube(
            isLengthGreatThan(scrollSubscriptions?.length),
            thenFinished(),
            auditTimeInMsDispatcher(),
            isThrottleGreatThan(1),
            registeredEmitsEventSubscribe(scrollSubscription),
            isThrottleGreatThan('not', 1),
            detachRegisteredEmitsEventSubscribe(scrollSubscription),
            scrollSubscriptionsPush(scrollSubscription)
        )(strategy);
    });

export const ENABLE_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    Unary<CloseStrategyScroll<Model>>
>('[ENABLE_CLOSE_STRATEGY_SCROLL]', {
    factory: () => enableCloseStrategyScroll(),
});

const detach = <T>(): UCS<T> =>
    unary((strategy) => {
        const { ngZone, overlay } = strategy;
        const disableCloseStrategyScroll = inject(
            // TODO: fix inject because throw error outside construct
            DISABLE_CLOSE_STRATEGY_SCROLL
        );
        tube(
            disableCloseStrategyScroll(),
            () => hasAttached(overlay?.portal),
            (st: CloseStrategyScroll<T>) =>
                inZone(ngZone, () => detachCloseStrategyScroll()(st))
        )(strategy);
    });

type ThrottleGreatThen = {
    <T>(count: number): CCS<T>;
    <T>(matcher: 'not', count: number): CCS<T>;
};

const isThrottleGreatThan: ThrottleGreatThen = (
    matcher: unknown,
    count?: number
) =>
    condition((strategy) => {
        const isGreat = !!(
            count &&
            strategy &&
            strategy.config?.threshold &&
            strategy.config.threshold > count
        );
        return matcher === 'not' ? !isGreat : isGreat;
    });

const isLengthGreatThan = <T>(length?: number): CCS<T> =>
    condition(() => !!(length && length > 0));

const thenFinished = <T>(): UCS<T> => unary((strategy) => strategy, finish);

const auditTimeInMsDispatcher = <T>(): UCS<T> =>
    unary((strategy) => {
        const { dispatcher } = strategy;
        dispatcher.auditTimeInMs = 0;
        scrolledDispatcherScroll()(dispatcher);
    });

const scrollSubscriptionsPush = <T>(
    scrollSubscription?: Subscription
): UCS<T> =>
    unary((strategy) => {
        const { scrollSubscriptions } = strategy;
        scrollSubscription && scrollSubscriptions?.push(scrollSubscription);
    });

const detachRegisteredEmitsEventSubscribe = <T>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    scrollSubscription?: Subscription
): UCS<T> =>
    unary((strategy) => {
        const { dispatcher } = strategy;
        scrollSubscription = dispatcher.registeredEmitsEvent?.subscribe(() =>
            detach()(strategy)
        );
    });

const registeredEmitsEventSubscribe = <T>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    scrollSubscription?: Subscription
): UCS<T> =>
    unary((strategy) => {
        const { config, dispatcher, overlay, viewportRuler } = strategy;
        const { threshold } = { ...config };
        positionViewportRulerScroll(viewportRuler);
        const { startPosition } = viewportRuler;

        if (startPosition) {
            strategy.initialScrollPosition = startPosition.top;
            scrollSubscription = dispatcher.registeredEmitsEvent?.subscribe(
                () => {
                    positionViewportRulerScroll(viewportRuler);
                    const { top } = startPosition;

                    if (
                        threshold &&
                        strategy.initialScrollPosition &&
                        Math.abs(top - strategy.initialScrollPosition) >
                            threshold
                    ) {
                        detach()(strategy);
                    } else if (overlay) {
                        updatePositionOverlayRef(overlay.ref);
                    }
                }
            );
        }
    });
