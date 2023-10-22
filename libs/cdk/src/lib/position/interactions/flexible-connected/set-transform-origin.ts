import { mono } from '@core-template';

import { isOverlayRefDirectionRtl, OverlayCapability } from '../../../overlay';
import {
    FlexibleConnectedPosition,
    FlexibleConnectedStrategyPositionCapability,
    ParamsMonoStrategyPositionCapability,
} from '../../data';

/** Sets the transform origin based on the configured selector and the passed-in position. */
export const setTransformOrigin: ParamsMonoStrategyPositionCapability<
    FlexibleConnectedStrategyPositionCapability,
    FlexibleConnectedPosition
> = (position) =>
    mono(({ strategyPosition }) => {
        if (strategyPosition) {
            const { boundingBox, transformOriginSelector } = strategyPosition;
            const elements = getElementsWithSelector(
                transformOriginSelector,
                boundingBox
            );

            const xOrigin = calculateXOriginValue(strategyPosition, position);
            const yOrigin = position.overlayY;

            for (const element of elements) {
                element.style.transformOrigin = `${xOrigin} ${yOrigin}`;
            }
        }
    });

const getElementsWithSelector = (
    transformOriginSelector?: string,
    boundingBox?: HTMLElement
): HTMLElement[] =>
    Array.from(
        boundingBox?.querySelectorAll<HTMLElement>(
            transformOriginSelector || ''
        ) ?? []
    );

const calculateXOriginValue = <T>(
    { overlay }: OverlayCapability<T>,
    position: FlexibleConnectedPosition
): 'left' | 'right' | 'center' => {
    if (position.overlayX === 'center') {
        return 'center';
    } else if (overlay && isOverlayRefDirectionRtl({ overlay })) {
        return position.overlayX === 'start' ? 'right' : 'left';
    } else {
        return position.overlayX === 'start' ? 'left' : 'right';
    }
};
