import { InjectionToken } from '@angular/core';
import { Model, Unary, unary } from '@core-template';

import { BlockStrategyScroll } from '../../../data';

export const attachBlockStrategyScroll = <T>(): Unary<BlockStrategyScroll<T>> =>
    unary((strategy) => strategy);

export const ATTACH_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    Unary<BlockStrategyScroll<Model>>
>('[ATTACH_BLOCK_STRATEGY_SCROLL]', {
    factory: () => attachBlockStrategyScroll(),
});
