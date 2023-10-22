/* eslint-disable prefer-arrow/prefer-arrow-functions */
// import { and, or } from '@core-template';

import { ConnectedPosition } from '@angular/cdk/overlay';
import { /* Mono, */ mono, tube } from '@core-template';

import { Point } from '../../../platform';
// import { positionViewportRulerScroll } from '../../../scroll';
import {
    FlexibleConnectedStrategyPositionCapability,
    // ConditionApplyFlexibleConnectedStrategyPosition,
    // FlexibleConnectedStrategyPosition,
    // FlexibleConnectedStrategyPositionCapability,
    MonoStrategyPositionCapability,
} from '../../data';
// import { resetOverlayStylesElement } from '../overlay';
import { FitOverlay, overlayFit } from '../overlay/overlay-fit';
// import { applyPosition } from './apply-position';
// import { calculateBoundingBoxRect } from './calculate-bounding-box-rect';
// import { clearClassesPanel } from './clear-classes-panel';
// import { originPoint } from './origin-point';
import { originRect } from './origin-rect';
// import { resetBoundingBoxStyles } from './resetBoundingBoxStyles';

/**
 * Updates the position of the overlay element, using whichever preferred position relative
 * to the origin best fits on-screen.
 *
 * The selection of a position goes as follows:
 *  - If any positions fit completely within the viewport as-is,
 *      choose the first position that does so.
 *  - If flexible dimensions are enabled and at least one satisfies the given minimum width/height,
 *      choose the position with the greatest available size modified by the positions' weight.
 *  - If pushing is enabled, take the position that went off-screen the least and push it
 *      on-screen.
 *  - If none of the previous criteria were met, use the position that goes off-screen the least.
 * @docs-private
 */
export const applyFlexibleConnectedStrategyPosition: MonoStrategyPositionCapability<
    FlexibleConnectedStrategyPositionCapability
> = () =>
    mono(({ strategyPosition }) => {
        const oFit = {
            fitOverlay: {} as FitOverlay,
            point: {} as Point,
            position: {} as ConnectedPosition,
        };
        strategyPosition &&
            tube(
                // isDisposedAndNotInBrowser(),
                // narrowedViewportRect(),
                // clearClassesPanel,
                // resetOverlayStylesElement,
                // resetBoundingBoxStyles,
                // getNarrowedViewportRect(),
                originRect(),
                // overlayRect(),
                overlayFit(oFit)
                // condition(() => oFit.isCompletelyWithinViewport)
                // containerRect(),
                // applyPositionToFlexibleStrategyPosition()
            )({ strategyPosition });
    });

// const isDisposedAndNotInBrowser: ConditionApplyFlexibleConnectedStrategyPosition =
//     () =>
//         condition(
//             ({ strategyPosition }) =>
//                 strategyPosition?.isDisposed ||
//                 !strategyPosition?.platform.isBrowser
//         );

// const getNarrowedViewportRect = <T>(): Mono<
//     FlexibleConnectedStrategyPosition<T>
// > =>
//     mono((strategyPosition) => {
//         // The implementation of the getNarrowedViewportRect method (unchanged).
//     });

// const getOriginRect = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
//     mono((strategyPosition) => {
//         // The implementation of the getOriginRect method (unchanged).
//     });

// const getOverlayPoint = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
//     mono((strategyPosition) => {
//         // The implementation of the getOverlayPoint method (unchanged).
//     });

// const calculateBoundingBoxRect = <T>(): Mono<
//     FlexibleConnectedStrategyPosition<T>
// > =>
//     mono((strategyPosition) => {
//         // The implementation of the calculateBoundingBoxRect method (unchanged).
//     });

// const clearClassesPanel = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
//     mono((strategyPosition) => {
//         // The implementation of the clearClassesPanel method (unchanged).
//     });

// const resetOverlayStylesElement = <T>(): Mono<
//     FlexibleConnectedStrategyPosition<T>
// > =>
//     mono((strategyPosition) => {
//         // The implementation of the resetOverlayStylesElement method (unchanged).
//     });

// const resetBoundingBoxStyles = <T>(): Mono<
//     FlexibleConnectedStrategyPosition<T>
// > =>
//     mono((strategyPosition) => {
//         // The implementation of the resetBoundingBoxStyles method (unchanged).
//     });

// // const applyPosition = <T>(): Unary<FlexibleConnectedStrategyPosition<T>> =>
// //     unary((strategyPosition) => {
// //         // The implementation of the applyPosition method (unchanged).
// //     });

// /**
//  * This re-aligns the overlay element with the trigger in its last calculated position,
//  * even if a position higher in the "preferred positions" list would now fit. This
//  * allows one to re-align the panel without changing the orientation of the panel.
//  */
// const reapplyLastPosition = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
//     mono((strategyPosition) => {
//         const {
//             fallback,
//             isDisposed,
//             lastPosition,
//             originRect,
//             overlay,
//             pane,
//             platform,
//         } = strategyPosition;

//         if (isDisposed || !platform.isBrowser) {
//             return;
//         }

