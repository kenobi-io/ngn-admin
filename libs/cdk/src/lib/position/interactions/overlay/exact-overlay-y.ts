import { Condition, mono, tube } from '@core-template';
import { UnaryFunction } from 'rxjs';

import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { Dimension, Point } from '../../../platform';
import {
    FlexibleConnectedPosition,
    FlexibleConnectedStrategyPosition,
    ResultFlexibleConnectedStrategyPosition,
} from '../../data';

type Data<T> = FlexibleConnectedStrategyPosition<T> & {
    overlayPoint: Point;
    overlayRect: Dimension;
    documentHeight: number;
};

type Unary<T> = UnaryFunction<Data<T>, Data<T>>;

type CD<T> = Condition<Data<T>>;

/**
 * @internal
 * Gets the exact top/bottom for the overlay when not using flexible sizing or when pushing.
 */
export const exactOverlayY = <T>(
    position: FlexibleConnectedPosition,
    originPoint: Point,
    scrollPosition: ViewportScrollPosition
): ResultFlexibleConnectedStrategyPosition<T> =>
    mono((strategyPosition) => {
        const data: Data<T> = {
            ...strategyPosition,
            documentHeight,
            isPushed,
            overlayPoint,
            overlayRect,
        };

        tube(
            setOverlayPointWhenPushed(),
            setTopOrBottomPosition(),
            assignStyles()
        )(data);
    });

const setOverlayPointWhenPushed = <T>(): Unary<T> =>
    mono((model) => {
        if (model.isPushed) {
            model.overlayPoint = this._pushOverlayOnScreen(
                model.overlayPoint,
                model.overlayRect,
                model.scrollPosition
            );
        }
    });

const setTopOrBottomPosition = <T>(): Unary<T> =>
    mono((model) => {
        if (model.position.overlayY === 'bottom') {
            model.styles.bottom = `${
                model.documentHeight -
                (model.overlayPoint.y + model.overlayRect.height)
            }px`;
        } else {
            model.styles.top = coerceCssPixelValue(model.overlayPoint.y);
        }
    });

const assignStyles = <T>(): Unary<T> =>
    mono(
        (model) =>
            (model.styles = { bottom: '', top: '' } as CSSStyleDeclaration)
    );
