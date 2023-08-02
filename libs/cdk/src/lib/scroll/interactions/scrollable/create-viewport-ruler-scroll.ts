import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import { Subject } from 'rxjs';

import {
    changes,
    outZone,
    PLATFORM_TOKEN,
    ZONE_TOKEN,
} from '../../../platform';
import { DEFAULT_RESIZE_TIME, ViewportRulerScroll } from '../../data';
import { changeViewportRulerScroll } from './change-viewport-ruler-scroll';

export const CHANGE_VIEWPORT_RULER_SCROLL =
    new InjectionToken<ViewportRulerScroll>('[CHANGE_VIEWPORT_RULER_SCROLL]');

export const createViewportRulerScroll = (
    change?: Partial<ViewportRulerScroll>
): ViewportRulerScroll => {
    const vrs: ViewportRulerScroll = {
        change: new Subject<Event>(),
        document: inject(DOCUMENT),
        /** Event listener that will be used to handle the viewport change events. */
        listener: function (this: ViewportRulerScroll, event: Event): void {
            this.change.next(event);
        },
        ngZone: inject(ZONE_TOKEN),
        platform: inject(PLATFORM_TOKEN),
        throttleTime: DEFAULT_RESIZE_TIME,
    };
    outZone(vrs.ngZone, () => {
        if (vrs.platform.isBrowser) {
            const windowRef: Window = vrs.document.defaultView || window;

            // Note that bind the events ourselves, rather than going through something like RxJS's
            // `fromEvent` so that we can ensure that they're bound outside of the NgZone.
            windowRef.addEventListener('resize', vrs.listener);
            windowRef.addEventListener('orientationchange', vrs.listener);
        }

        // Clear the cached position so that the viewport is re-measured next time it is required.
        // We don't need to keep track of the subscription, because it is completed on destroy.
        changeViewportRulerScroll(vrs);
        vrs.timeChange?.subscribe(() => (vrs.viewportSize = undefined));
    });
    changes(vrs, change, CHANGE_VIEWPORT_RULER_SCROLL);

    return vrs;
};

export const VIEWPORT_RULER_SCROLL = new InjectionToken<ViewportRulerScroll>(
    '[VIEWPORT_RULER_SCROLL]',
    { factory: () => createViewportRulerScroll() }
);
