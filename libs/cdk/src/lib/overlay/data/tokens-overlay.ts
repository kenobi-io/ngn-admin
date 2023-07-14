import { InjectionToken } from '@angular/core';
import { Model, Unary } from '@core-template';

import { createOverlay } from '../interactions';
import { Overlay } from './overlay';

export const OVERLAY = new InjectionToken<Overlay<Model>>('[OVERLAY]', {
    factory: () => createOverlay(),
});

export const CHANGE_OVERLAY = new InjectionToken<Overlay<Model>>(
    '[CHANGE_OVERLAY]'
);

export const ATTACH_STRATEGY_SCROLL_OVERLAY = new InjectionToken<Unary<Model>>(
    '[ATTACH_STRATEGY_SCROLL_OVERLAY]'
);

export const DETACH_STRATEGY_SCROLL_OVERLAY = new InjectionToken<Unary<Model>>(
    '[DETACH_STRATEGY_SCROLL_OVERLAY]'
);

export const DISABLE_STRATEGY_SCROLL_OVERLAY = new InjectionToken<Unary<Model>>(
    '[DISABLE_STRATEGY_SCROLL_OVERLAY]'
);

export const ENABLE_STRATEGY_SCROLL_OVERLAY = new InjectionToken<Unary<Model>>(
    '[ENABLE_STRATEGY_SCROLL_OVERLAY]'
);
