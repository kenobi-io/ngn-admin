// /* eslint-disable prefer-arrow/prefer-arrow-functions */
// // import { and, or } from '@core-template';

// import { and, or } from '@core-template';

// import { positionViewportRulerScroll } from '../../../scroll';
// import {
//     FallbackPosition,
//     FlexibleConnectedStrategyPosition as Fcsp,
//     FlexibleFit,
// } from '../../data';
// import {
//     overlayFit,
//     overlayPoint,
//     resetOverlayStylesElement,
// } from '../overlay';
// import { applyPosition } from './apply-position';
// import { calculateBoundingBoxRect } from './calculate-bounding-box-rect';
// import { canFitWithFlexibleDimensions } from './can-fit-with-flexible-dimension';
// import { clearClassesPanel } from './clear-classes-panel';
// import { originPoint } from './origin-point';
// import { originRect } from './origin-rect';
// import { resetBoundingBoxStyles } from './resetBoundingBoxStyles';

// /**
//  * Updates the position of the overlay element, using whichever preferred position relative
//  * to the origin best fits on-screen.
//  *
//  * The selection of a position goes as follows:
//  *  - If any positions fit completely within the viewport as-is,
//  *      choose the first position that does so.
//  *  - If flexible dimensions are enabled and at least one satisfies the given minimum width/height,
//  *      choose the position with the greatest available size modified by the positions' weight.
//  *  - If pushing is enabled, take the position that went off-screen the least and push it
//  *      on-screen.
//  *  - If none of the previous criteria were met, use the position that goes off-screen the least.
//  * @docs-private
//  */
// export const applyFlexibleConnectedStrategyPosition = <T>(
//     sp: Fcsp<T>
// ): Fcsp<T> => {
//     const {
//         canPush,
//         isDisposed,
//         isInitialRender,
//         lastPosition,
//         overlay,
//         pane,
//         platform,
//         positionLocked,
//         preferredPositions,
//     } = sp;

//     // We shouldn't do anything if the strategy was disposed or we're on the server.
//     if (isDisposed || !platform.isBrowser) {
//         return sp;
//     }

//     // If the position has been applied already (e.g. when the overlay was opened) and the
//     // consumer opted into locking in the position, re-use the old position, in order to
//     // prevent the overlay from jumping around.
//     if (!isInitialRender && positionLocked && lastPosition) {
//         return reapplyLastPosition<T>(sp);
//     }

//     clearClassesPanel(sp);
//     resetOverlayStylesElement(sp);
//     resetBoundingBoxStyles();

//     // We need the bounding rects for the origin, the overlay and the container to determine how to position
//     // the overlay relative to the origin.
//     // We use the viewport rect to determine whether a position would go off-screen.
//     narrowedViewportRect(sp);
//     originRect(sp);
//     sp.overlayRect = pane.getBoundingClientRect();
//     sp.containerRect = overlay?.container?.body?.getBoundingClientRect();

//     // Positions where the overlay will fit with flexible dimensions.
//     const flexibleFits: FlexibleFit[] = [];

//     const { containerRect, fallback } = sp;

//     if (containerRect && fallback) {
//         // Go through each of the preferred positions looking for a good fit.
//         // If a good fit is found, it will be applied immediately.
//         for (const pos of preferredPositions) {
//             // Get the exact (x, y) coordinate for the point-of-origin on the origin element.
//             originPoint<T>(sp.originRect, containerRect, pos)(sp);

//             // From that point-of-origin, get the exact (x, y) coordinate for the top-left corner of the
//             // overlay in this position. We use the top-left corner for calculations and later translate
//             // this into an appropriate (top, left, bottom, right) style.
//             overlayPoint<T>(fallback.originPoint, sp.overlayRect, pos)(sp);

//             // Calculate how well the overlay would fit into the viewport with this point.
//             overlayFit(
//                 fallback.overlayPoint,
//                 sp.overlayRect,
//                 sp.viewportRect,
//                 pos
//             );

//             // If the overlay, without any further work, fits into the viewport, use this position.
//             if (fallback.overlayFit.isCompletelyWithinViewport) {
//                 sp.isPushed = false;
//                 applyPosition(pos, fallback.originPoint);
//                 return sp;
//             }

//             // If the overlay has flexible dimensions, we can use this position
//             // so long as there's enough space for the minimum dimensions.
//             if (
//                 canFitWithFlexibleDimensions(
//                     fallback.overlayFit,
//                     fallback.overlayPoint,
//                     sp.viewportRect
//                 )
//             ) {
//                 // Save positions where the overlay will fit with flexible dimensions. We will use these
//                 // if none of the positions fit *without* flexible dimensions.
//                 flexibleFits.push({
//                     boundingBoxRect: calculateBoundingBoxRect(
//                         fallback.originPoint,
//                         pos
//                     ),
//                     origin: fallback.originPoint,
//                     overlayRect: sp.overlayRect,
//                     position: pos,
//                 });

