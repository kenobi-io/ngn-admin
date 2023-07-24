import { InjectionToken } from '@angular/core';
import { unary, UnParamsUnary, unsubscribing } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Disables the closing of the attached overlay on scroll. */
export const disableCloseStrategyScroll: UnParamsUnary<
    CloseStrategyScroll<unknown>
> = () => unary((strategy) => unsubscribing(strategy.scrollSubscriptions));

export const DISABLE_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    UnParamsUnary<CloseStrategyScroll<unknown>>
>('[DISABLE_CLOSE_STRATEGY_SCROLL]', {
    factory: () => disableCloseStrategyScroll,
});
