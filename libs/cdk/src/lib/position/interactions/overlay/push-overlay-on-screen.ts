// import { ViewportScrollPosition } from '@angular/cdk/scrolling';

// import { Dimension, Point } from '../../../platform';
// import { roundedBoundingClientRect } from '../flexible-connected';

// /**
//  * Gets the point at which the overlay can be "pushed" on-screen. If the overlay is larger than
//  * the viewport, the top-left corner will be pushed on-screen (with overflow occurring on the
//  * right and bottom).
//  * @internal
//  * @param start Starting point from which the overlay is pushed.
//  * @param rawOverlayRect Dimensions of the overlay.
//  * @param scrollPosition Current viewport scroll position.
//  * @returns The point at which to position the overlay after pushing. This is effectively a new
//  *     originPoint.
//  */

// export const pushOverlayOnScreen = (
//     start: Point,
//     rawOverlayRect: Dimension,
//     scrollPosition: ViewportScrollPosition
// ): Point => {
//     // If the position is locked and we've pushed the overlay already, reuse the previous push
//     // amount, rather than pushing it again. If we were to continue pushing, the element would
//     // remain in the viewport, which goes against the expectations when position locking is enabled.
//     if (this._previousPushAmount && this._positionLocked) {
//         return {
//             x: start.x + this._previousPushAmount.x,
//             y: start.y + this._previousPushAmount.y,
//         };
//     }

//     // Round the overlay rect when comparing against the
//     // viewport, because the viewport is always rounded.
//     const overlay = roundedBoundingClientRect({ clientRect: rawOverlayRect });
//     const viewport = this._viewportRect;

//     // Determine how much the overlay goes outside the viewport on each
//     // side, which we'll use to decide which direction to push it.
//     const overflowRight = Math.max(start.x + overlay.width - viewport.width, 0);
//     const overflowBottom = Math.max(
//         start.y + overlay.height - viewport.height,
//         0
//     );
//     const overflowTop = Math.max(
//         viewport.top - scrollPosition.top - start.y,
//         0
//     );
//     const overflowLeft = Math.max(
//         viewport.left - scrollPosition.left - start.x,
//         0
//     );

//     // Amount by which to push the overlay in each axis such that it remains on-screen.
//     let pushX = 0;
//     let pushY = 0;

//     // If the overlay fits completely within the bounds of the viewport, push it from whichever
//     // direction is goes off-screen. Otherwise, push the top-left corner such that its in the
//     // viewport and allow for the trailing end of the overlay to go out of bounds.
//     if (overlay.width <= viewport.width) {
//         pushX = overflowLeft || -overflowRight;
//     } else {
//         pushX =
//             start.x < this._viewportMargin
//                 ? viewport.left - scrollPosition.left - start.x
//                 : 0;
//     }

//     if (overlay.height <= viewport.height) {
//         pushY = overflowTop || -overflowBottom;
//     } else {
//         pushY =
//             start.y < this._viewportMargin
//                 ? viewport.top - scrollPosition.top - start.y
//                 : 0;
//     }

//     this._previousPushAmount = { x: pushX, y: pushY };

//     return {
//         x: start.x + pushX,
//         y: start.y + pushY,
//     };
// };
