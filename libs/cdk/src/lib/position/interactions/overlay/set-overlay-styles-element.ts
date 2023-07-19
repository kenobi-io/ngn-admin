import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { and, condition, tube, unary } from '@core-template';

import { extendStyle, Point } from '../../../platform';
import { positionViewportRulerScroll } from '../../../scroll';
import {
    FlexibleConnectedPosition,
    FlexibleConnectedStrategyPosition,
    ResultFlexibleConnectedStrategyPosition,
} from '../../data';
import { offset } from '../flexible-connected';
import { exactOverlayY } from './exact-overlay-y';

type Data<T> = FlexibleConnectedStrategyPosition<T> & {
    styles: CSSStyleDeclaration;
    transformString: string;
    hasExactPosition: boolean;
};

type Return<T> = (strategyPosition: Data<T>) => Data<T>;

/** @internal Sets positioning styles to the overlay element. */
export const setOverlayElementStyles = <T>(
    position: FlexibleConnectedPosition,
    originPoint: Point
): ResultFlexibleConnectedStrategyPosition<T> =>
    unary((strategyPosition) => {
        const data: Data<T> = {
            ...strategyPosition,
            hasExactPosition: false,
            styles: {} as CSSStyleDeclaration,
            transformString: '',
        };

        tube(
            setExactPosition(),
            condition(() => data.hasExactPosition),
            setPositionViewportRulerScrollAndExactExtendStyle(
                position,
                originPoint
            ),
            condition(() => !data.hasExactPosition),
            unary<Data<T>>((model) => (model.styles.position = 'static')),
            // Use a transform to apply the offsets. We do this because the `center` positions rely on
            // being in the normal flex flow and setting a `top` / `left` at all will completely throw
            // off the position. We also can't use margins, because they won't have an effect in some
            // cases where the element doesn't have anything to "push off of". Finally, this works
            // better both with flexible and non-flexible positioning.
            offset(position, 'y'),
            condition(() => !!data.offsetXAndY),
            translateX(),
            offset(position, 'x'),
            condition(() => !!data.offsetXAndY),
            translateY(),
            setMaxHeightMaxWidth(),
            extendStyle(data.pane.style, data.styles)
        )(data);
    });

// If a maxWidth or maxHeight is specified on the overlay, we remove them. We do this because
// we need these values to both be set to "100%" for the automatic flexible sizing to work.
// The maxHeight and maxWidth are set on the boundingBox in order to enforce the constraint.
// Note that this doesn't apply when we have an exact position, in which case we do want to
// apply them because they'll be cleared from the bounding box.
const setMaxHeightMaxWidth = <T>(): Return<T> =>
    unary((model) => {
        const {
            hasExactPosition,
            hasFlexibleDimensions,
            styles,
            transformString,
        } = model;
        styles.transform = transformString.trim();
        const { config } = { ...model.overlay?.ref };
        tube(
            and(
                () => !!config?.maxHeight,
                () => hasExactPosition
            ),
            unary<Data<T>>(
                (model) =>
                    (model.styles.maxHeight = coerceCssPixelValue(
                        config?.maxHeight
                    ))
            ),
            and(
                () => !!config?.maxHeight,
                () => !hasExactPosition,
                () => hasFlexibleDimensions
            ),
            unary((model) => (model.styles.maxHeight = '')),
            and(
                () => !!config?.maxWidth,
                () => hasExactPosition
            ),
            unary(
                (model) =>
                    (model.styles.maxWidth = coerceCssPixelValue(
                        config?.maxWidth
                    ))
            ),
            and(
                () => !!config?.maxWidth,
                () => !hasExactPosition,
                () => hasFlexibleDimensions
            ),
            unary((model) => (model.styles.maxWidth = ''))
        )(model);
    });

const setPositionViewportRulerScrollAndExactExtendStyle = <T>(
    position: FlexibleConnectedPosition,
    originPoint: Point
): Return<T> =>
    unary((model) => {
        const { styleOverlayX, styleOverlayY, viewportRulerScroll } = model;
        positionViewportRulerScroll(viewportRulerScroll);
        tube(
            exactOverlayY(position, originPoint, {
                left: 0,
                top: 0,
            }),
            extendStyle(model.styles, styleOverlayY || {}),
            exactOverlayX<T>(position, originPoint, { left: 0, top: 0 }),
            extendStyle(model.styles, styleOverlayX || {})
        )(model);
    });

const setExactPosition = <T>(): Return<T> =>
    unary(
        (data) =>
            (data.hasExactPosition =
                !data.hasFlexibleDimensions || data.isPushed)
    );

const translateX = <T>(): Return<T> =>
    unary(
        (model) =>
            (model.transformString += `translateX(${model.offsetXAndY}px)`)
    );

const translateY = <T>(): Return<T> =>
    unary(
        (model) =>
            (model.transformString += `translateY(${model.offsetXAndY}px)`)
    );
