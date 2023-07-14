import { changes } from '../../platform';
import { StrategyScroll, UnaryStrategyScroll } from '../../scroll';
import { ConfigOverlay } from '../data';

export const configOverlay = <
    T,
    K extends StrategyScroll<T> = StrategyScroll<T>
>(
    config?: Partial<ConfigOverlay<T, K>>,
    strategy?: StrategyScroll<T>,
    strategiesScrollOverlay?: UnaryStrategyScroll<T>
): ConfigOverlay<T, K> => {
    const configOverlay: ConfigOverlay<T, K> = {
        backdropClass: 'cdk-overlay-dark-backdrop',
        disposeOnNavigation: false,
        hasBackdrop: false,
        panelClass: '',
        // positionStrategy: /* inject()*/,
        strategyScroll: strategy && (strategiesScrollOverlay?.(strategy) as K),
    };
    changes(configOverlay, config);

    return configOverlay;
};
