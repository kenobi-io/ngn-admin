import { InjectionToken } from '@angular/core';
import { FunctionMono, mono } from '@core-template';

import { BlockStrategyScroll } from '../../../data';

export const attachBlockStrategyScroll: FunctionMono<
    BlockStrategyScroll<unknown>
> = () => mono((strategy) => strategy);

export const ATTACH_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    FunctionMono<BlockStrategyScroll<unknown>>
>('[ATTACH_BLOCK_STRATEGY_SCROLL]', {
    factory: () => attachBlockStrategyScroll,
});
