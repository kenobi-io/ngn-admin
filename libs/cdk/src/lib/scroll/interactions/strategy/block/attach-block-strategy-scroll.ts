import { InjectionToken } from '@angular/core';
import { unary, UnParamsUnary } from '@core-template';

import { BlockStrategyScroll } from '../../../data';

export const attachBlockStrategyScroll: UnParamsUnary<
    BlockStrategyScroll<unknown>
> = () => unary((strategy) => strategy);

export const ATTACH_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    UnParamsUnary<BlockStrategyScroll<unknown>>
>('[ATTACH_BLOCK_STRATEGY_SCROLL]', {
    factory: () => attachBlockStrategyScroll,
});
