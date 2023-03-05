import { outZone } from '../../../platform';
import { KeyboardDispatcherOverlay } from '../../data';
import { addDispatcherOverlay } from './base';

/** Add a new overlay to the list of attached overlay refs. */
export const addKeyboardDispatcherOverlay = <T>(
    kdo: KeyboardDispatcherOverlay<T>
): KeyboardDispatcherOverlay<T> => {
    addDispatcherOverlay(kdo);
    const { document, isAttached, keydownListener, ngZone } = kdo;
    // Lazily start dispatcher once first overlay is added
    if (!isAttached && document) {
        outZone(ngZone, () =>
            document.body.addEventListener('keydown', keydownListener)
        );
        kdo.isAttached = true;
    }
    return kdo;
};
