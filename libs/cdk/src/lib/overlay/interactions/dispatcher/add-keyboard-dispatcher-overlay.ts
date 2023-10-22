import { mono } from '@core-template';

import { outZone } from '../../../platform';
import { KeyboardDispatcherOverlay, MonoOverlayCapability } from '../../data';
import { addDispatcherOverlay } from './base';
import { detachKeyboardDispatcherOverlay } from './detach-keyboard-dispatcher-overlay';

/** Add a new overlay to the list of attached overlay refs. */
export const addKeyboardDispatcherOverlay: MonoOverlayCapability = () =>
    mono(({ overlay }) => {
        if (overlay) {
            const kdo = overlay.dispatcherOverlay as KeyboardDispatcherOverlay;
            addDispatcherOverlay(detachKeyboardDispatcherOverlay)({ overlay });
            const { document, isAttached, listener, ngZone } = kdo;
            // Lazily start dispatcher once first overlay is added
            if (!isAttached && document && listener && ngZone) {
                outZone(ngZone, () =>
                    document.body.addEventListener('keydown', listener)
                );
                kdo.isAttached = true;
            }
        }
    });
