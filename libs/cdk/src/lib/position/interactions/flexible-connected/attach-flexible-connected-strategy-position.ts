// import { boundingBoxClass } from '../../../platform';
// import { FlexibleConnectedStrategyPosition } from '../../data';

// type FnsAttachFlexibleConnectedStrategyPosition = {
//     validatePosition: () => void;
//     applyStrategyPosition: () => void;
// };

// /** Attaches this position strategy to an overlay. */
// export const attachFlexibleConnectedStrategyPosition = <T>(
//     fns: FnsAttachFlexibleConnectedStrategyPosition
// ): ((
//     strategyPosition: FlexibleConnectedStrategyPosition<T>
// ) => FlexibleConnectedStrategyPosition<T>) => {
//     const { applyStrategyPosition, validatePosition } = fns;
//     return (
//         strategyPosition: FlexibleConnectedStrategyPosition<T>
//     ): FlexibleConnectedStrategyPosition<T> => {
//         validatePosition();
//         if (strategyPosition) {
//             strategyPosition.overlay?.hostElement?.classList.add(
//                 boundingBoxClass
//             );
//             strategyPosition.boundingBox =
//                 strategyPosition.overlay?.hostElement;
//             strategyPosition.pane = strategyPosition.overlay?.overlayElement;
//             strategyPosition.isDisposed = false;
//             strategyPosition.isInitialRender = true;
//             strategyPosition.lastPosition = undefined;
//             strategyPosition.resizeSubscription.unsubscribe();
//             strategyPosition.resizeSubscription =
//                 strategyPosition.viewportRulerScroll.change().subscribe(() => {
//                     // When the window is resized, we want to trigger the next reposition as if it
//                     // was an initial render, in order for the strategy to pick a new optimal position,
//                     // otherwise position locking will cause it to stay at the old one.
//                     strategyPosition.isInitialRender = true;
//                     applyStrategyPosition();
//                 });
//         }

//         return strategyPosition;
//     };
// };
