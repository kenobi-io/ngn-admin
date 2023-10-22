import { FunctionMono, mono } from '@core-template';

import { OutsideClickDispatcherOverlayCapability } from '../../data';

/** Detaches the global keyboard event listener. */
export const detachOutsideClickDispatcherOverlay: FunctionMono<
    OutsideClickDispatcherOverlayCapability
> = (finish) =>
    mono(({ dispatcherOverlay }) => {
        if (dispatcherOverlay) {
            const {
                cursorOriginalValue,
                cursorStyleIsSet,
                document,
                isAttached,
                listener,
                platform,
                pointerDownListener,
            } = dispatcherOverlay;

            if (isAttached && pointerDownListener && listener) {
                const body = document.body;
                body.removeEventListener(
                    'pointerdown',
                    pointerDownListener,
                    true
                );
                body.removeEventListener('click', listener, true);
                body.removeEventListener('auxclick', listener, true);
                body.removeEventListener('contextmenu', listener, true);

                if (platform?.IOS && cursorStyleIsSet && cursorOriginalValue) {
                    body.style.cursor = cursorOriginalValue;
                    dispatcherOverlay.cursorStyleIsSet = false;
                }
                dispatcherOverlay.isAttached = false;
            }
        }
    }, finish);
