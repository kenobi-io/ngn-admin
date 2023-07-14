// import { coerceCssPixelValue } from '@angular/cdk/coercion';
// import { ViewportScrollPosition } from '@angular/cdk/scrolling';
// import { unary } from '@core-template';

// import { isOverlayRefDirectionRtl } from '../../../overlay';
// import { Point } from '../../../platform';
// import {
//     FlexibleConnectedPosition,
//     ResultFlexibleConnectedStrategyPosition,
// } from '../../data';
// import { overlayPoint } from '../overlay';

// /** @internal Gets the exact left/right for the overlay when not using flexible sizing or when pushing. */
// export const exactOverlayX = <T>(
//     position: FlexibleConnectedPosition,
//     originPoint: Point,
//     defScrollPosition: ViewportScrollPosition
// ): ResultFlexibleConnectedStrategyPosition<T> =>
//     unary((strategyPosition) => {
//         const { fallback, overlay, overlayRect } = strategyPosition; // Reset any existing styles. This is necessary in case the preferred position has

//         const scrollPosition =
//             strategyPosition.viewportRulerScroll.startPosition ||
//             defScrollPosition;
//         // changed since the last `apply`.
//         const styles = { left: '', right: '' };
//         overlayPoint({ originPoint, overlayRect, position })(strategyPosition);

//         if (this._isPushed && fallback) {
//             overlayPoint = this._pushOverlayOnScreen(
//                 fallback.overlayPoint,
//                 this._overlayRect,
//                 scrollPosition
//             );
//         }
//         // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
//         // or "after" the origin, which determines the direction in which the element will expand.
//         // For the horizontal axis, the meaning of "before" and "after" change based on whether the
//         // page is in RTL or LTR.
//         let horizontalStyleProperty: 'left' | 'right';

//         if (isOverlayRefDirectionRtl(strategyPosition)) {
//             horizontalStyleProperty =
//                 position.overlayX === 'end' ? 'left' : 'right';
//         } else {
//             horizontalStyleProperty =
//                 position.overlayX === 'end' ? 'right' : 'left';
//         }

//         // When we're setting `right`, we adjust the x position such that it is the distance
//         // from the right edge of the viewport rather than the left edge.
//         if (horizontalStyleProperty === 'right') {
//             const documentWidth = this._document.documentElement!.clientWidth;
//             styles.right = `${
//                 documentWidth -
//                 (fallback.overlayPoint.x + this._overlayRect.width)
//             }px`;
//         } else {
//             styles.left = coerceCssPixelValue(fallback.overlayPoint.x);
//         }
//         strategyPosition.styleOverlayX = styles;
//     });
