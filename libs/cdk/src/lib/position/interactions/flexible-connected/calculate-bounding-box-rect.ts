import { Condition, tube, unary } from '@core-template';
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
    boundingBoxRect: Dimension;
    containerRect: Dimension;
    originPoint: XOverlayPosition & YOverlayPosition;
    pos: FlexibleConnectedPosition;
    viewportRect: Dimension;
    overflow: { top?: number; bottom?: number; left?: number; right?: number };
};

type Unary<T> = UnaryFunction<Data<T>, Data<T>>;

type CD<T> = Condition<Data<T>>;

/**
 * Gets the bounding box of the overlay panel, based on the position of the origin and the strategy.
 */
export const calculateBoundingBoxRect = <T>(
    originPoint: XOverlayPosition & YOverlayPosition,
    overlaySize: Dimension,
    position: FlexibleConnectedPosition,
    viewportSize: Dimension
): ResultFlexibleConnectedStrategyPosition<T> =>
    unary((strategyPosition) => {
        const data: Data<T> = {
            ...strategyPosition,
            boundingBoxRect: {
                bottom: 0,
                height: overlaySize.height,
                left: 0,
                right: 0,
                top: 0,
                width: overlaySize.width,
            },
            containerRect: strategyPosition.containerRect || viewportSize,
            originPoint,
            overflow: {},
            pos: position,
            viewportRect: {
                bottom: 0,
                height: viewportSize.height,
                left: 0,
                right: 0,
                top: 0,
                width: viewportSize.width,
            },
        };

        tube(
            doesTheOriginXEqual('start'),
            assignXOfOriginPointToBoundingBoxRectLeft(),
            doesTheOriginXEqual('end'),
            assignXOfOriginPointToBoundingBoxRectRight(),
            doesTheOriginXEqual('center'),
            assignXOfOriginPointToBoundingBoxRectCenter(),
            doesNotTheOriginXEqual('start'),
            doesNotTheOriginXEqual('end'),
            doesNotTheOriginXEqual('center'),
            assignXOfOriginPointToBoundingBoxRectLeft(),
            assignFallbackBoundingBoxRectX(),
            doesTheOriginYEqual('top'),
            assignYOfOriginPointToBoundingBoxRectTop(),
            doesTheOriginYEqual('bottom'),
            assignYOfOriginPointToBoundingBoxRectBottom(),
            doesTheOriginYEqual('center'),
            assignYOfOriginPointToBoundingBoxRectCenter(),
            doesNotTheOriginYEqual('top'),
            doesNotTheOriginYEqual('bottom'),
            doesNotTheOriginYEqual('center'),
            assignYOfOriginPointToBoundingBoxRectTop(),
            assignFallbackBoundingBoxRectY(),
            adjustXForRtl(),
            adjustYForRtl(overlaySize),
            ensureBoundingRectInViewport(),
            assignFallbackBoundingBoxRect()
        )(data);
    });

/**
 * Returns a condition that checks whether the `originX` property in the given data object is equal to the
 * provided value.
 * @param value The value to check against.
 */
const doesTheOriginXEqual =
    <T>(value: XOverlayPosition): CD<T> =>
    (data: Data<T>) =>
        data.pos.originX === value;

const assignXOfOriginPointToBoundingBoxRectLeft = <T>(): Unary<T> =>
    unary((data) => {
        const { boundingBoxRect, originPoint } = data;
        boundingBoxRect.left = originPoint.x;
    });

const doesNotTheOriginXEqual =
    <T>(position: XOverlayPosition): CD<T> =>
    (data) =>
        position !== 'center' && data.pos.originX !== position;

const assignXOfOriginPointToBoundingBoxRectRight = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                left: data.x - data.originRect.width,
                right: data.x,
            })
    );

const assignXOfOriginPointToBoundingBoxRectCenter = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                left: data.x - data.originRect.width / 2,
                right: data.x + data.originRect.width / 2,
            })
    );

const doesTheOriginYEqual =
    <T>(position: YOverlayPosition): CD<T> =>
    (data) =>
        data.pos.originY === position;

const assignYOfOriginPointToBoundingBoxRectTop = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                bottom: data.y + data.originRect.height,
                top: data.y,
            })
    );

const doesNotTheOriginYEqual =
    <T>(position: YOverlayPosition): CD<T> =>
    (data) =>
        position !== 'center' && data.pos.originY !== position;

