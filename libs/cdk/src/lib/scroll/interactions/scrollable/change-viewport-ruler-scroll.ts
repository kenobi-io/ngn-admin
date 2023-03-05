import { auditTime } from 'rxjs/operators';

import { ViewportRulerScroll } from '../../data';

/**
 * Returns a stream that emits whenever the size of the viewport changes.
 * This stream emits outside of the Angular zone.
 * @param throttleTime Time in milliseconds to throttle the stream.
 */
export const changeViewportRulerScroll = (
    vrs: ViewportRulerScroll
): ViewportRulerScroll => {
    const { change, throttleTime } = vrs;
    vrs.timeChange =
        throttleTime > 0
            ? change.pipe(auditTime(throttleTime))
            : change.asObservable();
    return vrs;
};
