import { OverlayRef } from '../../../data';

/** Updates the position of the overlay based on the position strategy. */
export const updatePositionOverlayRef = <T>(
    overlayRef: OverlayRef<T>
): OverlayRef<T> => {
    overlayRef.positionStrategy?.apply();
    return overlayRef;
};
