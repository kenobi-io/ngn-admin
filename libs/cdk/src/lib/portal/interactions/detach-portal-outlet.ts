import { Mono, mono } from '@core-template';

import { PortalOutletCapability } from '../data';
import { invokeDisposeFn } from './invoke-dispose-fn';

type DetachPortalOutlet<T = unknown> = () => Mono<PortalOutletCapability<T>>;

/** Detaches a previously attached portal. */
export const detachPortalOutlet: DetachPortalOutlet = () =>
    mono(({ portalOutlet }) => {
        if (portalOutlet?.attachedPortal) {
            portalOutlet.attachedPortal = undefined;
        }
        invokeDisposeFn()({ portalOutlet });
    });
