import { InjectionToken } from '@angular/core';
import { Finish, Mono, unary } from '@core-template';

import { RepositionStrategyScroll } from '../../../data';

type DisableRepositionStrategyScroll = <T>(
    finish?: Finish
) => Mono<RepositionStrategyScroll<T>>;

/** Disables repositioning of the attached overlay on scroll. */
export const disableRepositionStrategyScroll: DisableRepositionStrategyScroll =
    (finish) =>
        unary((strategy) => {
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
