import { OverlayRef } from '../../data';

/** Switches to a new position strategy and updates the overlay position. */
export const updatePositionStrategyOverlayRef = <T>(
    overlayRef: OverlayRef<T>
): OverlayRef<T> => {
    // const { portalOutlet, togglePositionStrategy } = overlayRef;

    // if (togglePositionStrategy === overlayRef.positionStrategy) {
    //     return overlayRef;
    // }
    // overlayRef.positionStrategy?.dispose();
    // overlayRef.positionStrategy = togglePositionStrategy;

    // if (hasAttached(portalOutlet?.portal)) {
    //     togglePositionStrategy?.attach(overlayRef);
    //     // don't calls updatePositionAttach
    //     // cause use.positionStrategy rewrite
    //     overlayRef.positionStrategy?.apply();
    // }

    return overlayRef;
};
