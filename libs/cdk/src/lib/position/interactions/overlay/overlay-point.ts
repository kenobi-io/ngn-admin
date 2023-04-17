import { tube, unary } from '@core-template';
import { UnaryFunction } from 'rxjs';

import { isOverlayRefDirectionRtl } from '../../../overlay';
import { Dimension, Point } from '../../../platform';
import {
    FlexibleConnectedPosition,
    FlexibleConnectedStrategyPosition as Fcsp,
    ResultFlexibleConnectedStrategyPosition as Rfcsp,
    XOverlayPosition,
    YOverlayPosition,
} from '../../data';

type Value<T> = {
    overlayStartX: number;
    overlayStartY: number;
    originPoint: Point;
    overlayRect: Dimension;
    position: FlexibleConnectedPosition;
    sp: Fcsp<T>;
};
type Unary<T> = UnaryFunction<Value<T>, Value<T>>;
type Condition = <T>(model: Value<T>) => boolean;

/**
 * @internal
 * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
 * origin point to which the overlay should be connected.
 */
export const overlayPoint = <T>(
    originPoint: Point,
    overlayRect: Dimension,
    position: FlexibleConnectedPosition
): Rfcsp<T> =>
    unary((strategyPosition) => {
        const value: Value<T> = {
            originPoint,
            overlayRect,
            overlayStartX: 0,
            overlayStartY: 0,
            position,
            sp: strategyPosition,
        };
        tube(
            doesTheXPositionEqual('center'),
            assignOverlayStartXToTheResultOfBisectionWidth(),
            doesTheXPositionEqual('start'),
            assignOverlayStartXToTheResultOfRectWidth(),
            doesNotTheXPositionEqual('start', 'center'),
            assignOverlayStartXToTheResultOfZero(),
            doesTheYPositionEqual('center'),
            assignOverlayStartYToTheResultOfBisectionHeight(),
            doesNotTheYPositionEqual('center'),
            assignOverlayStartYToTheResultOfRectHeight(),
            assignOriginPointXY()
        )(value);
    });

const doesTheXPositionEqual =
    (overlayX: XOverlayPosition): Condition =>
    (model): boolean =>
        model.position.overlayX == overlayX;

const doesNotTheXPositionEqual =
    (start: XOverlayPosition, center: XOverlayPosition): Condition =>
    (model): boolean =>
        model.position.overlayX != start && model.position.overlayX != center;

const doesNotTheYPositionEqual =
    (overlayY: YOverlayPosition): Condition =>
    (model): boolean =>
        model.position.overlayY != overlayY;

const doesTheYPositionEqual =
    (overlayY: YOverlayPosition): Condition =>
    (model): boolean =>
        model.position.overlayY == overlayY;

const assignOverlayStartXToTheResultOfBisectionWidth = <T>(): Unary<T> =>
    unary((model) => (model.overlayStartX = -model.overlayRect.width / 2));

const assignOverlayStartYToTheResultOfBisectionHeight = <T>(): Unary<T> =>
    unary((model) => (model.overlayStartY = -model.overlayRect.height / 2));

const assignOverlayStartXToTheResultOfRectWidth = <T>(): Unary<T> =>
    unary(
        (model) =>
            (model.overlayStartX = isOverlayRefDirectionRtl(model.sp)
                ? -model.overlayRect.width
                : 0)
    );

const assignOverlayStartXToTheResultOfZero = <T>(): Unary<T> =>
    unary(
        (model) =>
            (model.overlayStartX = isOverlayRefDirectionRtl(model.sp)
                ? 0
                : -model.overlayRect.width)
    );

const assignOverlayStartYToTheResultOfRectHeight = <T>(): Unary<T> =>
    unary(
        (model) =>
            (model.overlayStartY =
                model.position.overlayY == 'top'
                    ? 0
                    : -model.overlayRect.height)
    );

const assignOriginPointXY = <T>(): Unary<T> =>
    unary((model) => {
        const { overlayStartX, overlayStartY, sp } = model;
        sp.fallback &&
            (sp.fallback.overlayPoint = {
                x: model.originPoint.x + overlayStartX,
                y: model.originPoint.y + overlayStartY,
            });
    });
