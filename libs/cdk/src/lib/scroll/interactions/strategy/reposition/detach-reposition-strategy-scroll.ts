import { InjectionToken } from '@angular/core';
import { Model, tube, Unary, unary } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';
import { disableRepositionStrategyScroll } from './disable-reposition-strategy-scroll';

export const detachRepositionStrategyScroll = <T>(): Unary<
    RepositionStrategyScroll<T>
> =>
    unary((strategy) => {
        tube(
            disableRepositionStrategyScroll(),
            (st) => (st.overlayRef = undefined)
        )(strategy);
    });

export const DETACH_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    Unary<RepositionStrategyScroll<Model>>
>('[DETACH_REPOSITION_STRATEGY_SCROLL]', {
    factory: () => detachRepositionStrategyScroll(),
});
