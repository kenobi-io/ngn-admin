import { InjectionToken } from '@angular/core';
import { Model, Unary, unary, unsubscribing } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Disables the closing of the attached overlay on scroll. */
export const disableCloseStrategyScroll = <T>(): Unary<
    CloseStrategyScroll<T>
> => unary((strategy) => unsubscribing(strategy.scrollSubscriptions));

export const DISABLE_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    Unary<CloseStrategyScroll<Model>>
>('[DISABLE_CLOSE_STRATEGY_SCROLL]', {
    factory: () => disableCloseStrategyScroll(),
});
