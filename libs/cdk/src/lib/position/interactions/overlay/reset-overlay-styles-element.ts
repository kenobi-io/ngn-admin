import { unary } from '@core-template';

import { extendStyle } from '../../../platform';
import {
    FlexibleConnectedStrategyPosition,
    ResultFlexibleConnectedStrategyPosition,
} from '../../data';

/** @internal Resets the styles for the overlay pane so that a new positioning can be computed. */
export const resetOverlayStylesElement = <T>({
    pane,
}: FlexibleConnectedStrategyPosition<T>): ResultFlexibleConnectedStrategyPosition<T> =>
    unary(() =>
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
        )
    );
