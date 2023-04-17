/** Record of measurements for how an overlay (at a given position) fits into the viewport. */
export interface OverlayFit {
    /** Whether the overlay fits completely in the viewport. */
    isCompletelyWithinViewport: boolean;

    /** Whether the overlay fits in the viewport on the y-axis. */
    fitsInViewportVertically: boolean;

    /** Whether the overlay fits in the viewport on the x-axis. */
    fitsInViewportHorizontally: boolean;

    /** The total visible area (in px^2) of the overlay inside the viewport. */
    visibleArea: number;
}
