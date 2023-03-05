interface ChangesFlexibleConnectedPosition {
    weight: number;
    offsetX: number;
    offsetY: number;
    panelClass: string | string[];
}
/** A connected position as specified by the user. */
export interface FlexibleConnectedPosition
    extends Partial<ChangesFlexibleConnectedPosition> {
    originX: 'start' | 'center' | 'end';
    originY: 'top' | 'center' | 'bottom';

    overlayX: 'start' | 'center' | 'end';
    overlayY: 'top' | 'center' | 'bottom';
}
