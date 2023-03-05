import { ViewportRulerScroll } from '../../data';

export const destroyViewportRulerScroll = (
    vrs: ViewportRulerScroll
): ViewportRulerScroll => {
    const { change, changeListenerViewportRulerScroll, document, platform } =
        vrs;

    if (platform.isBrowser && changeListenerViewportRulerScroll) {
        const windowRef: Window = document.defaultView || window;
        windowRef.removeEventListener(
            'resize',
            changeListenerViewportRulerScroll
        );
        windowRef.removeEventListener(
            'orientationchange',
            changeListenerViewportRulerScroll
        );
    }
    change.complete();

    return vrs;
};
