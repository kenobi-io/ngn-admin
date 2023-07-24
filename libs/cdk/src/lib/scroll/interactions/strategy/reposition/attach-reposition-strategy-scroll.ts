/** Attaches this scroll strategy to an overlay. */
import { InjectionToken } from '@angular/core';
import { unary, UnParamsUnary } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';

/**
 *
 * @param strategy - config
 * @returns
 */
export const attachRepositionStrategyScroll: UnParamsUnary<
    RepositionStrategyScroll<T>
> = (
    finish // TODO: add for all export func finish param and pass to unary
) =>
    unary((strategy) => {
        // TODO: fix is approach - destructor + spread
        const { overlayRef } = { ...strategy.config };
        strategy.overlayRef = overlayRef;
    }, finish);

export const ATTACH_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    UnParamsUnary<RepositionStrategyScroll<unknown>>
>('[ATTACH_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => attachRepositionStrategyScroll,
});
