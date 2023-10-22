/** Attaches this scroll strategy to an overlay. */
import { InjectionToken } from '@angular/core';
import { FunctionMono, mono } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';

/**
 *
 * @param strategy - config
 * @returns
 */
export const attachRepositionStrategyScroll: FunctionMono<
    RepositionStrategyScroll
> = (
    finish // TODO: add for all export func finish param and pass to unary
) =>
    mono((strategy) => {
        // TODO: fix is approach - destructor + spread
        const { overlay } = { ...strategy.config };
        strategy.overlay = overlay;
    }, finish);

export const ATTACH_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    FunctionMono<RepositionStrategyScroll<unknown>>
>('[ATTACH_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => attachRepositionStrategyScroll,
});
