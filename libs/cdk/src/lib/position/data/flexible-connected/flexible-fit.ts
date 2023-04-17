import { BoundingBoxRect, Dimension, Point } from '../../../platform';
import { FlexibleConnectedPosition } from './flexible-connected-position';

/** Record of measures determining how well a given position will fit with flexible dimensions. */
export interface FlexibleFit {
    position: FlexibleConnectedPosition;
    origin: Point;
    overlayRect: Dimension;
    boundingBoxRect: BoundingBoxRect;
}
