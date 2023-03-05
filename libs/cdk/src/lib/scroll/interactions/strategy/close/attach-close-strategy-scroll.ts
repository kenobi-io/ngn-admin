import { CloseStrategyScroll } from '../../../data';

/** Attaches this scroll strategy to an overlay. */
export const attachCloseStrategyScroll = <T>(
    strategy: CloseStrategyScroll<T>
): CloseStrategyScroll<T> => {
    strategy.overlay = strategy.config?.overlay;

    return strategy;
};
