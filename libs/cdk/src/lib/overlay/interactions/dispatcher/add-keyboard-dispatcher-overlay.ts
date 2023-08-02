import { outZone } from '../../../platform';
import { KeyboardDispatcherOverlay } from '../../data';
import { addDispatcherOverlay } from './base';

/** Add a new overlay to the list of attached overlay refs. */
export const addKeyboardDispatcherOverlay = (
    kdo: KeyboardDispatcherOverlay
): KeyboardDispatcherOverlay => {
    addDispatcherOverlay(kdo);
    const { document, isAttached, listener, ngZone } = kdo;
    // Lazily start dispatcher once first overlay is added
    if (!isAttached && document && listener) {
        outZone(ngZone, () =>
            document.body.addEventListener('keydown', listener)
        );
        kdo.isAttached = true;
    }
    return kdo;
};
