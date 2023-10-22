import { InjectionToken } from '@angular/core';
import {
    and,
    condition,
    FunctionCondition,
    FunctionMono,
    mono,
    then,
    tube,
} from '@core-template';

import { detachOverlay, updatePositionOverlayRef } from '../../../../overlay';
import { Dimension, inNgZone } from '../../../../platform';
import { RepositionStrategyScroll } from '../../../data';
import { isElementScrolledOutsideView } from '../../clip-scroll';
import { sizeViewportRulerScroll } from '../../scrollable';
import { disableRepositionStrategyScroll } from './disable-reposition-strategy-scroll';

type ScrolledSubscribe<T = unknown> = RepositionStrategyScroll<T> & {
    parentRects: Dimension[];
    overlayRect?: DOMRect;
};

/** Enables repositioning of the attached overlay on scroll. */
export const enableRepositionStrategyScroll: FunctionMono<
    RepositionStrategyScroll<unknown>
> = (finish) =>
    mono((strategy) => {
        tube(
            isSubscriptionExist(),
            then(auditTimeInMs(), scrolledSubscribe())
        )(strategy);
    }, finish);

export const ENABLE_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    FunctionMono<RepositionStrategyScroll<unknown>>
>('[ENABLE_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => enableRepositionStrategyScroll,
});

const isSubscriptionExist: FunctionCondition<RepositionStrategyScroll> = () =>
    condition((strategy) => !strategy?.subscription);

const auditTimeInMs: FunctionMono<ScrolledSubscribe> = () =>
    mono(
        ({ config, dispatcher }) =>
            dispatcher &&
            (dispatcher.auditTimeInMs = config?.scrollThrottle || 0)
    );

const scrolledSubscribe: FunctionMono<ScrolledSubscribe> = () =>
    mono((strategy) =>
        tube(
            updateOverlayPosition(),
            canConfigAutoClose(),
            checkAutoClose(),
            and(canConfigAutoClose(), canDisableDetach()),
            then(disableRepositionStrategyScroll(), inNgZone(detachOverlay()))
        )(strategy)
    );

const updateOverlayPosition: FunctionMono<RepositionStrategyScroll> = () =>
    mono(
        (strategy) =>
            strategy.overlay && updatePositionOverlayRef(strategy.overlay)
    );

const checkAutoClose: FunctionMono<ScrolledSubscribe> = () =>
    mono((strategy) => {
        strategy.overlayRect =
            strategy.overlay?.overlayElement?.getBoundingClientRect();
        sizeViewportRulerScroll(strategy.viewportRulerScroll);
        const { height, width } = {
            ...strategy.viewportRulerScroll.viewportSize,
        };
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

const canConfigAutoClose: FunctionCondition<ScrolledSubscribe> = () =>
    condition((strategy) => !!strategy?.config?.autoClose);

const canDisableDetach: FunctionCondition<ScrolledSubscribe> = () =>
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
