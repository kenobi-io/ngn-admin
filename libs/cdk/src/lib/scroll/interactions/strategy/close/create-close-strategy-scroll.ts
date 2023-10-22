import { inject, InjectionToken } from '@angular/core';
import { Model } from '@core-template';

import { changes, ZONE_TOKEN } from '../../../../platform';
import { CloseStrategyScroll } from '../../../data';
import { DISPATCHER_SCROLL } from '../../dispatcher';
import { VIEWPORT_RULER_SCROLL } from '../../scrollable';

export const CHANGE_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    CloseStrategyScroll<Model>
>('[CHANGE_CLOSE_STRATEGY_SCROLL]');

export const createCloseStrategyScroll = <T>(
    change?: Partial<CloseStrategyScroll<T>>
): CloseStrategyScroll<T> => {
    const close: CloseStrategyScroll<T> = {
        dispatcher: inject(DISPATCHER_SCROLL),
        ngZone: inject(ZONE_TOKEN),
        viewportRulerScroll: inject(VIEWPORT_RULER_SCROLL),
    };
    changes(close, change, CHANGE_CLOSE_STRATEGY_SCROLL);

    return close;
};

export const CLOSE_STRATEGY_SCROLL = new InjectionToken<
    CloseStrategyScroll<Model>
>('[CLOSE_STRATEGY_SCROLL]', {
    factory: () => createCloseStrategyScroll(),
});
