import { EventDispatcherOverlay } from '../../../data';
import { detachKeyboardDispatcherOverlay } from '../detach-keyboard-dispatcher-overlay';
import { detachOutsideClickDispatcherOverlay } from '../detach-outside-click-dispatcher-overlay';

const overlayDispatchers = new Map()
    .set('OutsideClickDispatcherOverlay', detachOutsideClickDispatcherOverlay)
    .set('KeyboardDispatcherOverlay', detachKeyboardDispatcherOverlay);

/** Remove an overlay from the list of attached overlay refs. */
export const removeDispatcherOverlay = <T>(
    dispatcher: EventDispatcherOverlay<T>
): EventDispatcherOverlay<T> => {
    const { attachedOverlay, attachedOverlays } = dispatcher;

    if (attachedOverlays && attachedOverlay) {
        const index = attachedOverlays?.indexOf(attachedOverlay);

        if (index > -1) {
            attachedOverlays.splice(index, 1);
        }

        // Remove the global listener once there are no more overlays.
        if (attachedOverlays.length === 0) {
            overlayDispatchers.get(dispatcher.kindof)(dispatcher);
        }
    }

    return dispatcher;
};