/**
 * Assigns a fallback bounding box rectangle to the data object if the calculated bounding box is out of viewport.
 * This function should be called after all other bounding box adjustments are done.
 */
const assignFallbackBoundingBoxRect = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                left: Math.max(
                    0,
                    Math.min(
                        data.boundingBoxRect.left,
                        data.viewportRect.width - data.boundingBoxRect.width
                    )
                ),
                top: Math.max(
                    0,
                    Math.min(
                        data.boundingBoxRect.top,
                        data.viewportRect.height - data.boundingBoxRect.height
                    )
                ),
            })
    );

/**
 * Assigns a fallback X value to the bounding box rectangle if the origin point is too close to the edge of the viewport.
 */
const assignFallbackBoundingBoxRectX = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                left: Math.max(
                    0,
                    Math.min(
                        data.boundingBoxRect.left,
                        data.containerRect.width - data.boundingBoxRect.width
                    )
                ),
            })
    );

/**
 * Assigns the Y coordinate of the origin point to the bottom of the bounding box rectangle.
 */
const assignYOfOriginPointToBoundingBoxRectBottom = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                bottom: data.containerRect.height - data.y,
                top:
                    data.containerRect.height - data.y - data.originRect.height,
            })
    );

/**
 * Assigns the Y coordinate of the origin point to the center of the bounding box rectangle.
 */
const assignYOfOriginPointToBoundingBoxRectCenter = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                bottom:
                    data.y +
                    data.originRect.height / 2 +
                    data.boundingBoxRect.height / 2,
                top:
                    data.y -
                    data.originRect.height / 2 -
                    data.boundingBoxRect.height / 2,
            })
    );

/**
 * Assigns a fallback Y value to the bounding box rectangle if the origin point is too close to the edge of the viewport.
 */
const assignFallbackBoundingBoxRectY = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                bottom: Math.max(
                    0,
                    Math.min(
                        data.boundingBoxRect.bottom,
                        data.containerRect.height
                    )
                ),
                top: Math.max(
                    0,
                    Math.min(
                        data.boundingBoxRect.top,
                        data.containerRect.height - data.boundingBoxRect.height
                    )
                ),
            })
    );

/**
 * Adjusts the X coordinate of the bounding box rectangle if the layout direction is right-to-left.
 */
const adjustXForRtl = <T>(): Unary<T> =>
    unary(
        (data) =>
            (data.boundingBoxRect = {
                ...data.boundingBoxRect,
                left: isOverlayRefDirectionRtl(data)
                    ? data.containerRect.width - data.boundingBoxRect.right
                    : data.boundingBoxRect.left,
                right: isOverlayRefDirectionRtl(data)
                    ? data.containerRect.width - data.boundingBoxRect.left
                    : data.boundingBoxRect.right,
            })
    );

/**
 * Ensures that the bounding box of the overlay panel is fully contained within the viewport, adjusting its position
 * if necessary.
 */
const ensureBoundingRectInViewport = <T>(): Unary<T> =>
    unary((data) => {
        const { boundingBoxRect, overflow, viewportRect } = data;
        overflow.top = Math.max(viewportRect.top - boundingBoxRect.top, 0);
        overflow.bottom = Math.max(
            boundingBoxRect.bottom - viewportRect.bottom,
            0
        );
        overflow.left = Math.max(viewportRect.left - boundingBoxRect.left, 0);
        overflow.right = Math.max(
            boundingBoxRect.right - viewportRect.right,
            0
        );

        const { bottom, left, right, top } = overflow;
        if (top > 0) {
            boundingBoxRect.top += top;
            boundingBoxRect.bottom += top;
        }

        if (bottom > 0) {
            boundingBoxRect.top -= bottom;
            boundingBoxRect.bottom -= bottom;
        }

        if (left > 0) {
            boundingBoxRect.left += left;
            boundingBoxRect.right += left;
        }

        if (right > 0) {
            boundingBoxRect.left -= right;
            boundingBoxRect.right -= right;
        }
    });

/**
 * Adjusts the position of the overlay panel horizontally if the page direction is right-to-left (RTL).
 */
