import { ConnectedPosition } from '@angular/cdk/overlay';
import { Condition, Mono, condition, mono, tube } from '@core-template';

import { setRtl } from '../../../overlay';
import { BoundingBoxRect, Point } from '../../../platform';
import {
    FlexibleConnectedStrategyPosition,
    ParamsUnaryApplyFlexibleConnectedStrategyPosition,
} from '../../data';

type CalculateBoundingBoxRectData<T> = Partial<
    FlexibleConnectedStrategyPosition<T>
> & {
    origin: Point;
    position: ConnectedPosition;
    boundingBoxRect: BoundingBoxRect;
    isRtl: boolean;
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    width?: number;
    height?: number;
};

type CalculateBoundingBoxRectParam = {
    origin: Point;
    position: ConnectedPosition;
    boundingBoxRect: BoundingBoxRect; // Updated: Added boundingBoxRect as a parameter
};

/**
 * @internal
 * Gets the position and size of the overlay's sizing container.
 *
 * This method does no measuring and applies no styles so that we can cheaply compute the
 * bounds for all positions and choose the best fit based on these results.
 */
export const calculateBoundingBoxRect: ParamsUnaryApplyFlexibleConnectedStrategyPosition<
    CalculateBoundingBoxRectParam
> = ({ boundingBoxRect, origin, position }) =>
    mono(({ strategyPosition }) => {
        if (strategyPosition) {
            const data: CalculateBoundingBoxRectData<unknown> = {
                ...strategyPosition,
                boundingBoxRect,
                isRtl: false,
                origin,
                position,
            };

            tube(
                setRtl(data.isRtl),
                overlayYIsTop(),
                setTopAndHeightFromTop(),
                overlayYIsBottom(),
                setBottomAndHeightFromBottom(),
                overlayYIsCenter(),
                setTopAndHeightFromCenter(),
                overlayXIsStartAndNotRtl(),
                setRightAndWidthFromStart(),
                overlayXIsEndAndRtl(),
                setRightAndWidthFromEnd(),
                overlayXIsCenter(),
                setLeftAndWidthFromCenter(),
                setBoundingBoxRect(boundingBoxRect)
            )(data);
        }
    });

const overlayYIsTop = <T>(): Condition<CalculateBoundingBoxRectData<T>> =>
    condition((data) => data?.position.overlayY === 'top');

const overlayYIsBottom = <T>(): Condition<CalculateBoundingBoxRectData<T>> =>
    condition((data) => data?.position.overlayY === 'bottom');

const overlayYIsCenter = <T>(): Condition<CalculateBoundingBoxRectData<T>> =>
    condition(
        (data) =>
            !!(data && !overlayYIsTop()(data) && !overlayYIsBottom()(data))
    );
7777;
const overlayXIsStartAndNotRtl = <T>(): Condition<
    CalculateBoundingBoxRectData<T>
> => condition((data) => data?.position.overlayX === 'start' && !data.isRtl);

const overlayXIsEndAndRtl = <T>(): Condition<CalculateBoundingBoxRectData<T>> =>
    condition((data) => data?.position.overlayX === 'end' && data.isRtl);

const overlayXIsCenter = <T>(): Condition<CalculateBoundingBoxRectData<T>> =>
    condition(
        (data) =>
            !!(
                data &&
                !overlayXIsStartAndNotRtl()(data) &&
                !overlayXIsEndAndRtl()(data)
            )
    );

const setTopAndHeightFromTop = <T>(): Mono<CalculateBoundingBoxRectData<T>> =>
    mono((data) => {
        const { origin, viewportMargin, viewportRect } = data;
        if (viewportRect && viewportMargin) {
            data.top = origin.y;
            data.height = viewportRect.height - data.top + viewportMargin;
        }
    });

// Updated method signatures with generic type parameter <T>
const setBottomAndHeightFromBottom = <T>(): Mono<
    CalculateBoundingBoxRectData<T>
> =>
    mono((data) => {
        const { origin, viewportMargin, viewportRect } = data;
        if (viewportRect && viewportMargin) {
            data.bottom = viewportRect.height - origin.y + viewportMargin * 2;
            data.height = viewportRect.height - data.bottom + viewportMargin;
        }
    });

const setTopAndHeightFromCenter = <T>(): Mono<
    CalculateBoundingBoxRectData<T>
> =>
    mono((data) => {
        const { lastBoundingBoxSize, origin, viewportRect } = data;
        if (viewportRect && lastBoundingBoxSize) {
            const smallestDistanceToViewportEdge = Math.min(
                viewportRect.bottom - origin.y + viewportRect.top,
                origin.y
            );

            data.height = smallestDistanceToViewportEdge * 2;
            data.top = origin.y - smallestDistanceToViewportEdge;

            if (
                data.height > lastBoundingBoxSize.height &&
                !data.isInitialRender &&
                !data.growAfterOpen
            ) {
                data.top = origin.y - lastBoundingBoxSize.height / 2;
            }
        }
    });

const setRightAndWidthFromStart = <T>(): Mono<
    CalculateBoundingBoxRectData<T>
> =>
    mono((data) => {
        const { origin, viewportMargin, viewportRect } = data;
        if (viewportRect && viewportMargin) {
            data.right = viewportRect.width - origin.x + viewportMargin;
            data.width = origin.x - viewportMargin;
        }
    });

const setRightAndWidthFromEnd = <T>(): Mono<CalculateBoundingBoxRectData<T>> =>
    mono((data) => {
        const { origin, viewportRect } = data;
        if (viewportRect) {
            data.left = origin.x;
            data.width = viewportRect.right - origin.x;
        }
    });

const setLeftAndWidthFromCenter = <T>(): Mono<
    CalculateBoundingBoxRectData<T>
> =>
    mono((data) => {
        const { lastBoundingBoxSize, origin, viewportRect } = data;
        if (viewportRect && lastBoundingBoxSize) {
            const smallestDistanceToViewportEdge = Math.min(
                viewportRect.right - origin.x + viewportRect.left,
                origin.x
            );
            data.width = smallestDistanceToViewportEdge * 2;
            data.left = origin.x - smallestDistanceToViewportEdge;

            if (
                data.width > lastBoundingBoxSize.width &&
                !data.isInitialRender &&
                !data.growAfterOpen
            ) {
                data.left = origin.x - lastBoundingBoxSize.width / 2;
            }
        }
    });

const setBoundingBoxRect = <T>(
    boundingBoxRect: BoundingBoxRect
): Mono<CalculateBoundingBoxRectData<T>> =>
    mono((data) => {
        // Update boundingBoxRect with the calculated values
        boundingBoxRect.top = data.top ?? 0;
        boundingBoxRect.left = data.left ?? 0;
        boundingBoxRect.bottom = data.bottom ?? 0;
        boundingBoxRect.right = data.right ?? 0;
        boundingBoxRect.width = data.width ?? 0;
        boundingBoxRect.height = data.height ?? 0;
    });
