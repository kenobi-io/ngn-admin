import { Condition, Finish, Mono } from '@core-template';

import { StrategyPosition } from './strategy-position';

export type StrategyPositionCapability<T = unknown> = {
    strategyPosition?: StrategyPosition<T>;
};

// mono
export type MonoStrategyPositionCapability<
    R extends StrategyPositionCapability,
> = (finish?: Finish) => Mono<R>;
export type ParamsMonoStrategyPositionCapability<
    R extends StrategyPositionCapability,
    Param = unknown,
> = (param: Param, finish?: Finish) => Mono<R>;

// condition
export type ConditionStrategyPositionCapability<
    R extends StrategyPositionCapability,
> = (finish?: Finish) => Condition<R>;
export type ParamsConditionStrategyPositionCapability<
    R extends StrategyPositionCapability,
    Param = unknown,
> = (param: Param, finish?: Finish) => Condition<R>;
