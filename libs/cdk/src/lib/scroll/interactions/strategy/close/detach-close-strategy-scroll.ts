import { InjectionToken } from '@angular/core';
import { Model, tube, Unary, unary } from '@core-template';

import { CloseStrategyScroll } from '../../../data';
import { disableCloseStrategyScroll } from './disable-close-strategy-scroll';

export const detachCloseStrategyScroll = <T>(): Unary<CloseStrategyScroll<T>> =>
    unary((strategy) => {
        tube(
            disableCloseStrategyScroll(),
            (st) => (st.overlay = undefined)
        )(strategy);
    });

export const DETACH_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    Unary<CloseStrategyScroll<Model>>
>('[DETACH_CLOSE_STRATEGY_SCROLL]', {
    factory: () => detachCloseStrategyScroll(),
});
