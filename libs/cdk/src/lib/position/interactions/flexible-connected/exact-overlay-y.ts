// import { coerceCssPixelValue } from '@angular/cdk/coercion';
// import { ViewportScrollPosition } from '@angular/cdk/scrolling';
// import { unary } from '@core-template';

// import { Point } from '../../../platform';
// import {
//     FlexibleConnectedPosition,
//     ResultFlexibleConnectedStrategyPosition,
// } from '../../data';
// import { overlayPoint, pushOverlayOnScreen } from '../overlay';

// /** @internal Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing. */
// export const exactOverlayY = <T>(
//     position: FlexibleConnectedPosition,
//     originPoint: Point,
//     scrollPosition: ViewportScrollPosition
// ): ResultFlexibleConnectedStrategyPosition<T> =>
//     unary((strategyPosition) => {
//         const { document, fallback, isPushed, overlayRect } = strategyPosition;
//         // Reset any existing styles. This is necessary in case the
//         // preferred position has changed since the last `apply`.
//         const styles = { bottom: '', top: '' };
//         overlayPoint(originPoint, overlayRect, position)(strategyPosition);

//         if (fallback) {
//             const { overlayPoint } = fallback;
//             if (isPushed && overlayPoint) {
//                 pushOverlayOnScreen(overlayPoint, overlayRect, scrollPosition);
//             }

//             // We want to set either `top` or `bottom` based on whether the overlay wants to appear
//             // above or below the origin and the direction in which the element will expand.
//             if (position.overlayY === 'bottom') {
//                 // When using `bottom`, we adjust the y position such that it is the distance
//                 // from the bottom of the viewport rather than the top.
//                 const documentHeight = document.documentElement?.clientHeight;
//                 styles.bottom = `${
//                     documentHeight - (overlayPoint.y + overlayRect.height)
//                 }px`;
//             } else {
//                 styles.top = coerceCssPixelValue(overlayPoint.y);
//             }
//         }
//         strategyPosition.styleOverlayY = styles;
//     });
