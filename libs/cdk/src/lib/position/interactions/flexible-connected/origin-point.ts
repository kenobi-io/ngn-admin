import { ConditionFn, tube, unary } from '@core-template';
import { UnaryFunction } from 'rxjs';

import { isOverlayRefDirectionRtl } from '../../../overlay';
import { Dimension } from '../../../platform';
import {
    FlexibleConnectedPosition,
    FlexibleConnectedStrategyPosition,
    ResultFlexibleConnectedStrategyPosition,
    XOverlayPosition,
    YOverlayPosition,
} from '../../data';

type Data<T> = FlexibleConnectedStrategyPosition<T> & {
    x: number;
    originRect: Dimension;
    containerRect: Dimension;
    pos: FlexibleConnectedPosition;
    y: number;
};

type Unary<T> = UnaryFunction<Data<T>, Data<T>>;

type CD<T> = ConditionFn<Data<T>>;

/**
 * @internal
 * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
 */
export const originPoint = <T>(
    originRect: Dimension,
    containerRect: Dimension,
    pos: FlexibleConnectedPosition
): ResultFlexibleConnectedStrategyPosition<T> =>
    unary((strategyPosition) => {
        const data: Data<T> = {
            ...strategyPosition,
            containerRect,
            originRect,
            pos,
            x: 0,
            y: 0,
        };

        tube(
            doesTheOriginXEqual('center'),
            assignOriginXToTheResultOfBisectionWidthLeft(),
            doesNotTheOriginXEqual('center'),
            assignOriginX(),
            doesTheContainerRectOver('left', 0),
            assignOriginXOfContainerRectLeft(),
            doesTheOriginYEqual('center'),
            assignOriginY(),
            doesNotTheOriginYEqual('center'),
            assignOriginYTop(),
            doesTheContainerRectOver('top', 0),
            assignOriginYOfContainerRectTop(),
            assignFallbackOriginPointXY()
        )(data);
    });

// Normally the containerRect's top value would be zero, however when the overlay is attached to an input
// (e.g. in an autocomplete), mobile browsers will shift everything in order to put the input in the middle
// of the screen and to make space for the virtual keyboard. We need to account for this offset,
// otherwise our positioning will be thrown off.
// Additionally, when zooming in Safari this fixes the vertical position.
const assignOriginYOfContainerRectTop = <T>(): Unary<T> =>
    unary((model) => (model.y -= model.containerRect.top));

const doesTheOriginXEqual =
    <T>(originX: XOverlayPosition): CD<T> =>
    (model): boolean =>
        model.pos.originX == originX;

const doesTheOriginYEqual =
    <T>(originY: YOverlayPosition): CD<T> =>
    (model): boolean =>
        model.pos.originX == originY;

const doesTheContainerRectOver =
    <T>(leftTop: 'left' | 'top', that: number): CD<T> =>
    (model): boolean =>
        model.containerRect[leftTop] < that;

const doesNotTheOriginXEqual =
    <T>(originX: XOverlayPosition): CD<T> =>
    (model): boolean =>
        model.pos.originX != originX;

const doesNotTheOriginYEqual =
    <T>(originY: YOverlayPosition): CD<T> =>
    (model): boolean =>
        model.pos.originX != originY;

const assignOriginXToTheResultOfBisectionWidthLeft = <T>(): Unary<T> =>
    unary(
        (model) =>
            // Note: when centering we should always use the `left`
            // offset, otherwise the position will be wrong in RTL.
            (model.x = model.originRect.left + model.originRect.width / 2)
    );

const assignOriginX = <T>(): Unary<T> =>
    unary((model) => {
        const { originRect, pos } = model;
        const startX = isOverlayRefDirectionRtl(model)
            ? originRect.right
            : originRect.left;
        const endX = isOverlayRefDirectionRtl(model)
            ? originRect.left
            : originRect.right;
        model.x = pos.originX == 'start' ? startX : endX;
    });

const assignOriginXOfContainerRectLeft = <T>(): Unary<T> =>
    // When zooming in Safari the container rectangle contains negative values for the position
    // and we need to re-add them to the calculated coordinates.
    unary((model) => (model.x -= model.containerRect.left));

const assignOriginY = <T>(): Unary<T> =>
    unary(
        (model) =>
            (model.y = model.originRect.top + model.originRect.height / 2)
    );

const assignOriginYTop = <T>(): Unary<T> =>
    unary(
        (model) =>
            (model.y =
                model.pos.originY == 'top'
                    ? model.originRect.top
                    : model.originRect.bottom)
    );

const assignFallbackOriginPointXY = <T>(): Unary<T> =>
    unary((model) => {
        const { fallback, x, y } = model;
        fallback && (fallback.originPoint = { x, y });
    });
