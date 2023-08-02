import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

import {
    changes,
    eventTargetShadowDom,
    inZone,
    PLATFORM_TOKEN,
    ZONE_TOKEN,
} from '../../../platform';
import { hasAttached } from '../../../portal';
import { OutsideClickDispatcherOverlay } from '../../data';

/** Store pointerdown event target to track origin of click. */
const pointerDownListenerHandler = function (
    this: OutsideClickDispatcherOverlay,
    event: PointerEvent
): void {
    this.pointerDownEventTarget = eventTargetShadowDom(event);
};

/** Click event listener that will be attached to the body propagate phase. */
const clickListenerHandler = function (
    this: OutsideClickDispatcherOverlay,
    event: MouseEvent | Event
): void {
    const { attachedOverlays, ngZone, pointerDownEventTarget } = this;
    const target = eventTargetShadowDom(event);
    // In case of a click event, we want to check the origin of the click
    // (e.g. in case where a user starts a click inside the overlay and
    // releases the click outside of it).
    // This is done by using the event target of the preceding pointerdown event.
    // Every click event caused by a pointer device has a preceding pointerdown
    // event, unless the click was programmatically triggered (e.g. in a unit test).
    const origin =
        event.type === 'click' && pointerDownEventTarget
            ? pointerDownEventTarget
            : target;
    // Reset the stored pointerdown event target, to avoid having it interfere
    // in subsequent events.
    this.pointerDownEventTarget = undefined;

    // We copy the array because the original may be modified asynchronously if the
    // outsidePointerEvents listener decides to detach overlays resulting in index errors inside
    // the for loop.
    const overlays = attachedOverlays?.slice();

    // Dispatch the mouse event to the top overlay which has subscribers to its mouse events.
    // We want to target all overlays for which the click could be considered as outside click.
    // As soon as we reach an overlay for which the click is not outside click we break off
    // the loop.
    if (overlays) {
        for (let i = overlays.length - 1; i > -1; i--) {
            const { outsidePointerEvents, overlayElement, portalOutlet } =
                overlays[i];
            const length = outsidePointerEvents?.observers?.length;
            if ((length && length < 1) || !hasAttached(portalOutlet?.portal)) {
                continue;
            }

            // If it's a click inside the overlay, just break - we should do nothing
            // If it's an outside click (both origin and target of the click) dispatch the mouse event,
            // and proceed with the next overlay
            if (
                overlayElement?.contains(target as Node) ||
                overlayElement?.contains(origin as Node)
            ) {
                break;
            }

            /** @breaking-change 14.0.0 _ngZone will be required. */
            if (ngZone) {
                inZone(ngZone, () => outsidePointerEvents?.next(event));
            } else {
                outsidePointerEvents?.next(event);
            }
        }
    }
};

export const CHANGE_OUTSIDE_CLICK_DISPATCHER_OVERLAY =
    new InjectionToken<OutsideClickDispatcherOverlay>(
        '[CHANGE_OUTSIDE_CLICK_DISPATCHER_OVERLAY]'
    );

export const createOutsideClickDispatcherOverlay = (
    change?: Partial<OutsideClickDispatcherOverlay>
): OutsideClickDispatcherOverlay => {
    const outside: OutsideClickDispatcherOverlay = {
        attachedOverlays: [],
        cursorOriginalValue: 'inherit',
        cursorStyleIsSet: false,
        document: inject(DOCUMENT),
        isAttached: false,
        // TODO: polymorph
        // ngOnDestroy: () => {
        //    destroy.call(outside);
        // },
        // kindof: 'OutsideClickDispatcherOverlay',
        listener: (event: Event): void => {
            clickListenerHandler.call(outside, event);
        },
        ngZone: inject(ZONE_TOKEN),
        platform: inject(PLATFORM_TOKEN),
        pointerDownListener: (event: PointerEvent): void => {
            pointerDownListenerHandler.call(outside, event);
        },
    };
    changes(outside, change, CHANGE_OUTSIDE_CLICK_DISPATCHER_OVERLAY);

    return outside;
};

export const OUTSIDE_CLICK_DISPATCHER_OVERLAY =
    new InjectionToken<OutsideClickDispatcherOverlay>(
        '[OUTSIDE_CLICK_DISPATCHER_OVERLAY]',
        {
            factory: () => createOutsideClickDispatcherOverlay(),
        }
    );
