import { RepositionStrategyScroll } from '../../../data';
import { disableRepositionStrategyScroll } from './disable-reposition-strategy-scroll';

export const detachRepositionStrategyScroll = <T>(
    strategy: RepositionStrategyScroll<T>
): RepositionStrategyScroll<T> => {
    disableRepositionStrategyScroll(strategy);
    strategy.overlayRef = undefined;

    return strategy;
};
