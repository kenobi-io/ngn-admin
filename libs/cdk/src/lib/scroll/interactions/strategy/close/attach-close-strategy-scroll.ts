import { InjectionToken } from '@angular/core';
import { Model, Unary, unary } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Attaches this scroll strategy to an overlay. */
export const attachCloseStrategyScroll = <T>(): Unary<CloseStrategyScroll<T>> =>
    unary((strategy) => {
        strategy.overlay = strategy.config?.overlay;
    });

export const ATTACH_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    Unary<CloseStrategyScroll<Model>>
>('[ATTACH_CLOSE_STRATEGY_SCROLL]', {
    factory: () => attachCloseStrategyScroll(),
});
