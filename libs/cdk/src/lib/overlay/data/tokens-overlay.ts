import { InjectionToken } from '@angular/core';
import { Model, Mono } from '@core-template';

import { createOverlay } from '../interactions';
import { Overlay } from './overlay';

export const OVERLAY = new InjectionToken<Overlay<Model>>('[OVERLAY]', {
    factory: () => createOverlay(),
});

export const CHANGE_OVERLAY = new InjectionToken<Overlay<Model>>(
    '[CHANGE_OVERLAY]'
);

export const ATTACH_STRATEGY_SCROLL_OVERLAY = new InjectionToken<Mono<Model>>(
    '[ATTACH_STRATEGY_SCROLL_OVERLAY]'
);

export const DETACH_STRATEGY_SCROLL_OVERLAY = new InjectionToken<Mono<Model>>(
    '[DETACH_STRATEGY_SCROLL_OVERLAY]'
);

export const DISABLE_STRATEGY_SCROLL_OVERLAY = new InjectionToken<Mono<Model>>(
    '[DISABLE_STRATEGY_SCROLL_OVERLAY]'
);

export const ENABLE_STRATEGY_SCROLL_OVERLAY = new InjectionToken<Mono<Model>>(
    '[ENABLE_STRATEGY_SCROLL_OVERLAY]'
);
