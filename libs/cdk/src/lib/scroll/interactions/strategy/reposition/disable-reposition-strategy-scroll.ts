import { InjectionToken } from '@angular/core';
import { Finish, Mono, mono } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';

type DisableRepositionStrategyScroll = <T>(
    finish?: Finish
) => Mono<RepositionStrategyScroll<T>>;

/** Disables repositioning of the attached overlay on scroll. */
export const disableRepositionStrategyScroll: DisableRepositionStrategyScroll =
    (finish) =>
        mono((strategy) => {
            if (strategy.subscription) {
                strategy.subscription.unsubscribe();
                strategy.subscription = undefined;
            }
        }, finish);

export const DISABLE_REPOSITION_STRATEGY_SCROLL =
    new InjectionToken<DisableRepositionStrategyScroll>(
        '[DISABLE_REPOSITION_STRATEGY_SCROLL]',
        {
            factory: () => disableRepositionStrategyScroll,
        }
    );
