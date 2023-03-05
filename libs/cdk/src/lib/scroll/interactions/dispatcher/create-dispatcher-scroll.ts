import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import { Model } from '@core-template';
import { Subject, Subscription } from 'rxjs';

import { changes, PLATFORM_TOKEN, ZONE_TOKEN } from '../../../platform';
import { DEFAULT_SCROLL_TIME, DispatcherScroll } from '../../data';
import { Scrollable } from '../../directives';

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
        document: change?.document || inject(DOCUMENT),
        ngZone: change?.ngZone || inject(ZONE_TOKEN),
        platform: inject(PLATFORM_TOKEN),
        scrolled: new Subject<Scrollable<T> | void>(),
        subscriptionsOfDirectives: new Map<Scrollable<T>, Subscription>(),
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
