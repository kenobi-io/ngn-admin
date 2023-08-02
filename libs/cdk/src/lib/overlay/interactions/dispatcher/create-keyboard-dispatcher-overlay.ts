import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

import { changes, inZone, ZONE_TOKEN } from '../../../platform';
import { KeyboardDispatcherOverlay } from '../../data';

const keydownListener = function (
    this: KeyboardDispatcherOverlay,
    event: KeyboardEvent | Event
): void {
    const { attachedOverlays, ngZone } = this;
    const overlays = attachedOverlays;

    if (overlays) {
        for (let i = overlays.length - 1; i > -1; i--) {
            // Dispatch the keydown event to the top overlay which has subscribers to its keydown events.
            // We want to target the most recent overlay, rather than trying to match where the event came
            // from, because some components might open an overlay, but keep focus on a trigger element
            // (e.g. for select and autocomplete). We skip overlays without keydown event subscriptions,
            // because we don't want overlays that don't handle keyboard events to block the ones below
            // them that do.
            const length = overlays[i].keydownEvents?.observers?.length;

            if (length && length > 0) {
                const keydownEvents = overlays[i].keydownEvents;
                /** @breaking-change 14.0.0 _ngZone will be required. */
                if (ngZone) {
                    inZone(ngZone, () => keydownEvents?.next(event));
                } else {
                    keydownEvents?.next(event);
                }

                break;
            }
        }
    }
};

export const CHANGE_KEYBOARD_DISPATCHER_OVERLAY =
    new InjectionToken<KeyboardDispatcherOverlay>(
        '[CHANGE_KEYBOARD_DISPATCHER_OVERLAY]'
    );

export const createKeyboardDispatcherOverlay = (
    change?: Partial<KeyboardDispatcherOverlay>
): KeyboardDispatcherOverlay => {
    const kdo: KeyboardDispatcherOverlay = {
        attachedOverlays: [],
        document: inject(DOCUMENT),
        isAttached: false,
        // kindof: 'KeyboardDispatcherOverlay',
        listener: (event: Event): void => {
            keydownListener.call(kdo, event);
        },
        // TODO: polymorph
        // ngOnDestroy: (): void => {
        //    detachKeyboardDispatcherOverlay(kdo);
        // },
        ngZone: inject(ZONE_TOKEN),
    };
    changes(kdo, change, CHANGE_KEYBOARD_DISPATCHER_OVERLAY);

    return kdo;
};

export const KEYBOARD_DISPATCHER_OVERLAY =
    new InjectionToken<KeyboardDispatcherOverlay>(
        '[KEYBOARD_DISPATCHER_OVERLAY]',
        {
            factory: () => createKeyboardDispatcherOverlay(),
        }
    );
