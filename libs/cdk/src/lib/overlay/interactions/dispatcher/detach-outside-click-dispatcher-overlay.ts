import { CapabilityMono, unary } from '@core-template';

import { OutsideClickDispatcherOverlayCapability } from '../../data';

/** Detaches the global keyboard event listener. */
export const detachOutsideClickDispatcherOverlay: CapabilityMono<
    OutsideClickDispatcherOverlayCapability
> = (finish) =>
    unary(({ dispatcher }) => {
        const {
            cursorOriginalValue,
            cursorStyleIsSet,
            document,
            isAttached,
            listener,
            platform,
            pointerDownListener,
        } = dispatcher;

        if (isAttached) {
            const body = document.body;
            body.removeEventListener('pointerdown', pointerDownListener, true);
            body.removeEventListener('click', listener, true);
            body.removeEventListener('auxclick', listener, true);
            body.removeEventListener('contextmenu', listener, true);

            if (platform.IOS && cursorStyleIsSet) {
                body.style.cursor = cursorOriginalValue;
                dispatcher.cursorStyleIsSet = false;
            }
            dispatcher.isAttached = false;
        }
    }, finish);
