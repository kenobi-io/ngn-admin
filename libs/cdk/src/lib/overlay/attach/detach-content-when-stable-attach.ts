import { Bounden } from '@core-template';
import { merge, takeUntil } from 'rxjs';

import { using } from '../../directive';
import { Attach } from './attach';
import { toggleClassesAttach } from './toggle-classes-attach';

export type DetachContentWhenStableAttach<T> = Bounden<
    Attach<T>,
    | 'attachments'
    | 'backdropElement'
    | 'config'
    | 'detachments'
    | 'host'
    | 'pane'
    | 'ngZone'
>;
/** Detaches the overlay content next time the ngZone stabilizes. */

export const detachContentWhenStableAttach = <T>(
    use: DetachContentWhenStableAttach<T>
): Attach<T> => {
    return using(use, () => {
        const { attachments, config, detachments, host, ngZone, pane } = use;
        // Normally we wouldn't have to explicitly run this outside the `NgZone`, however
        // if the consumer is using `ngZone-patch-rxjs`, the `Subscription.unsubscribe` call will
        // be patched to run inside the ngZone, which will throw us into an infinite loop.
        ngZone.runOutsideAngular(() => {
            // We can't remove the host here immediately, because the overlay pane's content
            // might still be animating. This stream helps us avoid interrupting the animation
            // by waiting for the pane to become empty.
            const subscription = ngZone.onStable
                .pipe(takeUntil(merge(attachments, detachments)))
                .subscribe(() => {
                    // Needs a couple of checks for the pane and host, because
                    // they may have been removed by the time the ngZone stabilizes.
                    if (!pane || !host || pane.children.length === 0) {
                        if (pane && config.panelClass) {
                            use.toggleClasses = config.panelClass;
                            const tca = { ...use, isAdd: false };
                            toggleClassesAttach(tca);
                        }

                        if (host?.parentElement) {
                            use.previousHostParent = host.parentElement;
                            host.remove();
                        }
                        subscription.unsubscribe();
                    }
                });
        });
    });
};
