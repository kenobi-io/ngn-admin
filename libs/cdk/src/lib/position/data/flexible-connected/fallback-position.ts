import { Dimension, Point } from '../../../platform';
import { FlexibleConnectedPosition } from './flexible-connected-position';
import { OverlayFit } from './overlay-fit';

/** Record of the measurements determining whether an overlay will fit in a specific position. */
export interface FallbackPosition {
    position: FlexibleConnectedPosition;
    originPoint: Point;
    overlayPoint: Point;
    overlayFit: OverlayFit;
    overlayRect: Dimension;
}
