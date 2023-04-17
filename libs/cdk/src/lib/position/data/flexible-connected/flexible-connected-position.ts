import { XOverlayPosition, YOverlayPosition } from '../overlay';

interface ChangesFlexibleConnectedPosition {
    weight: number;
    offsetX: number;
    offsetY: number;
    panelClass: string | string[];
}
/** A connected position as specified by the user. */
export interface FlexibleConnectedPosition
    extends Partial<ChangesFlexibleConnectedPosition> {
    originX: XOverlayPosition;
    originY: YOverlayPosition;
    overlayX: XOverlayPosition;
    overlayY: YOverlayPosition;
}
