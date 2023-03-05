/** Attaches this scroll strategy to an overlay. */

import { RepositionStrategyScroll } from '../../../data';

/**
 *
 * @param strategy - config
 * @returns
 */
export const attachRepositionStrategyScroll = <T>(
    strategy: RepositionStrategyScroll<T>
): RepositionStrategyScroll<T> => {
    // TODO: fix is approach - destructor + spread
    const { overlayRef } = { ...strategy.config };
    strategy.overlayRef = overlayRef;
    return strategy;
};
