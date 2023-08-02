import { InjectionToken } from '@angular/core';
import { CapabilityMono, mono } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Attaches this scroll strategy to an overlay. */
export const attachCloseStrategyScroll: CapabilityMono<
    CloseStrategyScroll<unknown>
> = () =>
    mono((strategy) => {
        strategy.overlay = strategy.config?.overlay;
    });

export const ATTACH_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    CapabilityMono<CloseStrategyScroll<unknown>>
>('[ATTACH_CLOSE_STRATEGY_SCROLL]', {
    factory: () => attachCloseStrategyScroll,
});
