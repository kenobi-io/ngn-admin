import { tube, unary } from '@core-template';
import { UnaryFunction } from 'rxjs';

import { PortalOutletCapability } from '../data/capability';
import { detachPortalOutlet } from './detach-portal-outlet';
import { invokeDisposeFn } from './invoke-dispose-fn';

type RPO = Required<PortalOutletCapability>;

/** Permanently dispose of this portal host. */
export const disposePortalOutlet = <
    P,
    R extends PortalOutletCapability,
>(): UnaryFunction<P, R> =>
    unary<P, R>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ portalOutlet }: any) =>
            portalOutlet &&
            tube(
                detachPortalOutlet(),
                invokeDisposeFn(),
                ({ portalOutlet }: RPO) => (portalOutlet.isDisposed = true)
            )({ portalOutlet })
    );
