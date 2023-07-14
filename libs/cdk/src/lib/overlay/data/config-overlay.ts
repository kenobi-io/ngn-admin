/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Direction, Directionality } from '@angular/cdk/bidi';

import { StrategyScroll } from '../../scroll/data';

// type Data<T> = unknown;

type ChangeConfigOverlay<T, StrategiesScrollOverlay> = {
    /**
     * Direction of the text in the overlay panel. If a `Directionality` instance
     * is passed in, the overlay will handle changes to its value automatically.
     */
    direction: Direction | Directionality;
    // kindStrategiesScroll: KindStrategiesScroll;
    /** The width of the overlay panel. If a number is provided, pixel units are assumed. */
    width: string | number;
    /** The height of the overlay panel. If a number is provided, pixel units are assumed. */
    height: string | number;
    /** The min-width of the overlay panel. If a number is provided, pixel units are assumed. */
    minWidth: string | number;
    /** The min-height of the overlay panel. If a number is provided, pixel units are assumed. */
    minHeight: string | number;
    /** The max-width of the overlay panel. If a number is provided, pixel units are assumed. */
    maxWidth: string | number;
    /** The max-height of the overlay panel. If a number is provided, pixel units are assumed. */
    maxHeight: string | number;
    // /** Strategy with which to position the overlay. */
    // positionStrategy: PositionStrategy; // TODO: add dcing PositionStrategy
    /** Strategy to be used when handling scroll events while the overlay is open. */
    strategyScroll: StrategiesScrollOverlay;
};

export type ConfigOverlay<
    T,
    StrategyScrollOverlay extends StrategyScroll<T> = StrategyScroll<T>
> = Partial<ChangeConfigOverlay<T, StrategyScrollOverlay>> & {
    /** Custom class to add to the overlay pane. */
    panelClass?: string | string[];
    /** Whether the overlay has a backdrop. */
    hasBackdrop?: boolean;
    /** Custom class to add to the backdrop */
    backdropClass?: string | string[];
    /**
     * Whether the overlay should be disposed of when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    disposeOnNavigation?: boolean;
};
