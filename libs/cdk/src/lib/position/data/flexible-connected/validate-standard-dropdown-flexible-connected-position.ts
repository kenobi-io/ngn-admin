import {
    validateHorizontalPosition,
    validateVerticalPosition,
} from '@angular/cdk/overlay';

import { FlexibleConnectedStrategyPosition } from './flexible-connected-strategy-position';

/** Validates that the current position match the expected values. */
export const validateFlexibleConnectedStrategyPosition = <T>(
    strategyPosition: FlexibleConnectedStrategyPosition<T>
): FlexibleConnectedStrategyPosition<T> => {
    const { preferredPositions } = strategyPosition;

    if (!preferredPositions.length) {
        throw new Error(
            'FlexibleConnectedPositionStrategy: At least one position is required.'
        );
    }

    // TODO(crisbeto): remove these once Angular's template type
    // checking is advanced enough to catch these cases.
    preferredPositions.forEach((pair) => {
        validateHorizontalPosition('originX', pair.originX);
        validateVerticalPosition('originY', pair.originY);
        validateHorizontalPosition('overlayX', pair.overlayX);
        validateVerticalPosition('overlayY', pair.overlayY);
    });

    return strategyPosition;
};
