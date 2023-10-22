import { Zonality } from '../../directive';
import { Overlay } from '../../overlay';
import { BoundingBoxRect } from '../../platform';

/** Strategy for setting the position on an overlay. */
export type StrategyPosition<T = unknown> = Zonality & {
    isDisposed: boolean;
    boundingBoxRect: BoundingBoxRect;
    overlay?: Overlay<T>;
    /** Default offset for the overlay along the l,r,t,b axis. */
    // offset: Offset;
};
