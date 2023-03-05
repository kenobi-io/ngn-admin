import { disposePortalOutlet, hasAttached } from '../../../../portal';
import { OverlayRef } from '../../../data';
import { removeDispatcherOverlay } from '../../dispatcher/base/remove-dispatcher-overlay';
import { backdropDisposeOverlayRef } from './backdrop-dispose-overlay-ref';
import { disposeScrollStrategyOverlayRef } from './dispose-scroll-strategy-overlay-ref';

/** Cleans up the overlay from the DOM. */
export const disposeOverlayRef = <T>(
    overlayRef: OverlayRef<T>
): OverlayRef<T> => {
    const {
        attachments,
        backdropClick,
        detachments,
        keyboardDispatcher,
        keydownEvents,
        locationChanges,
        outsideClickDispatcher,
        outsidePointerEvents,
        portalOutlet,
        positionStrategy,
    } = overlayRef;
    const isAttached = hasAttached(portalOutlet?.portal);
    positionStrategy?.dispose();
    disposeScrollStrategyOverlayRef(overlayRef);
    backdropDisposeOverlayRef(overlayRef);
    locationChanges.unsubscribe();
    // keyboardDispatcher.remove(overlayRef);
    removeDispatcherOverlay(keyboardDispatcher);
    // portalOutlet.dispose();
    disposePortalOutlet(portalOutlet);
    attachments.complete();
    backdropClick.complete();
    keydownEvents?.complete();
    outsidePointerEvents?.complete();
    // outsideClickDispatcher.remove(overlayRef);
    removeDispatcherOverlay(outsideClickDispatcher);
    overlayRef.host?.remove();
    overlayRef.previousHostParent =
        overlayRef.pane =
        overlayRef.host =
            undefined;
    isAttached && detachments.next();
    detachments.complete();
    return overlayRef;
};
