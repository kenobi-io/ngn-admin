import { Condition, condition } from '@core-template';

import { Portal, PortalCapability } from '../data';

type HasAttached = {
    <R extends PortalCapability = PortalCapability>(): Condition<R>;
    (portal?: Portal): boolean;
};

/** Whether the overlay has attached content. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasAttached: HasAttached = (portal?: Portal): any =>
    portal ? hasAttachedUtil(portal) : hasAttachedTube();

const hasAttachedUtil = (portal: Portal | undefined): boolean => {
    return portal ? portal.isAttached : false;
};

const hasAttachedTube = (): Condition<PortalCapability> =>
    condition(({ portal }: PortalCapability) =>
        portal ? portal.isAttached : false
    );
