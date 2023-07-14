import { InjectionToken } from '@angular/core';
import {
    and,
    Condition,
    condition,
    Model,
    tube,
    Unary,
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

type CRSS<T> = Condition<RepositionStrategyScroll<T>>;
type URSS<T> = Unary<RepositionStrategyScroll<T>>;

/** Enables repositioning of the attached overlay on scroll. */
export const enableRepositionStrategyScroll = <T>(): URSS<T> =>
    unary((strategy) => {
        tube(
            isSubscriptionExist(),
            auditTimeInMs(),
            isSubscriptionExist(),
            scrolledSubscribe()
        )(strategy);
    });

export const ENABLE_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    Unary<RepositionStrategyScroll<Model>>
>('[ENABLE_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => enableRepositionStrategyScroll(),
});

const isSubscriptionExist = <T>(): CRSS<T> =>
    condition((strategy) => !strategy?.subscription);

const auditTimeInMs = <T>(): URSS<T> =>
    unary((strategy) => {
        const { config, dispatcher } = strategy;
        dispatcher.auditTimeInMs = config?.scrollThrottle || 0;
    });

type ScrolledSubscribe<T> = RepositionStrategyScroll<T> & {
    parentRects: Dimension[];
    overlayRect?: DOMRect;
};

type USS<T> = Unary<ScrolledSubscribe<T>>;

const scrolledSubscribe = <T>(): USS<T> =>
    unary((strategy) =>
        tube(
            updateOverlayPosition(),
            canConfigAutoClose(),
            checkAutoClose(),
            and(canConfigAutoClose(), canDisableDetach()),
            disableRepositionStrategyScroll(),
            and(canConfigAutoClose(), canDisableDetach()),
            inNgZone((st) =>
                st.overlayRef ? detachOverlayRef(st.overlayRef) && st : st
            )
        )(strategy)
    );

const updateOverlayPosition = <T>(): URSS<T> =>
    unary(
        (strategy) =>
            strategy.overlayRef && updatePositionOverlayRef(strategy.overlayRef)
    );

const checkAutoClose = <T>(): USS<T> =>
    unary((strategy) => {
        strategy.overlayRect =
            strategy.overlayRef?.overlayElement?.getBoundingClientRect();
        sizeViewportRulerScroll(strategy.viewportRuler);
        const { height, width } = { ...strategy.viewportRuler.viewportSize };
        strategy.parentRects = [
            {
                bottom: height || 0,
                height: height || 0,
                left: 0,
                right: width || 0,
                top: 0,
                width: width || 0,
            },
        ];
    });

const canConfigAutoClose = <T>(): CRSS<T> =>
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
