// import { coerceCssPixelValue } from '@angular/cdk/coercion';
// import { unary } from '@core-template';

// import { extendStyle, Point } from '../../../platform';
// import {
//     FlexibleConnectedPosition,
//     ResultFlexibleConnectedStrategyPosition,
// } from '../../data';
// import { calculateBoundingBoxRect } from './calculate-bounding-box-rect';

// /**
//  * Sets the position and size of the overlay's sizing wrapper. The wrapper is positioned on the
//  * origin's connection point and stretches to the bounds of the viewport.
//  * @internal
//  * @param origin The point on the origin element where the overlay is connected.
//  * @param position The position preference
//  */
// export const setBoundingBoxStyles = <T>(
//     origin: Point,
//     position: FlexibleConnectedPosition
// ): ResultFlexibleConnectedStrategyPosition<T> =>
//     unary((strategyPosition) => {
//         this.boundingBoxRect = calculateBoundingBoxRect(origin, position);

//         // It's weird if the overlay *grows* while scrolling, so we take the last size into account
//         // when applying a new size.
//         if (!this._isInitialRender && !this._growAfterOpen) {
//             boundingBoxRect.height = Math.min(
//                 boundingBoxRect.height,
//                 this._lastBoundingBoxSize.height
//             );
//             boundingBoxRect.width = Math.min(
//                 boundingBoxRect.width,
//                 this._lastBoundingBoxSize.width
//             );
//         }

//         const styles = {} as CSSStyleDeclaration;

//         if (this._hasExactPosition()) {
//             styles.top = styles.left = '0';
//             styles.bottom =
//                 styles.right =
//                 styles.maxHeight =
//                 styles.maxWidth =
//                     '';
//             styles.width = styles.height = '100%';
//         } else {
//             const maxHeight = this._overlayRef.getConfig().maxHeight;
//             const maxWidth = this._overlayRef.getConfig().maxWidth;

//             styles.height = coerceCssPixelValue(boundingBoxRect.height);
//             styles.top = coerceCssPixelValue(boundingBoxRect.top);
//             styles.bottom = coerceCssPixelValue(boundingBoxRect.bottom);
//             styles.width = coerceCssPixelValue(boundingBoxRect.width);
//             styles.left = coerceCssPixelValue(boundingBoxRect.left);
//             styles.right = coerceCssPixelValue(boundingBoxRect.right);

//             // Push the pane content towards the proper direction.
//             if (position.overlayX === 'center') {
//                 styles.alignItems = 'center';
//             } else {
//                 styles.alignItems =
//                     position.overlayX === 'end' ? 'flex-end' : 'flex-start';
//             }

//             if (position.overlayY === 'center') {
//                 styles.justifyContent = 'center';
//             } else {
//                 styles.justifyContent =
//                     position.overlayY === 'bottom' ? 'flex-end' : 'flex-start';
//             }

//             if (maxHeight) {
//                 styles.maxHeight = coerceCssPixelValue(maxHeight);
//             }

//             if (maxWidth) {
//                 styles.maxWidth = coerceCssPixelValue(maxWidth);
//             }
//         }

//         this._lastBoundingBoxSize = boundingBoxRect;

//         extendStyle(this._boundingBox!.style, styles, false);
//     });
