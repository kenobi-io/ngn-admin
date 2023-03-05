import { extendStyle } from '../../../platform';
import { FlexibleConnectedStrategyPosition } from './flexible-connected-strategy-position';

/** @internal Resets the styles for the overlay pane so that a new positioning can be computed. */
export const resetOverlayStylesElement = <T>(
    strategyPosition: FlexibleConnectedStrategyPosition<T>
): FlexibleConnectedStrategyPosition<T> => {
    const { pane } = strategyPosition;
    extendStyle(
        pane.style,
        {
            bottom: '',
            left: '',
            position: '',
            right: '',
            top: '',
            transform: '',
        },
        false
    );
    return strategyPosition;
};
