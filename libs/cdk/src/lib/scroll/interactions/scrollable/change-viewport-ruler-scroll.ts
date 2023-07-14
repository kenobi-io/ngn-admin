import { Unary, unary } from '@core-template';
import { auditTime } from 'rxjs/operators';

import { ViewportRulerScroll } from '../../data';

type ChangeViewportRulerScroll = {
    (): Unary<ViewportRulerScroll>;
    (viewportRuler: ViewportRulerScroll): ViewportRulerScroll;
};

/**
 * Returns a stream that emits whenever the size of the viewport changes.
 * This stream emits outside of the Angular zone.
 * @param throttleTime Time in milliseconds to throttle the stream.
 */
export const changeViewportRulerScroll: ChangeViewportRulerScroll = <
    T extends ViewportRulerScroll
>(
    viewportRuler?: T
): T | Unary<T> =>
    viewportRuler ? set(viewportRuler) : unary((target) => set(target));

const set = <T extends ViewportRulerScroll>(viewportRuler: T): T => {
    const { change, throttleTime } = viewportRuler;

    viewportRuler.timeChange =
        throttleTime > 0
            ? change.pipe(auditTime(throttleTime))
            : change.asObservable();

    return viewportRuler;
};
