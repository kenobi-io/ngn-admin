import { inject, InjectionToken } from '@angular/core';
import { tube, unary, UnParamsUnary } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';
import { DISABLE_REPOSITION_STRATEGY_SCROLL } from './disable-reposition-strategy-scroll';

export const detachRepositionStrategyScroll: UnParamsUnary<
    RepositionStrategyScroll<unknown>
> = (finish) =>
    unary((strategy) => {
        const disableRepositionStrategyScroll = inject(
            DISABLE_REPOSITION_STRATEGY_SCROLL
        );
        tube(
            disableRepositionStrategyScroll(),
            (st) => (st.overlayRef = undefined)
        )(strategy);
    }, finish);

export const DETACH_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    UnParamsUnary<RepositionStrategyScroll<unknown>>
>('[DETACH_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => detachRepositionStrategyScroll,
});
