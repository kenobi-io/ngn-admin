import { inject, InjectionToken } from '@angular/core';
import { Model } from '@core-template';

import { changes, ZONE_TOKEN } from '../../../../platform';
import { RepositionStrategyScroll } from '../../../data';
import { DISPATCHER_SCROLL } from '../../dispatcher';
import { VIEWPORT_RULER_SCROLL } from '../../scrollable';

export const CHANGE_REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    RepositionStrategyScroll<Model>
>('[CHANGE_REPOSITION_STRATEGY_SCROLL]');

export const createRepositionStrategyScroll = <T>(
    change?: Partial<RepositionStrategyScroll<T>>
): RepositionStrategyScroll<T> => {
    const reposition: RepositionStrategyScroll<T> = {
        dispatcher: inject(DISPATCHER_SCROLL),
        ngZone: inject(ZONE_TOKEN),
        viewportRulerScroll: inject(VIEWPORT_RULER_SCROLL),
    };
    changes(reposition, change, CHANGE_REPOSITION_STRATEGY_SCROLL);

    return reposition;
};

export const REPOSITION_STRATEGY_SCROLL = new InjectionToken<
    RepositionStrategyScroll<Model>
>('[REPOSITION_STRATEGY_SCROLL]', {
    factory: () => createRepositionStrategyScroll(),
});
