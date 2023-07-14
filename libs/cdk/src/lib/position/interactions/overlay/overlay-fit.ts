// import { Dimension, Point } from '../../../platform';
// import { FlexibleConnectedPosition, OverlayFit } from '../../data';
// import { roundedBoundingClientRect } from '../flexible-connected';

// /** @internal Gets how well an overlay at the given point will fit within the viewport. */
// export const overlayFit = (
//     point: Point,
//     rawOverlayRect: Dimension,
//     viewport: Dimension,
//     position: FlexibleConnectedPosition
// ): OverlayFit => {
//     // Round the overlay rect when comparing against the
//     // viewport, because the viewport is always rounded.
//     const overlay = roundedBoundingClientRect({ clientRect: rawOverlayRect });
//     let { x, y } = point;
//     const offsetX = this._getOffset(position, 'x');
//     const offsetY = this._getOffset(position, 'y');

//     // Account for the offsets since they could push the overlay out of the viewport.
//     if (offsetX) {
//         x += offsetX;
//     }

//     if (offsetY) {
//         y += offsetY;
//     }

//     // How much the overlay would overflow at this position, on each side.
//     const leftOverflow = 0 - x;
//     const rightOverflow = x + overlay.width - viewport.width;
//     const topOverflow = 0 - y;
//     const bottomOverflow = y + overlay.height - viewport.height;

//     // Visible parts of the element on each axis.
//     const visibleWidth = this._subtractOverflows(
//         overlay.width,
//         leftOverflow,
//         rightOverflow
//     );
//     const visibleHeight = this._subtractOverflows(
//         overlay.height,
//         topOverflow,
//         bottomOverflow
//     );
//     const visibleArea = visibleWidth * visibleHeight;

//     return {
//         fitsInViewportHorizontally: visibleWidth == overlay.width,
//         fitsInViewportVertically: visibleHeight === overlay.height,
//         isCompletelyWithinViewport:
//             overlay.width * overlay.height === visibleArea,
//         visibleArea,
//     };
// };
