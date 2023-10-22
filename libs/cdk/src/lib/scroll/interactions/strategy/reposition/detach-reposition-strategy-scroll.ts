import { inject, InjectionToken } from '@angular/core';
import { FunctionMono, mono, tube } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';
import { DISABLE_REPOSITION_STRATEGY_SCROLL } from './disable-reposition-strategy-scroll';

export const detachRepositionStrategyScroll: FunctionMono<
    RepositionStrategyScroll<unknown>
> = (finish) =>
    mono((strategy) => {
        const disableRepositionStrategyScroll = inject(
            DISABLE_REPOSITION_STRATEGY_SCROLL
        );
        tube(
            disableRepositionStrategyScroll(),
            (st) => (st.overlay = undefined)
        )(strategy);
    }, finish);

export const DETACH_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    FunctionMono<RepositionStrategyScroll<unknown>>
>('[DETACH_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => detachRepositionStrategyScroll,
});
