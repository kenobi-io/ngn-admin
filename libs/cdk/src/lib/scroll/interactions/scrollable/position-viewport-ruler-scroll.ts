import { ViewportRulerScroll } from '../../data';

/** Gets the (top, left) scroll position of the viewport. */
export const positionViewportRulerScroll = (
    vrs: ViewportRulerScroll
): ViewportRulerScroll => {
    const { document, platform } = vrs;
    // While we can get a reference to the fake document
    // during SSR, it doesn't have getBoundingClientRect.
    if (!platform.isBrowser) {
        vrs.startPosition = { left: 0, top: 0 };
        return vrs;
    }
    // The top-left-corner of the viewport is determined by the scroll position of the document
    // body, normally just (scrollLeft, scrollTop). However, Chrome and Firefox disagree about
    // whether `document.body` or `document.documentElement` is the scrolled element, so reading
    // `scrollTop` and `scrollLeft` is inconsistent. However, using the bounding rect of
    // `document.documentElement` works consistently, where the `top` and `left` values will
    // equal negative the scroll position.
    const windowRef = document.defaultView || window;
    const { documentElement } = document;
    const documentRect = documentElement.getBoundingClientRect();
    const top =
        -documentRect.top ||
        document.body.scrollTop ||
        windowRef.scrollY ||
        documentElement.scrollTop ||
        0;
    const left =
        -documentRect.left ||
        document.body.scrollLeft ||
        windowRef.scrollX ||
        documentElement.scrollLeft ||
        0;
    vrs.startPosition = { left, top };

    return vrs;
};
