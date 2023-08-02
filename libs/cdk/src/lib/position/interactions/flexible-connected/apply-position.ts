import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { condition, Mono, tube, unary } from '@core-template';

import { Point } from '../../../platform';
import {
    FlexibleConnectedPosition,
    FlexibleConnectedStrategyPositionCapability,
    ResultFlexibleConnectedStrategyPosition,
} from '../../data';
import { getScrollVisibility, setOverlayElementStyles } from '../overlay';
import { addPanelClasses } from './add-panel-classes';
import { setBoundingBoxStyles } from './set-bounding-box-styles';
import { setTransformOrigin } from './set-transform-origin';

type UnaryApplyPositionFlexibleConnectedStrategyPosition = <
    T,
    K extends Partial<FlexibleConnectedStrategyPositionCapability<T>>
>(
    position: FlexibleConnectedPosition,
    originPoint: Point
) => Mono<K>;

/**
 * Applies a computed position to the overlay and emits a position change.
 * @internal
 * @param position The position preference
 * @param originPoint The point on the origin element where the overlay is connected.
 */
export const applyPosition: UnaryApplyPositionFlexibleConnectedStrategyPosition =
    (position: FlexibleConnectedPosition, originPoint: Point) =>
        unary(({ strategyPosition }) => {
            tube(
                setTransformOrigin(position),
                setOverlayElementStyles(position, originPoint),
                setBoundingBoxStyles(originPoint, position),
                condition(() => !!position.panelClass),
                addPanelClasses(position.panelClass),
                // Save the last connected position in case the position needs to be re-calculated.
                unary((_) => (_.lastPosition = position)),
                setChangeEvent(position)
            )(strategyPosition);
        });

const setChangeEvent = <T>(
    position: FlexibleConnectedPosition
): ResultFlexibleConnectedStrategyPosition<T> =>
    unary((strategyPosition) => {
        const { positionChanger } = strategyPosition;
        // Notify that the position has been changed along with its change properties.
        // We only emit if we've got any subscriptions, because the scroll visibility
        // calculations can be somewhat expensive.
        if (positionChanger.observers.length) {
            const scrollableViewProperties = getScrollVisibility();
            const changeEvent = new ConnectedOverlayPositionChange(
                position,
                scrollableViewProperties
            );
            positionChanger.next(changeEvent);
        }

        strategyPosition.isInitialRender = false;
    });
