import { Overlay } from '../../../data';

/** Updates the position of the overlay based on the position strategy. */
export const updatePositionOverlayRef = <T>(
    overlay: Overlay<T>
): Overlay<T> => {
    overlay.positionStrategy?.apply();
    return overlay;
};
