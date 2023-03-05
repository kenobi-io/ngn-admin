import { ViewportRulerScroll } from '../../data';

/** Returns the viewport's width and height. */

export const sizeViewportRulerScroll = (
    vrs: ViewportRulerScroll
): ViewportRulerScroll => {
    const { platform } = vrs;
    /** Updates the cached viewport size. */
    const updateViewportSize = (): void => {
        const windowRef = document.defaultView || window;
        vrs.viewportSize = platform.isBrowser
            ? { height: windowRef.innerHeight, width: windowRef.innerWidth }
            : { height: 0, width: 0 };
    };

    if (!vrs.viewportSize) {
        updateViewportSize();
    }

    // if (vrs.viewportSize) {
    //    vrs.outputSize = {
    //        height: vrs.viewportSize?.height,
    //        width: vrs.viewportSize?.width,
    //    };
    // }

    // If we're not on a browser, don't cache the size since it'll be mocked out anyway.
    if (!platform.isBrowser) {
        vrs.viewportSize = undefined;
    }

    return vrs;
};
