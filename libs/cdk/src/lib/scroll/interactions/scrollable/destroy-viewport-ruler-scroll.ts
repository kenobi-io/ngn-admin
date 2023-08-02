import { ViewportRulerScroll } from '../../data';

export const destroyViewportRulerScroll = (
    vrs: ViewportRulerScroll
): ViewportRulerScroll => {
    const { change, document, listener, platform } = vrs;

    if (platform.isBrowser && listener) {
        const windowRef: Window = document.defaultView || window;
        windowRef.removeEventListener('resize', listener);
        windowRef.removeEventListener('orientationchange', listener);
    }
    change.complete();

    return vrs;
};
