import { InjectionToken } from '@angular/core';
import { unary, UnParamsUnary } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Attaches this scroll strategy to an overlay. */
export const attachCloseStrategyScroll: UnParamsUnary<
    CloseStrategyScroll<unknown>
> = () =>
    unary((strategy) => {
        strategy.overlay = strategy.config?.overlay;
    });

export const ATTACH_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    UnParamsUnary<CloseStrategyScroll<unknown>>
>('[ATTACH_CLOSE_STRATEGY_SCROLL]', {
    factory: () => attachCloseStrategyScroll,
});
