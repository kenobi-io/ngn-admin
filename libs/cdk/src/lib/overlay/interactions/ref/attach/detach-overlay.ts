/* eslint-disable @typescript-eslint/no-explicit-any */
import { capability, condition, Mono, mono, then, tube } from '@core-template';

import { detachPortalOutlet, hasAttached } from '../../../../portal';
import {
    ConditionOverlayCapability,
    MonoOverlayCapability,
    Overlay,
    OverlayCapability,
} from '../../../data';
import {
    detachKeyboardDispatcherOverlay,
    detachOutsideClickDispatcherOverlay,
    removeDispatcherOverlay,
} from '../../dispatcher';
import { backdropDetachOverlay } from './backdrop-detach-overlay';
import { contentWhenStableDetachOverlayRef } from './content-when-stable-detach-overlay';

type DetachOverlay = <
    K extends OverlayCapability = OverlayCapability,
>() => Mono<K>;

type Data<T = unknown> = Required<OverlayCapability<T>> & Overlay<T>;

type MRO<T = unknown> = MonoOverlayCapability<Data<T>>;
type CRO<T = unknown> = ConditionOverlayCapability<Data<T>>;

/**
 * Detaches an overlay from a portal.
 * @returns The portal detachment result.
 */
export const detachOverlay: DetachOverlay = () =>
    mono(
        ({ overlay }) =>
            overlay &&
            tube(
                isNotAttached(),
                then(
                    backdropDetachOverlay<Data, Data>(),
                    // When the overlay is detached, the pane element should disable pointer events.
                    // This is necessary because otherwise the pane element will cover the page and disable
                    // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
                    nonePointerEvent(),
                    hasPortalOutlet(),
                    // positionStrategy?.detach && positionStrategy.detach(); // TODO: position
                    // scrollStrategy?.disable(); // TODO: scroll
                    detachingPortalOutlet(),
                    // Only emit after everything is detached.
                    detachmentsNext(),
                    // Remove this overlay from keyboard dispatcher tracking.
                    removeDispatcherOverlay(detachKeyboardDispatcherOverlay),
                    // Keeping the host element in the DOM can cause scroll jank, because it still gets
                    // rendered, even though it's transparent and unclickable which is why we remove it.
                    contentWhenStableDetachOverlayRef(),
                    unsubscribe(),
                    removeDispatcherOverlay(detachOutsideClickDispatcherOverlay)
                )
            )(capability<Data>(overlay))
    );

const isNotAttached: CRO = () =>
    condition(({ overlay: { portalOutlet } }) =>
        hasAttached(portalOutlet?.portal)
    );

const hasPortalOutlet: CRO = () =>
    condition(({ overlay: { portalOutlet } }) => !!portalOutlet);

const nonePointerEvent: MRO = () =>
    mono(
        ({ overlay: { pane } }) => pane && (pane.style.pointerEvents = 'none')
    );

const unsubscribe: MonoOverlayCapability<OverlayCapability> = () =>
    mono(({ overlay }) => {
        if (overlay) {
            const { locationChanges } = overlay;
            locationChanges.unsubscribe();
        }
    });

const detachingPortalOutlet: MRO = () =>
    mono(
        ({ overlay: { portalOutlet } }) =>
            portalOutlet && detachPortalOutlet()({ portalOutlet })
    );

const detachmentsNext: MRO = () =>
    mono(({ overlay: { detachments } }) => detachments.next());
