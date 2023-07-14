import { InjectionToken } from '@angular/core';
import { Model, Unary, unary } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';

/** Disables repositioning of the attached overlay on scroll. */
export const disableRepositionStrategyScroll = <T>(): Unary<
    RepositionStrategyScroll<T>
> =>
    unary((strategy) => {
        if (strategy.subscription) {
            strategy.subscription.unsubscribe();
            strategy.subscription = undefined;
        }
    });

export const DISABLE_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    Unary<RepositionStrategyScroll<Model>>
>('[DISABLE_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => disableRepositionStrategyScroll(),
});
