import { Overlay } from '../../data';

/** Switches to a new position strategy and updates the overlay position. */
export const updatePositionStrategyOverlayRef = <T>(
    overlay: Overlay<T>
): Overlay<T> => {
    // const { portalOutlet, togglePositionStrategy } = overlay;

    // if (togglePositionStrategy === overlay.positionStrategy) {
    //     return overlay;
    // }
    // overlay.positionStrategy?.dispose();
    // overlay.positionStrategy = togglePositionStrategy;

    // if (hasAttached(portalOutlet?.portal)) {
    //     togglePositionStrategy?.attach(overlay);
    //     // don't calls updatePositionAttach
    //     // cause use.positionStrategy rewrite
    //     overlay.positionStrategy?.apply();
    // }

    return overlay;
};
