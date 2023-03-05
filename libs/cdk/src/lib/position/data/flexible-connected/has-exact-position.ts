import { FlexibleConnectedStrategyPosition } from './flexible-connected-strategy-position';

// TODO: rename all methods that not exported must be removed postfix type from name like hasExactPosition
/**  @internal Determines whether the overlay uses exact or flexible positioning. */
export const hasExactPosition = <T>(
    strategyPosition: FlexibleConnectedStrategyPosition<T>
): boolean => {
    const { hasFlexibleDimensions, isPushed } = strategyPosition;
    return !hasFlexibleDimensions || isPushed;
};
