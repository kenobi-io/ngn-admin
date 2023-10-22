import { Condition, Mono } from '@core-template';
import { UnaryFunction } from 'rxjs';

import { Scrollable } from '../../directive';
import { StrategyScroll } from './strategy-scroll';

export type StrategyScrollCapability<T = unknown> = {
    strategyScroll?: StrategyScroll<T>;
};

export type ScrollableCapability<T = unknown> = {
    scrollable?: Scrollable<T>;
};

// mono
// strategy
export type UnaryStrategyScrollCapability<
    P,
    R extends StrategyScrollCapability,
> = () => UnaryFunction<P, R>;
export type ParamsUnaryStrategyScrollCapability<
    P,
    R extends StrategyScrollCapability,
    Param = unknown,
> = (param: Param) => UnaryFunction<P, R>;

// mono
// strategy
export type MonoStrategyScrollCapability<R extends StrategyScrollCapability> =
    () => Mono<R>;
export type ParamsMonoStrategyScrollCapability<
    R extends StrategyScrollCapability,
    Param = unknown,
> = (param: Param) => Mono<R>;
// scrollable
export type MonoScrollableCapability<R extends ScrollableCapability> =
    () => Mono<R>;
export type ParamsMonoScrollableCapability<
    R extends ScrollableCapability,
    Param = unknown,
> = (param: Param) => Mono<R>;

// condition
// strategy
export type ConditionStrategyScrollCapability<
    R extends StrategyScrollCapability,
> = () => Condition<R>;
export type ParamsConditionStrategyScrollCapability<
    R extends StrategyScrollCapability,
    Param = unknown,
> = (param: Param) => Condition<R>;
// scrollable
export type ConditionScrollableCapability<R extends ScrollableCapability> =
    () => Condition<R>;
export type ParamsConditionScrollableCapability<
    R extends ScrollableCapability,
    Param = unknown,
> = (param: Param) => Condition<R>;
