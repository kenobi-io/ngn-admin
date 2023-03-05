import { unsubscribing } from '@core-template';

import { CloseStrategyScroll } from '../../../data';

/** Disables the closing the attached overlay on scroll. */
export const disableCloseStrategyScroll = <T>(
    strategy: CloseStrategyScroll<T>
): CloseStrategyScroll<T> => {
    const { scrollSubscriptions } = strategy;
    unsubscribing(scrollSubscriptions);

    return strategy;
};
