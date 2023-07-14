// import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
// import { condition, tube, unary } from '@core-template';

// import { Point } from '../../../platform';
// import {
//     FlexibleConnectedPosition,
//     FlexibleConnectedStrategyPosition,
//     ResultFlexibleConnectedStrategyPosition,
// } from '../../data';
// import { getScrollVisibility, setOverlayElementStyles } from '../overlay';
// import { addPanelClasses } from './add-panel-classes';
// import { setBoundingBoxStyles } from './set-bounding-box-styles';
// import { setTransformOrigin } from './set-transform-origin';

// /**
//  * Applies a computed position to the overlay and emits a position change.
//  * @internal
//  * @param position The position preference
//  * @param originPoint The point on the origin element where the overlay is connected.
//  */
// export const applyPosition = <T>(
//     position: FlexibleConnectedPosition,
//     originPoint: Point
// ): ResultFlexibleConnectedStrategyPosition<T> =>
//     unary((sp: FlexibleConnectedStrategyPosition<T>) => {
//         tube(
//             setTransformOrigin(position),
//             setOverlayElementStyles(position, originPoint),
//             setBoundingBoxStyles(originPoint, position),
//             condition(() => !!position.panelClass),
//             addPanelClasses(position.panelClass),
//             // Save the last connected position in case the position needs to be re-calculated.
//             unary((_) => (_.lastPosition = position)),
//             setChangeEvent(position)
//         )(sp);
//     });

// const setChangeEvent = <T>(
//     position: FlexibleConnectedPosition
// ): ResultFlexibleConnectedStrategyPosition<T> =>
//     unary((model) => {
//         const { positionChanger } = model;
//         // Notify that the position has been changed along with its change properties.
//         // We only emit if we've got any subscriptions, because the scroll visibility
//         // calculations can be somewhat expensive.
//         if (positionChanger.observers.length) {
//             const scrollableViewProperties = getScrollVisibility();
//             const changeEvent = new ConnectedOverlayPositionChange(
//                 position,
//                 scrollableViewProperties
//             );
//             positionChanger.next(changeEvent);
//         }

//         model.isInitialRender = false;
//     });
