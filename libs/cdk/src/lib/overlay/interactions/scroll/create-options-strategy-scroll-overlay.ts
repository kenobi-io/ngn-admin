import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';
import { Model } from '@core-template';

import { changes, ZONE_TOKEN } from '../../../platform';
import {
    BLOCK_STRATEGY_SCROLL,
    CLOSE_STRATEGY_SCROLL,
    DISPATCHER_SCROLL,
    REPOSITION_STRATEGY_SCROLL,
    VIEWPORT_RULER_SCROLL,
} from '../../../scroll';
import { OptionsStrategyScrollOverlay } from '../../data';

export const createOptionsStrategyScrollOverlay = <T>(
    change?: Partial<OptionsStrategyScrollOverlay<T>>
): OptionsStrategyScrollOverlay<T> => {
    const option: OptionsStrategyScrollOverlay<T> = {
        block: inject(BLOCK_STRATEGY_SCROLL),
        close: inject(CLOSE_STRATEGY_SCROLL),
        dispatcher: inject(DISPATCHER_SCROLL),
        document: inject(DOCUMENT),
        ngZone: inject(ZONE_TOKEN),
        noop: {} as ,
        reposition: inject(REPOSITION_STRATEGY_SCROLL),
        viewportRulerScroll: inject(VIEWPORT_RULER_SCROLL),
    };
    changes(option, change, CHANGE_OPTIONS_STRATEGY_SCROLL_OVERLAY);

    return option;
};

export const OPTIONS_STRATEGY_SCROLL_OVERLAY = new InjectionToken<
    OptionsStrategyScrollOverlay<Model>
>('[OPTIONS_STRATEGY_SCROLL_OVERLAY]', {
    factory: () => createOptionsStrategyScrollOverlay(),
});

export const CHANGE_OPTIONS_STRATEGY_SCROLL_OVERLAY = new InjectionToken<
    OptionsStrategyScrollOverlay<Model>
>('[CHANGE_OPTIONS_STRATEGY_SCROLL_OVERLAY]');