//         if (lastPosition && fallback) {
//             // pipe(originRect)(strategyPosition)
//             // originRectFlexibleConnectedStrategyPosition(strategyPosition);
//             strategyPosition.overlayRect = pane?.getBoundingClientRect();
//             // eslint-disable-next-line no-use-before-define
//             narrowedViewportRect(sp);
//             strategyPosition.containerRect =
//                 overlay?.container?.body?.getBoundingClientRect();
//             strategyPosition.containerRect &&
//                 originPoint({
//                     containerRect: strategyPosition.containerRect,
//                     originRect,
//                     pos: lastPosition,
//                 });
//             applyPosition(lastPosition, fallback.originPoint);
//         } else {
//             // eslint-disable-next-line no-use-before-define
//             applyFlexibleConnectedStrategyPosition()({ strategyPosition });
//         }
//     });

// /** Narrows the given viewport rect by the current _viewportMargin. */
// const narrowedViewportRect = <T>(sp: Fcsp<T>): void => {
//     const { viewportMargin, viewportRulerScroll } = sp;

//     // We recalculate the viewport rect here ourselves, rather than using the ViewportRuler,
//     // because we want to use the `clientWidth` and `clientHeight` as the base. The difference
//     // being that the client properties don't include the scrollbar, as opposed to `innerWidth`
//     // and `innerHeight` that do. This is necessary, because the overlay container uses
//     // 100% `width` and `height` which don't include the scrollbar either.
//     const width = document.documentElement.clientWidth;
//     const height = document.documentElement.clientHeight;
//     positionViewportRulerScroll(viewportRulerScroll);
//     const scrollPosition = viewportRulerScroll.startPosition;
//     scrollPosition &&
//         (sp.viewportRect = {
//             bottom: scrollPosition.top + height - viewportMargin,
//             height: height - 2 * viewportMargin,
//             left: scrollPosition.left + viewportMargin,
//             right: scrollPosition.left + width - viewportMargin,
//             top: scrollPosition.top + viewportMargin,
//             width: width - 2 * viewportMargin,
//         });
// };

// type UnaryGetNarrowedViewportRectFlexibleConnectedStrategyPosition = <
//     T,
//     K extends Partial<FlexibleConnectedStrategyPositionCapability<T>>,
// >() => Mono<K>;

// /**
//  * Narrows the given viewport rect by the current _viewportMargin.
//  * @internal
//  */
// export const getNarrowedViewportRect: UnaryGetNarrowedViewportRectFlexibleConnectedStrategyPosition =
//     () =>
//         mono(({ strategyPosition }) => {
//             const { viewportMargin, viewportRulerScroll } = strategyPosition;

//             // We recalculate the viewport rect here ourselves, rather than using the ViewportRuler,
//             // because we want to use the `clientWidth` and `clientHeight` as the base. The difference
//             // being that the client properties don't include the scrollbar, as opposed to `innerWidth`
//             // and `innerHeight` that do. This is necessary because the overlay container uses
//             // 100% `width` and `height` which don't include the scrollbar either.
//             const width = document.documentElement.clientWidth;
//             const height = document.documentElement.clientHeight;
//             positionViewportRulerScroll(viewportRulerScroll);
//             const scrollPosition = viewportRulerScroll.startPosition;
//             if (scrollPosition) {
//                 strategyPosition.viewportRect = {
//                     bottom: scrollPosition.top + height - viewportMargin,
//                     height: height - 2 * viewportMargin,
//                     left: scrollPosition.left + viewportMargin,
//                     right: scrollPosition.left + width - viewportMargin,
//                     top: scrollPosition.top + viewportMargin,
//                     width: width - 2 * viewportMargin,
//                 };
//             }
//         });

// const getOriginRect = <T>(): Mono<FlexibleConnectedStrategyPosition<T>> =>
//     mono((strategyPosition) => {
//         const {
//             documentRect,
//             origin,
//             overlay,
//             overlayRect,
//             positionLocked,
//             viewportRect,
//         } = strategyPosition;

//         // If the position is locked, we don't need to recalculate the origin rect.
//         if (positionLocked) {
//             return;
//         }

//         if (!origin || !overlay) {
//             return;
//         }

//         const originPoint =
//             origin instanceof ElementRef
//                 ? overlay.getOriginPoint(origin.nativeElement)
//                 : origin;

//         if (!originPoint) {
//             return;
//         }

//         const scrollableViewProperties = getScrollVisibility();
//         if (
//             !strategyPosition.isInitialRender &&
//             strategyPosition.scrollableViewProperties &&
//             strategyPosition.scrollableViewProperties.isVisible ===
//                 scrollableViewProperties.isVisible &&
//             strategyPosition.scrollableViewProperties.isClipped ===
//                 scrollableViewProperties.isClipped
//         ) {
//             return;
//         }

//         strategyPosition.scrollableViewProperties = scrollableViewProperties;

//         const { height, width } = overlayRect;

//         const availablePositions = getFlexibleConnectedPositions(
//             strategyPosition.preferredPositions,
//             strategyPosition.directionality
//         );

//         const bestFitPosition = getBestFitPosition(
//             originPoint,
//             overlay,
//             viewportRect,
//             documentRect,
//             availablePositions,
//             width,
//             height,
//             strategyPosition.canPush,
//             strategyPosition.pushHorizontal,
//             strategyPosition.pushVertical,
//             strategyPosition.boundaryAdjustment
//         );

//         strategyPosition.lastPosition = bestFitPosition;
//         strategyPosition.originRect = {
//             ...originPoint,
//             height: originPoint.height || 0,
//             width: originPoint.width || 0,
//         };
//     });
