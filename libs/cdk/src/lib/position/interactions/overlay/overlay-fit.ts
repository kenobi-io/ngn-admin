import { ConnectedPosition } from '@angular/cdk/overlay';
import { Mono, tube, unary } from '@core-template';

import { Dimension, Point } from '../../../platform';
import {
    FlexibleConnectedStrategyPosition,
    ParamsUnaryApplyFlexibleConnectedStrategyPosition,
} from '../../data';

type OverlayFit<T> = Partial<
    FlexibleConnectedStrategyPosition<T> & {
        rawOverlayRect: Dimension;
        viewport: Dimension;
        offsetX: number;
        offsetY: number;
        visibleWidth: number;
        visibleHeight: number;
    }
>;

export type FitOverlay = {
    visibleArea?: number;
    isCompletelyWithinViewport?: boolean;
    fitsInViewportVertically?: boolean;
    fitsInViewportHorizontally?: boolean;
};

type ParamsFitOverlay = {
    point: Point;
    position: ConnectedPosition;
    fitOverlay: FitOverlay;
};

export const overlayFit: ParamsUnaryApplyFlexibleConnectedStrategyPosition<
    ParamsFitOverlay
> = (paramsFitOverlay) =>
    unary((strategyPosition) => {
        const data = {
            ...strategyPosition,
            offsetX: 0,
            offsetY: 0,
            viewport: undefined,
        };
        const { fitOverlay, point, position } = paramsFitOverlay;
        tube(
            getRoundedBoundingClientRect(),
            getOffset('x', position),
            getOffset('y', position),
            subtractOverflows('width', point),
            subtractOverflows('height', point),
            calculateOverlayFit(fitOverlay)
        )(data);
    });

const calculateOverlayFit = <T>(overlayFit?: FitOverlay): Mono<OverlayFit<T>> =>
    unary((data) => {
        const { rawOverlayRect, visibleHeight, visibleWidth } = data;
        // Visible parts of the element on each axis.
        const visibleArea = (visibleWidth ?? 0) * (visibleHeight ?? 0);

        if (rawOverlayRect) {
            const { height, width } = rawOverlayRect;
            overlayFit = {
                fitsInViewportHorizontally: visibleWidth === width,
                fitsInViewportVertically: visibleHeight === height,
                isCompletelyWithinViewport: width * height === visibleArea,
                visibleArea,
            };
        }

        return overlayFit;
    });

/**
 * Round the overlay rectangle's position and size when comparing against the viewport,
 * because the viewport is always rounded.
 *
 * @param rect The overlay rectangle to be rounded.
 * @returns The rounded overlay rectangle.
 */
const getRoundedBoundingClientRect = <T>(): Mono<OverlayFit<T>> =>
    unary((data) => {
        const { overlayRect } = data;
        if (overlayRect) {
            data.rawOverlayRect = {
                bottom: Math.floor(overlayRect.bottom),
                height: Math.floor(overlayRect.height),
                left: Math.floor(overlayRect.left),
                right: Math.floor(overlayRect.right),
                top: Math.floor(overlayRect.top),
                width: Math.floor(overlayRect.width),
            };
        }
    });

/**
 * Get the offset for a given connected position and direction (x or y).
 *
 * @param position The connected position.
 * @param direction The direction ('x' or 'y').
 * @returns The offset value.
 */
const getOffset = <T>(
    direction: 'x' | 'y',
    position: ConnectedPosition
): Mono<OverlayFit<T>> =>
    unary((data) => {
        const { offsetX, offsetY } = data;
        if (direction === 'x') {
            // We don't do something like `position['offset' + axis]` in
            // order to avoid breaking minifiers that rename properties.
            data.offsetX =
                position.offsetX == undefined ? offsetX : position.offsetX;
        }

        data.offsetX =
            position.offsetY == undefined ? offsetY : position.offsetY;
    });

/**
 * Subtract overflows on each side to calculate the visible length of the element on an axis.
 *
 * @param totalLength The total length of the element on the axis.
 * @param negativeOverflow The negative overflow on the axis.
 * @param positiveOverflow The positive overflow on the axis.
 * @returns The visible length of the element on the axis.
 */
const subtractOverflows = <T>(
    side: 'width' | 'height',
    point: Point
): Mono<OverlayFit<T>> =>
    unary((data) => {
        const { offsetX, offsetY, rawOverlayRect, viewport } = data;
        let { x, y } = point;

        // Account for the offsets since they could push the overlay out of the viewport.
        if (offsetX) {
            x += offsetX;
        }

        if (offsetY) {
            y += offsetY;
        }

        let totalLength;
        let negativeOverflow;
        let positiveOverflow;

        if (side === 'width' && rawOverlayRect && viewport) {
            totalLength = rawOverlayRect.width;
            (negativeOverflow = 0 - x),
                (positiveOverflow = x + rawOverlayRect.width - viewport.width);
            const visibleLength =
                totalLength -
                Math.max(0, -negativeOverflow) -
                Math.max(0, positiveOverflow);
            data.visibleWidth = visibleLength > 0 ? visibleLength : 0;
        }

        if (side === 'height' && rawOverlayRect && viewport) {
            (totalLength = rawOverlayRect.height),
                (negativeOverflow = 0 - y),
                (positiveOverflow =
                    y + rawOverlayRect.height - viewport.height);
            const visibleLength =
                totalLength -
                Math.max(0, -negativeOverflow) -
                Math.max(0, positiveOverflow);
            data.visibleHeight = visibleLength > 0 ? visibleLength : 0;
        }
    });
