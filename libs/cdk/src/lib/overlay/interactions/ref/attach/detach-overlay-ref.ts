import { detachPortalOutlet, hasAttached } from '../../../../portal';
import { OverlayRef } from '../../../data';
import { backdropDetachOverlayRef } from './backdrop-detach-overlay-ref';
import { contentWhenStableDetachOverlayRef } from './content-when-stable-detach-overlay-ref';

/**
 * Detaches an overlay from a portal.
 * @returns The portal detachment result.
 */
export const detachOverlayRef = <T>(
    overlayRef: OverlayRef<T>
): OverlayRef<T> => {
    const {
        detachments,
        keyboardDispatcher,
        locationChanges,
        outsideClickDispatcher,
        pane,
        portalOutlet,
        positionStrategy,
        strategiesScroll: scrollStrategy,
    } = overlayRef;

    if (!hasAttached(portalOutlet?.portal)) {
        return overlayRef;
    }
    backdropDetachOverlayRef(overlayRef);
    // When the overlay is detached, the pane element should disable pointer events.
    // This is necessary because otherwise the pane element will cover the page and disable
    // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
    pane && (pane.style.pointerEvents = 'none');
    positionStrategy?.detach && positionStrategy.detach();
    scrollStrategy?.disable();

    if (portalOutlet) {
        detachPortalOutlet(portalOutlet);
        portalOutlet.detachmentResult = portalOutlet.attachedPortal;
    }
    // Only emit after everything is detached.
    detachments.next();
    // Remove this overlay from keyboard dispatcher tracking.
    keyboardDispatcher.remove(overlayRef);
    // Keeping the host element in the DOM can cause scroll jank, because it still gets
    // rendered, even though it's transparent and unclickable which is why we remove it.
    contentWhenStableDetachOverlayRef(overlayRef);
    locationChanges.unsubscribe();
    outsideClickDispatcher.remove(overlayRef);
    return overlayRef;
};
