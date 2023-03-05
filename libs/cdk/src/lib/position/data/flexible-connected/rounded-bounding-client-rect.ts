import { Dimension } from '../../../platform/data/dom';

/**
 * Gets a version of an element's bounding `ClientRect` where all the values are rounded down to
 * the nearest pixel. This allows us to account for the cases where there may be sub-pixel
 * deviations in the `ClientRect` returned by the browser (e.g. when zoomed in with a percentage
 * size, see #21350).
 */
export const roundedBoundingClientRect = ({
    clientRect,
}: {
    clientRect: Dimension;
}): Dimension => {
    return {
        bottom: Math.floor(clientRect.bottom),
        height: Math.floor(clientRect.height),
        left: Math.floor(clientRect.left),
        right: Math.floor(clientRect.right),
        top: Math.floor(clientRect.top),
        width: Math.floor(clientRect.width),
    };
};
