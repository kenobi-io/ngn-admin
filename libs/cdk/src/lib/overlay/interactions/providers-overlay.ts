import { Provider } from '@angular/core';

import { ATTACH_REPOSITION_STRATEGY_SCROLL } from '../../scroll';
import { ATTACH_STRATEGY_SCROLL_OVERLAY } from '../data';

export const STRATEGY_SCROLL_OVERLAY_PROVIDERS: Provider[] = [
    {
        provide: ATTACH_STRATEGY_SCROLL_OVERLAY,
        useValue: ATTACH_REPOSITION_STRATEGY_SCROLL,
    },
];
