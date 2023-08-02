import { OverlayCapability } from '../../overlay';
import { BoundingBoxRect } from '../../platform';

/** Strategy for setting the position on an overlay. */
export type StrategyPosition<T> = Partial<OverlayCapability<T>> & {
    isDisposed: boolean;
    boundingBoxRect: BoundingBoxRect;
    /** Default offset for the overlay along the l,r,t,b axis. */
    // offset: Offset;
};

export type StrategyPositionCapability<T> = {
    strategyPosition: StrategyPosition<T>;
};
