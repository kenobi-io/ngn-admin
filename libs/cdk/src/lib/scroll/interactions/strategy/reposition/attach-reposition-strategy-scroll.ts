/** Attaches this scroll strategy to an overlay. */
import { InjectionToken } from '@angular/core';
import { Model, Unary, unary } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';

/**
 *
 * @param strategy - config
 * @returns
 */
export const attachRepositionStrategyScroll = <T>(): Unary<
    RepositionStrategyScroll<T>
> =>
    unary((strategy) => {
        // TODO: fix is approach - destructor + spread
        const { overlayRef } = { ...strategy.config };
        strategy.overlayRef = overlayRef;
    });

export const ATTACH_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    Unary<RepositionStrategyScroll<Model>>
>('[ATTACH_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => attachRepositionStrategyScroll(),
});
