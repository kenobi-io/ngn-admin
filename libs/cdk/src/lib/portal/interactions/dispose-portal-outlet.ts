import { pipe } from 'rxjs';

import { PortalOutlet } from '../data';
import { detachPortalOutlet } from './detach-portal-outlet';
import { invokeDisposeFn } from './invoke-dispose-fn';

/** Permanently dispose of this portal host. */
export const disposePortalOutlet = <T>(
    outlet: PortalOutlet<T>
): PortalOutlet<T> =>
    pipe(
        detachPortalOutlet,
        invokeDisposeFn,
        () => (outlet.isDisposed = true) && outlet
    )(outlet);