const adjustYForRtl = <T>(overlaySize: Dimension): Unary<T> =>
    unary((data) => {
        if (isOverlayRefDirectionRtl(data)) {
            data.boundingBoxRect.top -= data.originRect.top;
            data.boundingBoxRect.bottom -= data.originRect.top;
            data.boundingBoxRect.top += overlaySize.height;
            data.boundingBoxRect.bottom += overlaySize.height;
        }
    });

// import { unary } from '@core-template';

// import { isOverlayRefDirectionRtl } from '../../../overlay';
// import { Point } from '../../../platform';
// import {
//     FlexibleConnectedPosition,
//     ResultFlexibleConnectedStrategyPosition,
// } from '../../data';

// /**
//  * Gets the position and size of the overlay's sizing container.
//  * @internal
//  * This method does no measuring and applies no styles so that we can cheaply compute the
//  * bounds for all positions and choose the best fit based on these results.
//  */

// export const calculateBoundingBoxRect = (
//     origin: Point,
//     position: FlexibleConnectedPosition
// ): ResultFlexibleConnectedStrategyPosition<T> =>
//     unary((strategyPosition) => {
//         const viewport = this._viewportRect;
//         const isRtl = isOverlayRefDirectionRtl();
//         let height: number, top: number, bottom: number;

//         if (position.overlayY === 'top') {
//             // Overlay is opening "downward" and thus is bound by the bottom viewport edge.
//             top = origin.y;
//             height = viewport.height - top + this._viewportMargin;
//         } else if (position.overlayY === 'bottom') {
//             // Overlay is opening "upward" and thus is bound by the top viewport edge. We need to add
//             // the viewport margin back in, because the viewport rect is narrowed down to remove the
//             // margin, whereas the `origin` position is calculated based on its `ClientRect`.
//             bottom = viewport.height - origin.y + this._viewportMargin * 2;
//             height = viewport.height - bottom + this._viewportMargin;
//         } else {
//             // If neither top nor bottom, it means that the overlay is vertically centered on the
//             // origin point. Note that we want the position relative to the viewport, rather than
//             // the page, which is why we don't use something like `viewport.bottom - origin.y` and
//             // `origin.y - viewport.top`.
//             const smallestDistanceToViewportEdge = Math.min(
//                 viewport.bottom - origin.y + viewport.top,
//                 origin.y
//             );

//             const previousHeight = this._lastBoundingBoxSize.height;

//             height = smallestDistanceToViewportEdge * 2;
//             top = origin.y - smallestDistanceToViewportEdge;

//             if (
//                 height > previousHeight &&
//                 !this._isInitialRender &&
//                 !this._growAfterOpen
//             ) {
//                 top = origin.y - previousHeight / 2;
//             }
//         }

//         // The overlay is opening 'right-ward' (the content flows to the right).
//         const isBoundedByRightViewportEdge =
//             (position.overlayX === 'start' && !isRtl) ||
//             (position.overlayX === 'end' && isRtl);

//         // The overlay is opening 'left-ward' (the content flows to the left).
//         const isBoundedByLeftViewportEdge =
//             (position.overlayX === 'end' && !isRtl) ||
//             (position.overlayX === 'start' && isRtl);

//         let width: number, left: number, right: number;

//         if (isBoundedByLeftViewportEdge) {
//             right = viewport.width - origin.x + this._viewportMargin;
//             width = origin.x - this._viewportMargin;
//         } else if (isBoundedByRightViewportEdge) {
//             left = origin.x;
//             width = viewport.right - origin.x;
//         } else {
//             // If neither start nor end, it means that the overlay is horizontally centered on the
//             // origin point. Note that we want the position relative to the viewport, rather than
//             // the page, which is why we don't use something like `viewport.right - origin.x` and
//             // `origin.x - viewport.left`.
//             const smallestDistanceToViewportEdge = Math.min(
//                 viewport.right - origin.x + viewport.left,
//                 origin.x
//             );
//             const previousWidth = this._lastBoundingBoxSize.width;

//             width = smallestDistanceToViewportEdge * 2;
//             left = origin.x - smallestDistanceToViewportEdge;

//             if (
//                 width > previousWidth &&
//                 !this._isInitialRender &&
//                 !this._growAfterOpen
//             ) {
//                 left = origin.x - previousWidth / 2;
//             }
//         }

//         return {
//             bottom: bottom!,
//             height,
//             left: left!,
//             right: right!,
//             top: top!,
//             width,
//         };
//     });
