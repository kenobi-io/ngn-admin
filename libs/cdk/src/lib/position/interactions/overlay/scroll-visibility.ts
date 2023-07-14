/**
 * Gets the view properties of the trigger and overlay, including whether they are clipped
 * @internal
 * or completely outside the view of any of the strategy's scrollables.
 */

import {
    isElementClippedByScrolling,
    isElementScrolledOutsideView,
} from '../../../scroll';

export const getScrollVisibility = (): ScrollingVisibility => {
    // Note: needs fresh rects since the position could've changed.
    const originBounds = this._getOriginRect();
    const overlayBounds = this._pane.getBoundingClientRect();

    // TODO(jelbourn): instead of needing all of the client rects for these scrolling containers
    // every time, we should be able to use the scrollTop of the containers if the size of those
    // containers hasn't changed.
    const scrollContainerBounds = this._scrollables.map((scrollable) => {
        return scrollable.getElementRef().nativeElement.getBoundingClientRect();
    });

    return {
        isOriginClipped: isElementClippedByScrolling(
            originBounds,
            scrollContainerBounds
        ),
        isOriginOutsideView: isElementScrolledOutsideView(
            originBounds,
            scrollContainerBounds
        ),
        isOverlayClipped: isElementClippedByScrolling(
            overlayBounds,
            scrollContainerBounds
        ),
        isOverlayOutsideView: isElementScrolledOutsideView(
            overlayBounds,
            scrollContainerBounds
        ),
    };
};
