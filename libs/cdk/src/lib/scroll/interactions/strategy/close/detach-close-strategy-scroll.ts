import { inject, InjectionToken } from '@angular/core';
import { tube, unary, UnParamsUnary } from '@core-template';

import { CloseStrategyScroll } from '../../../data';
import { DISABLE_CLOSE_STRATEGY_SCROLL } from './disable-close-strategy-scroll';

export const detachCloseStrategyScroll: UnParamsUnary<
    CloseStrategyScroll<unknown>
> = () =>
    unary((strategy) => {
        const disableCloseStrategyScroll = inject(
            DISABLE_CLOSE_STRATEGY_SCROLL
        );
        tube(
            disableCloseStrategyScroll(),
            (st) => (st.overlay = undefined)
        )(strategy);
    });

export const DETACH_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    UnParamsUnary<CloseStrategyScroll<unknown>>
>('[DETACH_CLOSE_STRATEGY_SCROLL]', {
    factory: () => detachCloseStrategyScroll,
});
