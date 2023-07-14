// import { Dimension, pixelValue, Point } from '../../../platform';
// import { OverlayFit } from '../../data';

// /**
//  * Whether the overlay can fit within the viewport when it may resize either its width or height.
//  * @internal
//  * @param fit How well the overlay fits in the viewport at some position.
//  * @param point The (x, y) coordinates of the overlay at some position.
//  * @param viewport The geometry of the viewport.
//  */
// export const canFitWithFlexibleDimensions = (
//     fit: OverlayFit,
//     point: Point,
//     viewport: Dimension
// ): boolean => {
//     if (this._hasFlexibleDimensions) {
//         const availableHeight = viewport.bottom - point.y;
//         const availableWidth = viewport.right - point.x;
//         const minHeight = pixelValue({
//             input: this._overlayRef.getConfig().minHeight,
//         });
//         const minWidth = pixelValue({
//             input: this._overlayRef.getConfig().minWidth,
//         });

//         const verticalFit =
//             fit.fitsInViewportVertically ||
//             (minHeight != null && minHeight <= availableHeight);
//         const horizontalFit =
//             fit.fitsInViewportHorizontally ||
//             (minWidth != null && minWidth <= availableWidth);

//         return verticalFit && horizontalFit;
//     }
//     return false;
// };
