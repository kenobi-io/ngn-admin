import { ConnectedPosition } from '@angular/cdk/overlay';
import { Mono, mono, tube } from '@core-template';

import { Dimension, Point } from '../../../platform';
import {
    FlexibleConnectedStrategyPosition,
    FlexibleConnectedStrategyPositionCapability,
    ParamsMonoStrategyPositionCapability,
} from '../../data';

export type FitOverlay = {
    visibleArea?: number;
    isCompletelyWithinViewport?: boolean;
    fitsInViewportVertically?: boolean;
    fitsInViewportHorizontally?: boolean;
};

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

type ParamsOverlayFit = {
    point: Point;
    position: ConnectedPosition;
    fitOverlay: FitOverlay;
};

export const overlayFit: ParamsMonoStrategyPositionCapability<
    FlexibleConnectedStrategyPositionCapability,
    ParamsOverlayFit
> = ({ fitOverlay, point, position }, finish) =>
    mono(({ strategyPosition }) => {
        const data = {
            ...strategyPosition,
            offsetX: 0,
            offsetY: 0,
            viewport: undefined,
        };
        tube(
            setRawOverlayRect(),
            setOffset('x', position),
            setOffset('y', position),
            subtractVisibleHeightOrWidth('width', point),
            subtractVisibleHeightOrWidth('height', point),
            setOverlayFit(fitOverlay)
        )(data);
    }, finish);

/**
 * Round the overlay rectangle's position and size when comparing against the viewport,
 * because the viewport is always rounded.
 *
 * @param rect The overlay rectangle to be rounded.
 * @returns The rounded overlay rectangle.
 */
const setRawOverlayRect = <T>(): Mono<OverlayFit<T>> =>
    mono((data) => {
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
const setOffset = <T>(
    direction: 'x' | 'y',
    position: ConnectedPosition
): Mono<OverlayFit<T>> =>
    mono((data) => {
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
const subtractVisibleHeightOrWidth = <T>(
    side: 'width' | 'height',
    point: Point
): Mono<OverlayFit<T>> =>
    mono((data) => {
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

const setOverlayFit = <T>(overlayFit?: FitOverlay): Mono<OverlayFit<T>> =>
    mono((data) => {
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
