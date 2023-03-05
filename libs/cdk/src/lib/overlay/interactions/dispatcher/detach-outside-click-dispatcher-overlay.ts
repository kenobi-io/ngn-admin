import { OutsideClickDispatcherOverlay } from '../../data';

/** Detaches the global keyboard event listener. */
export const detachOutsideClickDispatcherOverlay = <T>(
    dispatcher: OutsideClickDispatcherOverlay<T>
): OutsideClickDispatcherOverlay<T> => {
    const {
        clickListener,
        cursorOriginalValue,
        cursorStyleIsSet,
        document,
        isAttached,
        platform,
        pointerDownListener,
    } = dispatcher;

    if (isAttached) {
        const body = document.body;
        body.removeEventListener('pointerdown', pointerDownListener, true);
        body.removeEventListener('click', clickListener, true);
        body.removeEventListener('auxclick', clickListener, true);
        body.removeEventListener('contextmenu', clickListener, true);

        if (platform.IOS && cursorStyleIsSet) {
            body.style.cursor = cursorOriginalValue;
            dispatcher.cursorStyleIsSet = false;
        }
        dispatcher.isAttached = false;
    }
    return dispatcher;
};
