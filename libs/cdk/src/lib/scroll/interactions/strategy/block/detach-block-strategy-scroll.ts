import { InjectionToken } from '@angular/core';
import { Model, tube, Unary, unary } from '@core-template';

import { BlockStrategyScroll } from '../../../data';
import { disableBlockStrategyScroll } from './disable-block-strategy-scroll';

export const detachBlockStrategyScroll = <T>(): Unary<BlockStrategyScroll<T>> =>
    unary((strategy) => tube(disableBlockStrategyScroll())(strategy));

export const DETACH_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    Unary<BlockStrategyScroll<Model>>
>('[DETACH_BLOCK_STRATEGY_SCROLL]', {
    factory: () => detachBlockStrategyScroll(),
});
