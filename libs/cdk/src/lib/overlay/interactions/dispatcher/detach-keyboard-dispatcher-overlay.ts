import { FunctionMono, mono } from '@core-template';

import { KeyboardDispatcherOverlayCapability } from '../../data';

/** Detaches the global keyboard event listener. */
export const detachKeyboardDispatcherOverlay: FunctionMono<
    KeyboardDispatcherOverlayCapability
> = (finish) =>
    mono(({ dispatcherOverlay }) => {
        if (dispatcherOverlay) {
            const { document, isAttached, listener } = dispatcherOverlay;
            if (isAttached && document && listener) {
                document.body.removeEventListener('keydown', listener);
                dispatcherOverlay.isAttached = false;
            }
        }
    }, finish);
