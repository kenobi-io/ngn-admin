import { InjectionToken } from '@angular/core';
import {
    and,
    CapabilityMono,
    Condition,
    condition,
    Mono,
    then,
    tube,
    unary,
} from '@core-template';

import {
    detachOverlayRef,
    updatePositionOverlayRef,
} from '../../../../overlay';
import { Dimension, inNgZone } from '../../../../platform';
import { RepositionStrategyScroll } from '../../../data';
import { isElementScrolledOutsideView } from '../../clip-scroll';
import { sizeViewportRulerScroll } from '../../scrollable';
import { disableRepositionStrategyScroll } from './disable-reposition-strategy-scroll';

type ScrolledSubscribe<T> = RepositionStrategyScroll<T> & {
    parentRects: Dimension[];
    overlayRect?: DOMRect;
};

/** Enables repositioning of the attached overlay on scroll. */
export const enableRepositionStrategyScroll: CapabilityMono<
    RepositionStrategyScroll<unknown>
> = (finish) =>
    unary((strategy) => {
        tube(
            isSubscriptionExist(),
            then(auditTimeInMs(), scrolledSubscribe())
        )(strategy);
    }, finish);

export const ENABLE_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    CapabilityMono<RepositionStrategyScroll<unknown>>
>('[ENABLE_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => enableRepositionStrategyScroll,
});

const isSubscriptionExist = <T>(): Condition<RepositionStrategyScroll<T>> =>
    condition((strategy) => !strategy?.subscription);

const auditTimeInMs = <T>(): Mono<ScrolledSubscribe<T>> =>
    unary((strategy) => {
        const { config, dispatcher } = strategy;
        dispatcher.auditTimeInMs = config?.scrollThrottle || 0;
    });

const scrolledSubscribe = <T>(): Mono<ScrolledSubscribe<T>> =>
    unary((strategy) =>
        tube(
            updateOverlayPosition(),
            canConfigAutoClose(),
            checkAutoClose(),
            and(canConfigAutoClose(), canDisableDetach()),
            disableRepositionStrategyScroll<T>(),
            and(canConfigAutoClose(), canDisableDetach()),
            inNgZone(detachOverlayRef<T, ScrolledSubscribe<T>>())
        )(strategy)
    );

const updateOverlayPosition = <T>(): Mono<RepositionStrategyScroll<T>> =>
    unary(
        (strategy) =>
            strategy.overlayRef && updatePositionOverlayRef(strategy.overlayRef)
    );

const checkAutoClose = <T>(): Mono<ScrolledSubscribe<T>> =>
    unary((strategy) => {
        strategy.overlayRect =
            strategy.overlayRef?.overlayElement?.getBoundingClientRect();
        sizeViewportRulerScroll(strategy.viewportRuler);
        const { height, width } = { ...strategy.viewportRuler.viewportSize };
        strategy.parentRects = [
            {
                bottom: height ?? 0,
                height: height ?? 0,
                left: 0,
                right: width ?? 0,
                top: 0,
                width: width ?? 0,
            },
        ];
    });

const canConfigAutoClose = <T>(): Condition<RepositionStrategyScroll<T>> =>
    condition((strategy) => !!strategy?.config?.autoClose);

const canDisableDetach = <T>(): Condition<ScrolledSubscribe<T>> =>
    condition(
        (strategy) =>
            !!(
                strategy?.overlayRect &&
                strategy?.parentRects &&
                isElementScrolledOutsideView(
                    strategy.overlayRect,
                    strategy.parentRects
                )
            )
    );
