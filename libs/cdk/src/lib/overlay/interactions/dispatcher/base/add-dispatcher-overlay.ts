import { EventDispatcherOverlay } from '../../../data';
import { removeDispatcherOverlay } from './remove-dispatcher-overlay';

/** Add a new overlay to the list of attached overlay refs. */
export const addDispatcherOverlay = (
    dispatcher: EventDispatcherOverlay
): EventDispatcherOverlay => {
    const { attachedOverlay, attachedOverlays } = dispatcher;

    if (attachedOverlay && attachedOverlays) {
        // Ensure that we don't get the same overlay multiple times.
        removeDispatcherOverlay(dispatcher);
        attachedOverlays.push(attachedOverlay);
    }

    return dispatcher;
};
