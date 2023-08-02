import { Mono, mono } from '@core-template';
import { auditTime } from 'rxjs/operators';

import { UnaryViewportRulerScroll, ViewportRulerScroll } from '../../data';

type ChangeViewportRulerScroll = {
    (): Mono<ViewportRulerScroll>;
    (viewportRuler: ViewportRulerScroll): ViewportRulerScroll;
};

/**
 * Returns a stream that emits whenever the size of the viewport changes.
 * This stream emits outside of the Angular zone.
 * @param throttleTime Time in milliseconds to throttle the stream.
 */

export const changeViewportRulerScroll: UnaryViewportRulerScroll = () =>
    mono(({ viewportRulerScroll: ViewportRulerScroll }) => {
        if (ViewportRulerScroll) {
            const { change, throttleTime } = ViewportRulerScroll;

            ViewportRulerScroll.timeChange =
                throttleTime > 0
                    ? change.pipe(auditTime(throttleTime))
                    : change.asObservable();
        }
    });