//                 continue;
//             }

//             // If the current preferred position does not fit on the screen, remember the position
//             // if it has more visible area on-screen than we've seen and move onto the next preferred
//             // position.
//             if (
//                 !sp.fallback ||
//                 sp.fallback.overlayFit.visibleArea <
//                     fallback.overlayFit.visibleArea
//             ) {
//                 sp.fallback = {
//                     originPoint: fallback.originPoint,
//                     overlayFit: fallback.overlayFit,
//                     overlayPoint: fallback.overlayPoint,
//                     overlayRect: fallback.overlayRect,
//                     position: pos,
//                 };
//             }
//         }
//     }

//     // If there are any positions where the overlay would fit with flexible dimensions, choose the
//     // one that has the greatest area available modified by the position's weight
//     if (flexibleFits.length) {
//         let bestFit: FlexibleFit | undefined;
//         let bestScore = -1;
//         for (const fit of flexibleFits) {
//             const score =
//                 fit.boundingBoxRect.width *
//                 fit.boundingBoxRect.height *
//                 (fit.position.weight || 1);
//             if (score > bestScore) {
//                 bestScore = score;
//                 bestFit = fit;
//             }
//         }

//         sp.isPushed = false;
//         bestFit && applyPosition(bestFit.position, bestFit.origin);
//         return sp;
//     }

//     if (sp.fallback) {
//         // When none of the preferred positions fit within the viewport, take the position
//         // that went off-screen the least and attempt to push it on-screen.
//         if (canPush) {
//             // TODO(jelbourn): after pushing, the opening "direction" of the overlay might not make sense.
//             sp.isPushed = true;
//             applyPosition(sp.fallback.position, sp.fallback.originPoint);
//             return sp;
//         }

//         // All options for getting the overlay within the viewport have been exhausted, so go with the
//         // position that went off-screen the least.
//         applyPosition(sp.fallback.position, sp.fallback.originPoint);
//     }

//     const hasFallback =
//         (value: unknown) => (fallback: FallbackPosition | undefined) =>
//             fallback === value;

//     enum UserRole {
//         Administrator = 1,
//         Editor = 2,
//         Subscriber = 3,
//         Writer = 4,
//     }

//     interface User {
//         username: string;
//         age: number;
//         role: UserRole;
//     }

//     const users = [
//         { age: 25, role: UserRole.Administrator, username: 'John' },
//         { age: 7, role: UserRole.Subscriber, username: 'Jane' },
//         { age: 18, role: UserRole.Writer, username: 'Liza' },
//         { age: 16, role: UserRole.Editor, username: 'Jim' },
//         { age: 32, role: UserRole.Editor, username: 'Bill' },
//     ];

//     const isRole = (role: UserRole) => (user: User) => user.role === role;
//     const isGreaterThan = (age: number) => (user: User) => user.age > age;
//     const isWriter = isRole(UserRole.Writer);

//     const greaterThan17AndWriterOrEditor = users.filter(
//         and(isGreaterThan(17), or(isWriter, hasFallback(sp.fallback)))
//     );
//     const greaterThan5AndSubscriberOrWriter = users.filter(
//         and(isGreaterThan(5), isWriter)
//     );
//     greaterThan5AndSubscriberOrWriter;
//     greaterThan17AndWriterOrEditor;

//     return sp;
// };

// /**
//  * This re-aligns the overlay element with the trigger in its last calculated position,
//  * even if a position higher in the "preferred positions" list would now fit. This
//  * allows one to re-align the panel without changing the orientation of the panel.
//  */
// const reapplyLastPosition = <T>(sp: Fcsp<T>): Fcsp<T> => {
//     const {
//         fallback,
//         isDisposed,
//         lastPosition,
//         originRect,
//         overlay,
//         pane,
//         platform,
//     } = sp;

//     if (isDisposed || !platform.isBrowser) {
//         return sp;
//     }

//     if (lastPosition && fallback) {
//         // pipe(originRect)(strategyPosition)
//         // originRectFlexibleConnectedStrategyPosition(strategyPosition);
//         sp.overlayRect = pane.getBoundingClientRect();
//         // eslint-disable-next-line no-use-before-define
//         narrowedViewportRect(sp);
//         sp.containerRect = overlay?.container?.body?.getBoundingClientRect();
//         sp.containerRect &&
//             originPoint(originRect, sp.containerRect, lastPosition);
//         applyPosition(lastPosition, fallback.originPoint);
//     } else {
//         // eslint-disable-next-line no-use-before-define
//         applyFlexibleConnectedStrategyPosition(sp);
//     }
//     return sp;
// };

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
