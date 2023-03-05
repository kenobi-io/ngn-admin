import { FlexibleConnectedStrategyPosition } from '../../../position/data';

/** Whether the we're dealing with an RTL context */
export const isOverlayRefDirectionRtl = <T>(
    flexibleConnectedStrategyPosition: FlexibleConnectedStrategyPosition<T>
): boolean => {
    const { overlay } = flexibleConnectedStrategyPosition;
    if (overlay) {
        return overlay.ref.direction === 'rtl';
    }
    return false;
};
