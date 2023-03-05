import { PortalOutlet } from '../data';
import { invokeDisposeFn } from './invoke-dispose-fn';

/** Detaches a previously attached portal. */
export const detachPortalOutlet = <T>(
    bpo: PortalOutlet<T>
): PortalOutlet<T> => {
    if (bpo.attachedPortal) {
        // this._attachedPortal.setAttachedHost(null);
        // use.attachedPortal.isAttached = undefined;
        bpo.attachedPortal = undefined;
    }
    invokeDisposeFn(bpo);
    return bpo;
};
