import { ConnectedPosition } from '@angular/cdk/overlay';

import {
    FlexibleConnectedStrategyPosition as fcsp,
    ResultFlexibleConnectedStrategyPosition as Rfcsp,
} from '../../data';
import { validateFlexibleConnectedStrategyPosition } from './validate-standard-dropdown-flexible-connected-position';

/**
 * Adds new preferred positions.
 * @param positions List of positions options for this overlay.
 */
export const withFlexibleConnectedStrategyPosition = <T>(
    positions: ConnectedPosition[]
): Rfcsp<T> => {
    return (strategyPosition: fcsp<T>): fcsp<T> => {
        const { lastPosition } = strategyPosition;
        strategyPosition.preferredPositions = positions;
        // If the last calculated position object isn't part of the positions anymore, clear
        // it in order to avoid it being picked up if the consumer tries to re-apply.
        if (lastPosition && positions.indexOf(lastPosition) === -1) {
            strategyPosition.lastPosition = undefined;
        }
        validateFlexibleConnectedStrategyPosition()({ strategyPosition });

        return strategyPosition;
    };
};
