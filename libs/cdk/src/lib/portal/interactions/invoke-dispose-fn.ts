import { Mono, mono } from '@core-template';

import { PortalOutletCapability } from '../data';

type InvokeDisposeFn<T = unknown> = () => Mono<PortalOutletCapability<T>>;

export const invokeDisposeFn: InvokeDisposeFn = () =>
    mono(({ portalOutlet }) => {
        if (portalOutlet) {
            portalOutlet.disposeFn?.();
            portalOutlet.disposeFn = undefined;
        }
    });
