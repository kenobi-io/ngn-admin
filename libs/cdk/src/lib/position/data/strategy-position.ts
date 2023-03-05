import { Overlay } from '../../overlay';
import { BoundingBoxRect } from '../../platform';

type ChangeStrategyPosition<T> = { overlay: Overlay<T> };

/** Strategy for setting the position on an overlay. */
export type StrategyPosition<T> = Partial<ChangeStrategyPosition<T>> & {
    isDisposed: boolean;
    boundingBoxRect: BoundingBoxRect;
    /** Default offset for the overlay along the l,r,t,b axis. */
    // offset: Offset;
};
