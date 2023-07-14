// import { boundingBoxClass, extendStyle } from '../../../platform';
// import {
//     FlexibleConnectedStrategyPosition,
//     ResultFlexibleConnectedStrategyPosition,
// } from '../../data';
// import { resetOverlayStylesElement } from '../overlay';

// /** Cleanup after the element gets destroyed. */
// export const disposeFlexibleConnectedStrategyPosition = <T>(
//     detachFlexibleConnectedStrategyPosition: () => ResultFlexibleConnectedStrategyPosition<T>
// ): ResultFlexibleConnectedStrategyPosition<T> => {
//     return (
//         strategyPosition: FlexibleConnectedStrategyPosition<T>
//     ): FlexibleConnectedStrategyPosition<T> => {
//         const {
//             boundingBox,
//             isDisposed,
//             overlay: overlayRef,
//             pane,
//             positionChanger,
//         } = strategyPosition;

//         if (isDisposed) {
//             return strategyPosition;
//         }

//         // We can't use `_resetBoundingBoxStyles` here, because it resets
//         // some properties to zero, rather than removing them.
//         if (boundingBox) {
//             extendStyle(
//                 boundingBox.style,
//                 {
//                     alignItems: '',
//                     bottom: '',
//                     height: '',
//                     justifyContent: '',
//                     left: '',
//                     right: '',
//                     top: '',
//                     width: '',
//                 },
//                 false
//             );
//         }

//         if (pane) {
//             resetOverlayStylesElement(); // local
//         }

//         if (overlayRef) {
//             overlayRef.ref.host?.classList.remove(boundingBoxClass);
//         }

//         detachFlexibleConnectedStrategyPosition()(strategyPosition);
//         positionChanger.complete();
//         strategyPosition.overlay = strategyPosition.boundingBox = undefined;
//         strategyPosition.isDisposed = true;
//         return strategyPosition;
//     };
// };
