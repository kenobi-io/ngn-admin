import { InjectionToken } from '@angular/core';
import { CapabilityMono, mono } from '@core-template';

import { BlockStrategyScroll } from '../../../data';

export const attachBlockStrategyScroll: CapabilityMono<
    BlockStrategyScroll<unknown>
> = () => mono((strategy) => strategy);

export const ATTACH_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    CapabilityMono<BlockStrategyScroll<unknown>>
>('[ATTACH_BLOCK_STRATEGY_SCROLL]', {
    factory: () => attachBlockStrategyScroll,
});
