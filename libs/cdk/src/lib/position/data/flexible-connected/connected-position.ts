import {
    HorizontalConnectionPos,
    ScrollingVisibility,
    VerticalConnectionPos,
} from '@angular/cdk/overlay';

/** The points of the origin element and the overlay element to connect. */
export type ConnectionPositionPair = {
    /** X-axis attachment point for connected overlay origin. Can be 'start', 'end', or 'center'. */
    originX: HorizontalConnectionPos;
    /** Y-axis attachment point for connected overlay origin. Can be 'top', 'bottom', or 'center'. */
    originY: VerticalConnectionPos;
    /** X-axis attachment point for connected overlay. Can be 'start', 'end', or 'center'. */
    overlayX: HorizontalConnectionPos;
    /** Y-axis attachment point for connected overlay. Can be 'top', 'bottom', or 'center'. */
    overlayY: VerticalConnectionPos;
};

/** The change event emitted by the strategy when a fallback position is used. */
export type ConnectedOverlayPositionChange = {
    /** The position used as a result of this change. */
    connectionPair: ConnectionPositionPair;
    /** @docs-private */
    scrollableViewProperties: ScrollingVisibility;
};
