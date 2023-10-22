import {
    ConnectionPositionPair,
    validateHorizontalPosition,
    validateVerticalPosition,
} from '@angular/cdk/overlay';
import { each, finish, isEmpty, mono, tube } from '@core-template';

import {
    FlexibleConnectedStrategyPositionCapability,
    MonoStrategyPositionCapability,
    StrategyPositionCapability,
} from '../../data';

/** Validates that the current position match the expected values. */
export const validateFlexibleConnectedStrategyPosition: MonoStrategyPositionCapability<
    FlexibleConnectedStrategyPositionCapability
> = () =>
    mono(({ strategyPosition }) => {
        if (strategyPosition)
            tube(
                isEmpty('preferredPositions'),
                throwError(),
                each<ConnectionPositionPair>('preferredPositions', (pair) => {
                    validateHorizontalPosition('originX', pair.originX);
                    validateVerticalPosition('originY', pair.originY);
                    validateHorizontalPosition('overlayX', pair.overlayX);
                    validateVerticalPosition('overlayY', pair.overlayY);
                })
            )(strategyPosition);
    });

const throwError: MonoStrategyPositionCapability<
    StrategyPositionCapability
> = () =>
    mono(() => {
        throw new Error(
            'FlexibleConnectedPositionStrategy: At least one position is required.'
        );
    }, finish);
