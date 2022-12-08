import { OutBounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';
import { detachBackdropAttach } from './detach-backdrop-attach';
import { detachContentWhenStableAttach } from './detach-content-when-stable-attach';
import { hasAttached } from './has-attached';

export type DetachAttach<T> = OutBounden<
    Attach<T>,
    | 'attachResult'
    | 'backdrop'
    | 'detachmentResult'
    | 'direction'
    | 'panelClass'
    | 'portal'
    | 'sizeConfig'
    | 'strategy'
    | 'toggleClasses'
    | 'toggleDirection'
    | 'togglePositionStrategy'
    | 'animationsDisabled'
    | 'backdropTimeout'
    | 'document'
    | 'location'
    | 'previousHostParent'
>;

/**
 * Detaches an overlay from a portal.
 * @returns The portal detachment result.
 */
export const detachAttach = <T>(use: DetachAttach<T>): Attach<T> => {
    return using(use, () => {
        const {
            detachments,
            keyboardDispatcher,
            locationChanges,
            outsideClickDispatcher,
            pane: { style },
            portalOutlet,
            positionStrategy,
            scrollStrategy,
        } = use;

        if (!hasAttached(portalOutlet)) {
            return;
        }
        detachBackdropAttach(use);
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        style.pointerEvents = 'none';
        positionStrategy?.detach && positionStrategy.detach();
        scrollStrategy?.disable();
        use.detachmentResult = portalOutlet.detach();
        // Only emit after everything is detached.
        detachments.next();
        // Remove this overlay from keyboard dispatcher tracking.
        keyboardDispatcher.remove(use);
        // Keeping the host element in the DOM can cause scroll jank, because it still gets
        // rendered, even though it's transparent and unclickable which is why we remove it.
        detachContentWhenStableAttach(use);
        locationChanges.unsubscribe();
        outsideClickDispatcher.remove(use);
    });
};
