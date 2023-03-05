import { RepositionStrategyScroll } from '../../../data';

/** Disables repositioning of the attached overlay on scroll. */
export const disableRepositionStrategyScroll = <T>(
    strategy: RepositionStrategyScroll<T>
): RepositionStrategyScroll<T> => {
    if (strategy.subscription) {
        strategy.subscription.unsubscribe();
        strategy.subscription = undefined;
    }

    return strategy;
};
