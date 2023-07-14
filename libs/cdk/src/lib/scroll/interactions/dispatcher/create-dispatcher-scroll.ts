import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import { Model } from '@core-template';
import { Subject, Subscription } from 'rxjs';

import { Scrollable } from '../../../directive';
import { changes, ZONE_TOKEN } from '../../../platform';
import { DEFAULT_SCROLL_TIME, DispatcherScroll } from '../../data';

export const CHANGE_DISPATCHER_SCROLL = new InjectionToken<
    DispatcherScroll<Model>
>('[CHANGE_DISPATCHER_SCROLL]');

/**
 * @changes document, ngZone
 */
export const createDispatcherScroll = <T>(
    change?: Partial<DispatcherScroll<T>>
): DispatcherScroll<T> => {
    const dispatcher: DispatcherScroll<T> = {
        auditTimeInMs: DEFAULT_SCROLL_TIME,
        count: 0,
        document: inject(DOCUMENT),
        ngZone: inject(ZONE_TOKEN),
        scrollContainers: new Map<Scrollable<T>, Subscription>(),
        scrolled: new Subject<Scrollable<T> | void>(),
    };
    changes(dispatcher, change, CHANGE_DISPATCHER_SCROLL);

    return dispatcher;
};

export const DISPATCHER_SCROLL = new InjectionToken<DispatcherScroll<Model>>(
    '[DISPATCHER_SCROLL]',
    {
        factory: () => createDispatcherScroll(),
    }
);
