import { outZone } from '@ngn-template/cdk';
import { merge, takeUntil } from 'rxjs';

import { OverlayRef } from '../../../data';
import { toggleClassesOverlayRef } from './toggle-classes-overlay-ref';

/** Detaches the overlay content next time the ngZone stabilizes. */
export const contentWhenStableDetachOverlayRef = <T>(
    overlayRef: OverlayRef<T>
): OverlayRef<T> => {
    const { attachments, config, detachments, host, ngZone, pane } = overlayRef;
    // Normally we wouldn't have to explicitly run this outside the `NgZone`, however
    // if the consumer is using `ngZone-patch-rxjs`, the `Subscription.unsubscribe` call will
    // be patched to run inside the ngZone, which will throw us into an infinite loop.
    outZone(ngZone, () => {
        // We can't remove the host here immediately, because the overlay pane's content
        // might still be animating. This stream helps us avoid interrupting the animation
        // by waiting for the pane to become empty.
        const subscription = ngZone.onStable
            .pipe(takeUntil(merge(attachments, detachments)))
            .subscribe(() => {
                // Needs a couple of checks for the pane and host, because
                // they may have been removed by the time the ngZone stabilizes.
                if (!pane || !host || pane.children.length === 0) {
                    if (pane && config?.panelClass) {
                        overlayRef.toggleClasses = config.panelClass;
                        const tca = { ...overlayRef, isAdd: false };
                        toggleClassesOverlayRef(tca);
                    }

                    if (host?.parentElement) {
                        overlayRef.previousHostParent = host.parentElement;
                        host.remove();
                    }
                    subscription.unsubscribe();
                }
            });
    });
    return overlayRef;
};
