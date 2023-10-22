/* eslint-disable no-use-before-define */
import { Condition, Mono } from '@core-template';

import { Overlay } from './overlay';

export type OverlayCapability<T = unknown> = {
    overlay?: Overlay<T>;
};

// required
export type ReqOC<T = unknown> = Required<OverlayCapability<T>>;
export type OverReqOC<T = unknown> = Overlay<T> &
    Required<OverlayCapability<T>>;
export type ConReqOverCap = ConditionOverlayCapability<ReqOC>;
export type MonoReqOverCap = MonoOverlayCapability<ReqOC>;

// mono
export type MonoOverlayCapability<R extends OverlayCapability> = () => Mono<R>;

export type ParamsMonoOverlayCapability<
    R extends OverlayCapability,
    Param = unknown,
> = (param: Param) => Mono<R>;

// condition
export type ConditionOverlayCapability<R extends OverlayCapability> =
    () => Condition<R>;

export type ParamsConditionOverlayCapability<
    R extends OverlayCapability,
    Param = unknown,
> = (param: Param) => Condition<R>;
