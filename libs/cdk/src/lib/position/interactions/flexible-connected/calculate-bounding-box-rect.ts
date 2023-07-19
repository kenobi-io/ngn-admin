import { Condition, tube, Unary, unary } from '@core-template';

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

type CD<T> = Condition<Data<T>>;

export const calculateBoundingBoxRect = <T>(
    originRect: Dimension,
    overlayRect: Dimension,
    pos: FlexibleConnectedPosition
): ResultFlexibleConnectedStrategyPosition<T> => {
    const containerRect = {
        bottom: Math.max(originRect.bottom, overlayRect.bottom),
        height: 0,
        left: Math.min(originRect.left, overlayRect.left),
        right: Math.max(originRect.right, overlayRect.right),
        top: Math.min(originRect.top, overlayRect.top),
        width: 0,
    };

    containerRect.width = containerRect.right - containerRect.left;
    containerRect.height = containerRect.bottom - containerRect.top;

    return unary((strategyPosition) => {
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
};

const assignOriginX = <T>(): Unary<Data<T>> =>
    unary((model) => {
        const overlayStartPoint = model.containerRect.left;
        const overlayEndPoint = model.containerRect.right;
        const originStartPoint = model.originRect.left;
        const originEndPoint = model.originRect.right;
        let x = overlayStartPoint;

        if (model.pos.overlayX === 'center') {
            x += model.originRect.width / 2 - model.containerRect.width / 2;
        } else if (
            (model.pos.overlayX === 'start' &&
                !isOverlayRefDirectionRtl(model)) ||
            (model.pos.overlayX === 'end' && isOverlayRefDirectionRtl(model))
        ) {
            x += originStartPoint - overlayStartPoint;
        } else if (
            (model.pos.overlayX === 'end' &&
                !isOverlayRefDirectionRtl(model)) ||
            (model.pos.overlayX === 'start' && isOverlayRefDirectionRtl(model))
        ) {
            x += originEndPoint - overlayEndPoint;
        }

        model.x = x;
    });

const assignOriginXToTheResultOfBisectionWidthLeft = <T>(): Unary<Data<T>> =>
    unary((model) => {
        const overlayStartPoint = model.containerRect.left;
        const overlayEndPoint = model.containerRect.right;
        const originStartPoint = model.originRect.left;
        const originEndPoint = model.originRect.right;

        let x = overlayStartPoint;

        if (model.pos.overlayX === 'center') {
            x += model.originRect.width / 2 - model.containerRect.width / 2;
        } else if (
            (model.pos.overlayX === 'start' &&
                !isOverlayRefDirectionRtl(model)) ||
            (model.pos.overlayX === 'end' && isOverlayRefDirectionRtl(model))
        ) {
            x += originStartPoint - overlayStartPoint;
        } else if (
            (model.pos.overlayX === 'end' &&
                !isOverlayRefDirectionRtl(model)) ||
            (model.pos.overlayX === 'start' && isOverlayRefDirectionRtl(model))
        ) {
            x += originEndPoint - overlayEndPoint;
        }

        const containerWidth = model.containerRect.width;
        const originWidth = model.originRect.width;
        const halfContainerWidth = containerWidth / 2;
        const halfOriginWidth = originWidth / 2;
        const leftOffset = originStartPoint - overlayStartPoint;
        const rightOffset = originEndPoint - overlayEndPoint;

        // Bisection
        if (model.pos.overlayX === 'center' && containerWidth < originWidth) {
            const midPoint = (overlayStartPoint + overlayEndPoint) / 2;
            const offset = originStartPoint - midPoint;
            const minOffset = -halfContainerWidth + halfOriginWidth;
            const maxOffset = halfContainerWidth - halfOriginWidth;

            if (offset < minOffset) {
                x += leftOffset - minOffset;
            } else if (offset > maxOffset) {
                x += rightOffset - maxOffset;
            } else {
                x += offset;
            }
        }

        model.x = x;
    });

const doesTheOriginXEqual =
    <X extends XOverlayPosition>(x: X): CD<X> =>
    (model) =>
        model.pos.overlayX === x;

const doesNotTheOriginXEqual =
    <X extends XOverlayPosition>(x: X): CD<X> =>
    (model) =>
        model.pos.overlayX !== x;

const doesTheContainerRectOver =
    <X extends 'left' | 'top'>(direction: X, limit: number): CD<X> =>
    (model) =>
        model.containerRect[direction] < limit;

const assignOriginXOfContainerRectLeft = <T>(): Unary<Data<T>> =>
    unary((model) => {
        const originStartPoint = model.originRect.left;
        const overlayStartPoint = model.containerRect.left;

        model.x = overlayStartPoint - originStartPoint;
    });

const doesTheOriginYEqual =
    <Y extends YOverlayPosition>(y: Y): CD<Y> =>
    (model) =>
        model.pos.overlayY === y;

const assignOriginY = <T>(): Unary<Data<T>> =>
    unary((model) => {
        const overlayStartPoint = model.containerRect.top;
        const overlayEndPoint = model.containerRect.bottom;
        const originStartPoint = model.originRect.top;
        const originEndPoint = model.originRect.bottom;
        let y = overlayStartPoint;

        if (model.pos.overlayY === 'center') {
            y += model.originRect.height / 2 - model.containerRect.height / 2;
        } else if (
            (model.pos.overlayY === 'top' &&
                !isOverlayRefDirectionRtl(model)) ||
            (model.pos.overlayY === 'bottom' && isOverlayRefDirectionRtl(model))
        ) {
            y += originStartPoint - overlayStartPoint;
        } else if (
            (model.pos.overlayY === 'bottom' &&
                !isOverlayRefDirectionRtl(model)) ||
            (model.pos.overlayY === 'top' && isOverlayRefDirectionRtl(model))
        ) {
            y += originEndPoint - overlayEndPoint;
        }

        model.y = y;
    });

const doesNotTheOriginYEqual =
    <Y extends YOverlayPosition>(y: Y): CD<Y> =>
    (model) =>
        model.pos.overlayY !== y;

const assignOriginYTop = <T>(): Unary<Data<T>> =>
    unary((model) => {
        const originStartPoint = model.originRect.top;
        const overlayStartPoint = model.containerRect.top;

        model.y = overlayStartPoint - originStartPoint;
    });

const assignOriginYOfContainerRectTop = <T>(): Unary<Data<T>> =>
    unary((model) => {
        const originStartPoint = model.originRect.top;
        const overlayStartPoint = model.containerRect.top;

        model.y = overlayStartPoint - originStartPoint;
    });

const assignFallbackOriginPointXY = <T>(): Unary<Data<T>> =>
    unary((model) => {
        const overlayStartPoint = model.containerRect.left;
        const overlayEndPoint = model.containerRect.right;
        const overlayMidPoint =
            overlayStartPoint + (overlayEndPoint - overlayStartPoint) / 2;
        const originStartPoint = model.originRect.left;
        const originEndPoint = model.originRect.right;
        const originMidPoint =
            originStartPoint + (originEndPoint - originStartPoint) / 2;

        if (originEndPoint <= overlayStartPoint) {
            model.x = overlayStartPoint;
        } else if (originStartPoint >= overlayEndPoint) {
            model.x = overlayEndPoint - model.originRect.width;
        } else {
            model.x = overlayMidPoint - originMidPoint;
        }

        const overlayTopPoint = model.containerRect.top;
        const overlayBottomPoint = model.containerRect.bottom;
        const overlayCenter =
            overlayTopPoint + (overlayBottomPoint - overlayTopPoint) / 2;
        const originTopPoint = model.originRect.top;
        const originBottomPoint = model.originRect.bottom;
        const originCenter =
            originTopPoint + (originBottomPoint - originTopPoint) / 2;

        if (originBottomPoint <= overlayTopPoint) {
            model.y = overlayTopPoint;
        } else if (originTopPoint >= overlayBottomPoint) {
            model.y = overlayBottomPoint - model.originRect.height;
        } else {
            model.y = overlayCenter - originCenter;
        }
    });
