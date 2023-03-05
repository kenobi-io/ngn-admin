import { OverlayRef } from '../overlay-ref';

type ChangesDispatcherOverlay<T> = {
    /** Currently attached overlays in the order they were attached. */
    attachedOverlay: OverlayRef<T>;
    attachedOverlays: OverlayRef<T>[];
};

export type DispatcherOverlay<T> = Partial<ChangesDispatcherOverlay<T>> & {
    document: Document;
    isAttached: boolean;
};
