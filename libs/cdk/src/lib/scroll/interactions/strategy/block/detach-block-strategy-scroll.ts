import { inject, InjectionToken } from '@angular/core';
import { tube, unary, UnParamsUnary } from '@core-template';

import { BlockStrategyScroll } from '../../../data';
import { DISABLE_BLOCK_STRATEGY_SCROLL } from './disable-block-strategy-scroll';

export const detachBlockStrategyScroll: UnParamsUnary<
    BlockStrategyScroll<unknown>
> = () =>
    unary((strategy) => {
        const disableBlockStrategyScroll = inject(
            DISABLE_BLOCK_STRATEGY_SCROLL
        );
        tube(
            disableBlockStrategyScroll(),
            (st) => (st.overlay = undefined)
        )(strategy);
    });

export const DETACH_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    UnParamsUnary<BlockStrategyScroll<unknown>>
>('[DETACH_BLOCK_STRATEGY_SCROLL]', {
    factory: () => detachBlockStrategyScroll,
});
