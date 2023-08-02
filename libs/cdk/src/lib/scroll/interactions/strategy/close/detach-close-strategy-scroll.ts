import { inject, InjectionToken } from '@angular/core';
import { CapabilityMono, mono, tube } from '@core-template';

import { CloseStrategyScroll } from '../../../data';
import { DISABLE_CLOSE_STRATEGY_SCROLL } from './disable-close-strategy-scroll';

export const detachCloseStrategyScroll: CapabilityMono<
    CloseStrategyScroll<unknown>
> = () =>
    mono((strategy) => {
        const disableCloseStrategyScroll = inject(
            DISABLE_CLOSE_STRATEGY_SCROLL
        );
        tube(
            disableCloseStrategyScroll(),
            (st) => (st.overlay = undefined)
        )(strategy);
    });

export const DETACH_CLOSE_STRATEGY_SCROLL = new InjectionToken<
    CapabilityMono<CloseStrategyScroll<unknown>>
>('[DETACH_CLOSE_STRATEGY_SCROLL]', {
    factory: () => detachCloseStrategyScroll,
});
