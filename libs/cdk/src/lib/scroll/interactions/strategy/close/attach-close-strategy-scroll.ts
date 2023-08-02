import { InjectionToken } from '@angular/core';
import { CapabilityMono, unary } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Attaches this scroll strategy to an overlay. */
export const attachCloseStrategyScroll: CapabilityMono<
    CloseStrategyScroll<unknown>
> = () =>
    unary((strategy) => {
        strategy.overlay = strategy.config?.overlay;
    });

export const ATTACH_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    CapabilityMono<CloseStrategyScroll<unknown>>
>('[ATTACH_CLOSE_STRATEGY_SCROLL]', {
    factory: () => attachCloseStrategyScroll,
});
