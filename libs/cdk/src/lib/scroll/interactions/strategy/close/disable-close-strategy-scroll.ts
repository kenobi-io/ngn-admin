import { InjectionToken } from '@angular/core';
import { FunctionMono, mono, unsubscribing } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Disables the closing of the attached overlay on scroll. */
export const disableCloseStrategyScroll: FunctionMono<
    CloseStrategyScroll<unknown>
> = () => mono((strategy) => unsubscribing(strategy.scrollSubscriptions));

export const DISABLE_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    FunctionMono<CloseStrategyScroll<unknown>>
>('[DISABLE_CLOSE_STRATEGY_SCROLL]', {
    factory: () => disableCloseStrategyScroll,
});
