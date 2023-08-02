import { OverlayRef } from '../overlay-ref';

type ChangesDispatcherOverlay = {
    /** Currently attached overlays in the order they were attached. */
    attachedOverlay: OverlayRef<unknown>; // TODO: cyclic dependency
    attachedOverlays: OverlayRef<unknown>[];
};

export type DispatcherOverlay = Partial<ChangesDispatcherOverlay> & {
    document: Document;
    isAttached: boolean;
};
