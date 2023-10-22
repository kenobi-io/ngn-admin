import { Condition, Mono } from '@core-template';

import { DomPortalOutlet } from './dom-portal-outlet';
import { Portal } from './portal';
import { PortalOutlet } from './portal-outlet';

export type PortalCapability = {
    portal?: Portal;
};

export type PortalOutletCapability<T = unknown> = {
    portalOutlet?: PortalOutlet<T>;
};

export type DomPortalOutletCapability<T = unknown> =
    PortalOutletCapability<T> & {
        portalOutlet?: DomPortalOutlet<T>;
    };

// mono
export type MonoPortalOutletCapability<R extends PortalOutletCapability> =
    () => Mono<R>;
export type ParamsMonoPortalOutletCapability<
    R extends PortalOutletCapability,
    Param = unknown,
> = (param: Param) => Mono<R>;

// condition
export type ConditionPortalOutletCapability<R extends PortalOutletCapability> =
    () => Condition<R>;
export type ParamsConditionPortalOutletCapability<
    R extends PortalOutletCapability,
    Param = unknown,
> = (param: Param) => Condition<R>;
