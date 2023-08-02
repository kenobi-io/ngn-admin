import {
    CapabilityMono,
    Condition,
    Mono,
    ParamsCapabilityMono,
} from '@core-template';

import { FlexibleConnectedStrategyPositionCapability } from '../../data';

export type UnaryFlexibleConnectedStrategyPosition = <
    T,
    R = Partial<FlexibleConnectedStrategyPositionCapability<T>>
>() => Mono<R>;

export type ParamsUnaryApplyFlexibleConnectedStrategyPosition<
    T,
    R = Partial<FlexibleConnectedStrategyPositionCapability<T>>
> = <K>(param: K) => Mono<R>;

export type ConditionApplyFlexibleConnectedStrategyPosition = <
    T,
    R = Partial<FlexibleConnectedStrategyPositionCapability<T>>
>() => Condition<R>;

export type CapabilityUnaryFlexibleConnectedStrategyPosition<T> =
    CapabilityMono<Partial<FlexibleConnectedStrategyPositionCapability<T>>>;

export type ParamsCapabilityUnaryFlexibleConnectedStrategyPosition<T, P> =
    ParamsCapabilityMono<
        P,
        Partial<FlexibleConnectedStrategyPositionCapability<T>>
    >;
