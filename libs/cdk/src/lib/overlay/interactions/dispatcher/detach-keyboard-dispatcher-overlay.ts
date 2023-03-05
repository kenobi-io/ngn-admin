import { KeyboardDispatcherOverlay } from '../../data';

/** Detaches the global keyboard event listener. */
export const detachKeyboardDispatcherOverlay = <T>(
    dispatcher: KeyboardDispatcherOverlay<T>
): KeyboardDispatcherOverlay<T> => {
    const { document, isAttached, keydownListener } = dispatcher;
    if (isAttached && document) {
        document.body.removeEventListener('keydown', keydownListener);
        dispatcher.isAttached = false;
    }
    return dispatcher;
};
