import { mono } from '@core-template';
import { auditTime } from 'rxjs/operators';

import {
    MonoStrategyScrollCapability,
    StrategyScrollCapability,
} from '../../data';

/**
 * Returns a stream that emits whenever the size of the viewport changes.
 * This stream emits outside of the Angular zone.
 * @param throttleTime Time in milliseconds to throttle the stream.
 */

export const changeViewportRulerScroll: MonoStrategyScrollCapability<
    StrategyScrollCapability
> = () =>
    mono(({ strategyScroll }) => {
        if (strategyScroll) {
            const { viewportRulerScroll } = strategyScroll;
            const { change, throttleTime } = viewportRulerScroll;

            viewportRulerScroll.timeChange =
                throttleTime > 0
                    ? change.pipe(auditTime(throttleTime))
                    : change.asObservable();
        }
    });
