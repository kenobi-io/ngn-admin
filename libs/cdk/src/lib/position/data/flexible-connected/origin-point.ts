import { isOverlayRefDirectionRtl } from '../../../overlay/interactions/ref/overlay-ref-direction-rtl';
import { Dimension } from '../../../platform';
import { FlexibleConnectedPosition } from './flexible-connected-position';
import { FlexibleConnectedStrategyPosition } from './flexible-connected-strategy-position';
import { ResultFlexibleConnectedStrategyPosition } from './result-flexible-connected-strategy-position';

/**
 * @internal
 * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
 */
export const originPoint = <T>(
    originRect: Dimension,
    containerRect: Dimension,
    pos: FlexibleConnectedPosition
): ResultFlexibleConnectedStrategyPosition<T> => {
    return (
        strategyPosition: FlexibleConnectedStrategyPosition<T>
    ): FlexibleConnectedStrategyPosition<T> => {
        const { fallback } = strategyPosition;
        let x: number;

        if (pos.originX == 'center') {
            // Note: when centering we should always use the `left`
            // offset, otherwise the position will be wrong in RTL.
            x = originRect.left + originRect.width / 2;
        } else {
            const startX = isOverlayRefDirectionRtl(strategyPosition)
                ? originRect.right
                : originRect.left;
            const endX = isOverlayRefDirectionRtl(strategyPosition)
                ? originRect.left
                : originRect.right;
            x = pos.originX == 'start' ? startX : endX;
        }

        // When zooming in Safari the container rectangle contains negative values for the position
        // and we need to re-add them to the calculated coordinates.
        if (containerRect.left < 0) {
            x -= containerRect.left;
        }
        let y: number;

        if (pos.originY == 'center') {
            y = originRect.top + originRect.height / 2;
        } else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }

        // Normally the containerRect's top value would be zero, however when the overlay is attached to an input
        // (e.g. in an autocomplete), mobile browsers will shift everything in order to put the input in the middle
        // of the screen and to make space for the virtual keyboard. We need to account for this offset,
        // otherwise our positioning will be thrown off.
        // Additionally, when zooming in Safari this fixes the vertical position.
        if (containerRect.top < 0) {
            y -= containerRect.top;
        }
        fallback && (fallback.originPoint = { x, y });

        return strategyPosition;
    };
};
