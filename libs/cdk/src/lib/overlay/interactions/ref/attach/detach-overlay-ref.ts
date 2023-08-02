/* eslint-disable @typescript-eslint/no-explicit-any */
import { Condition, condition, Mono, mono, then, tube } from '@core-template';

import { detachPortalOutlet, hasAttached } from '../../../../portal';
import { Overlay, OverlayCapability } from '../../../data';
import {
    detachKeyboardDispatcherOverlay,
    detachOutsideClickDispatcherOverlay,
    Key,
    Out,
    removeDispatcherOverlay,
} from '../../dispatcher';
import { backdropDetachOverlayRef } from './backdrop-detach-overlay-ref';
import { contentWhenStableDetachOverlayRef } from './content-when-stable-detach-overlay-ref';

type DetachOverlayRef = <
    T,
    K extends Partial<OverlayCapability<T>> = Partial<OverlayCapability<T>>
>() => Mono<K>;

/**
 * Detaches an overlay from a portal.
 * @returns The portal detachment result.
 */
export const detachOverlayRef: DetachOverlayRef = <T>() =>
    mono(
        ({ overlay }) =>
            overlay &&
            tube(
                isNotAttached(),
                then(
                    backdropDetachOverlayRef<T, Overlay<T>>(),
                    // When the overlay is detached, the pane element should disable pointer events.
                    // This is necessary because otherwise the pane element will cover the page and disable
                    // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
                    nonePointerEvent<T>(),
                    hasPortalOutlet(),
                    // positionStrategy?.detach && positionStrategy.detach(); // TODO: position
                    // scrollStrategy?.disable(); // TODO: scroll
                    detachingPortalOutlet<T>(),
                    // Only emit after everything is detached.
                    detachmentsNext<T>(),
                    // Remove this overlay from keyboard dispatcher tracking.
                    removeDispatcherOverlay<T, Overlay<T>, Key<T>>(
                        detachKeyboardDispatcherOverlay
                    ),
                    // Keeping the host element in the DOM can cause scroll jank, because it still gets
                    // rendered, even though it's transparent and unclickable which is why we remove it.
                    contentWhenStableDetachOverlayRef<T, Overlay<T>>(),
                    unsubscribe(),
                    removeDispatcherOverlay<T, Overlay<T>, Out<T>>(
                        detachOutsideClickDispatcherOverlay
                    )
                )
            )(overlay)
    );

const isNotAttached = <T>(): Condition<Overlay<T>> =>
    condition((overlay) =>
        hasAttached(overlay?.overlayRef.portalOutlet?.portal)
    );

const hasPortalOutlet = <T>(): Condition<Overlay<T>> =>
    condition((overlay) => !!overlay?.overlayRef.portalOutlet);

const nonePointerEvent = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        if (overlay?.overlayRef.pane) {
            overlay.overlayRef.pane.style.pointerEvents = 'none';
        }
    });

const unsubscribe = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => {
        overlay?.overlayRef.locationChanges.unsubscribe();
    });

const detachingPortalOutlet = <T>(): Mono<Overlay<T>> =>
    mono(
        (overlay) =>
            overlay?.overlayRef.portalOutlet &&
            detachPortalOutlet(overlay.overlayRef.portalOutlet)
    );

const detachmentsNext = <T>(): Mono<Overlay<T>> =>
    mono((overlay) => overlay?.overlayRef.detachments.next());
