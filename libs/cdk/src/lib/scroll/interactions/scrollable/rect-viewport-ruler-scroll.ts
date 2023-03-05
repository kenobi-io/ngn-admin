import { pipe } from 'rxjs';

import { ViewportRulerScroll } from '../../data';
import { positionViewportRulerScroll } from './position-viewport-ruler-scroll';
import { sizeViewportRulerScroll } from './size-viewport-ruler-scroll';

/** Gets a ClientRect for the viewport's bounds. */
export const rectViewportRulerScroll = (
    vrs: ViewportRulerScroll
): ViewportRulerScroll => {
    const setRect = (vrs: ViewportRulerScroll): ViewportRulerScroll => {
        const { startPosition, viewportSize } = vrs;

        if (startPosition && viewportSize) {
            vrs.rect = {
                bottom: startPosition.top + viewportSize.height,
                height: viewportSize.height,
                left: startPosition.left,
                right: startPosition.left + viewportSize.width,
                top: startPosition.top,
                width: viewportSize.width,
            };
        }

        return vrs;
    };
    // Use the document element's bounding rect rather than the window scroll properties
    // (e.g. pageYOffset, scrollY) due to in issue in Chrome and IE where window scroll
    // properties and client coordinates (boundingClientRect, clientX/Y, etc.) are in different
    // conceptual viewports. Under most circumstances these viewports are equivalent, but they
    // can disagree when the page is pinch-zoomed (on devices that support touch).
    // See https://bugs.chromium.org/p/chromium/issues/detail?id=489206#c4
    // We use the documentElement instead of the body because, by default (without a css reset)
    // browsers typically give the document body an 8px margin, which is not included in
    // getBoundingClientRect().
    return pipe(
        positionViewportRulerScroll,
        sizeViewportRulerScroll,
        setRect
    )(vrs);
};
