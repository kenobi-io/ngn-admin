import { condition, unary } from '@core-template';
import { pipe } from 'rxjs';

import { isOverlayRefDirectionRtl } from '../../../overlay';
import { Dimension, Point } from '../../../platform';
import { FlexibleConnectedPosition } from './flexible-connected-position';
import { FlexibleConnectedStrategyPosition as Fcsp } from './flexible-connected-strategy-position';
import { ResultFlexibleConnectedStrategyPosition as Rfcsp } from './result-flexible-connected-strategy-position';

type OverlayPoint = {
    originPoint: Point;
    overlayRect: Dimension;
    position: FlexibleConnectedPosition;
};
/**
 * @internal
 * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
 * origin point to which the overlay should be connected.
 */
export const overlayPoint = <T>(overlayPoint: OverlayPoint): Rfcsp<T> => {
    const { originPoint, overlayRect, position } = overlayPoint;

    return (strategyPosition: Fcsp<T>): Fcsp<T> => {
        let overlayStartX: number;
        let overlayStartY: number;

        return pipe(
            // Calculate the (overlayStartX, overlayStartY), the start of the
            // potential overlay position relative to the origin point.
            condition(
                () => position.overlayX == 'center',
                unary<Fcsp<T>>(() => (overlayStartX = -overlayRect.width / 2))
            ),
            condition(
                () => position.overlayX == 'start',
                unary<Fcsp<T>>(
                    (model) =>
                        (overlayStartX = isOverlayRefDirectionRtl(model)
                            ? -overlayRect.width
                            : 0)
                )
            ),
            condition(
                () =>
                    position.overlayX != 'start' &&
                    position.overlayX != 'center',
                unary<Fcsp<T>>(
                    (model) =>
                        (overlayStartX = isOverlayRefDirectionRtl(model)
                            ? 0
                            : -overlayRect.width)
                )
            ),
            condition(
                () => position.overlayY == 'center',
                unary<Fcsp<T>>(() => (overlayStartY = -overlayRect.height / 2))
            ),
            condition(
                () => position.overlayY != 'center',
                unary<Fcsp<T>>(
                    () =>
                        (overlayStartY =
                            position.overlayY == 'top'
                                ? 0
                                : -overlayRect.height)
                )
            ),
            unary<Fcsp<T>>(
                ({ fallback }) =>
                    fallback &&
                    (fallback.overlayPoint = {
                        x: originPoint.x + overlayStartX,
                        y: originPoint.y + overlayStartY,
                    })
            )
        )(strategyPosition);
    };
};
