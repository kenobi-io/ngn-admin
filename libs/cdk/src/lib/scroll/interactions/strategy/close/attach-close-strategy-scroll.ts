import { InjectionToken } from '@angular/core';
import { FunctionMono, mono } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Attaches this scroll strategy to an overlay. */
export const attachCloseStrategyScroll: FunctionMono<
    CloseStrategyScroll<unknown>
> = () =>
    mono((strategy) => {
        strategy.overlay = strategy.config?.overlay;
    });

export const ATTACH_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    FunctionMono<CloseStrategyScroll<unknown>>
>('[ATTACH_CLOSE_STRATEGY_SCROLL]', {
    factory: () => attachCloseStrategyScroll,
});
