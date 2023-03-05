import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import { Model } from '@core-template';

import { changes, inZone, ZONE_TOKEN } from '../../../platform';
import { KeyboardDispatcherOverlay } from '../../data';

const keydownListener = function <T>(
    this: KeyboardDispatcherOverlay<T>,
    event: KeyboardEvent
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

export const CHANGE_KEYBOARD_DISPATCHER_OVERLAY = new InjectionToken<
    KeyboardDispatcherOverlay<Model>
>('[CHANGE_KEYBOARD_DISPATCHER_OVERLAY]');

export const createKeyboardDispatcherOverlay = <T>(
    change?: Partial<KeyboardDispatcherOverlay<T>>
): KeyboardDispatcherOverlay<T> => {
    const kdo: KeyboardDispatcherOverlay<T> = {
        attachedOverlays: [],
        document: inject(DOCUMENT),
        isAttached: false,
        keydownListener: (event: KeyboardEvent): void => {
            keydownListener.call(kdo, event);
        },
        kindof: 'KeyboardDispatcherOverlay',
        // TODO: polymorph
        // ngOnDestroy: (): void => {
        //    detachKeyboardDispatcherOverlay(kdo);
        // },
        ngZone: inject(ZONE_TOKEN),
    };
    changes(kdo, change, CHANGE_KEYBOARD_DISPATCHER_OVERLAY);

    return kdo;
};

export const KEYBOARD_DISPATCHER_OVERLAY = new InjectionToken<
    KeyboardDispatcherOverlay<Model>
>('[KEYBOARD_DISPATCHER_OVERLAY]', {
    factory: () => createKeyboardDispatcherOverlay(),
});
