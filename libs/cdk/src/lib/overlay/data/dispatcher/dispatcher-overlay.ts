import { Overlay } from '../overlay';

type ChangesDispatcherOverlay<T> = {
    /** Currently attached overlays in the order they were attached. */
    attachedOverlay: Overlay<T>; // TODO: cyclic dependency
    attachedOverlays: Overlay<T>[];
};

export type DispatcherOverlay<T = unknown> = Partial<
    ChangesDispatcherOverlay<T>
> & {
    document: Document;
    isAttached: boolean;
};

export type DispatcherOverlayCapability<T = unknown> = {
    dispatcherOverlay?: DispatcherOverlay<T>;
};
