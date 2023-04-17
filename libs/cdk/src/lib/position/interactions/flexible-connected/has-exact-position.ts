import { FlexibleConnectedStrategyPosition } from '../../data';

// TODO: rename all methods that not exported must be removed postfix type from name like hasExactPosition
/**  @internal Determines whether the overlay uses exact or flexible positioning. */
export const hasExactPosition = <T>({
    hasFlexibleDimensions,
    isPushed,
}: FlexibleConnectedStrategyPosition<T>): boolean =>
    !hasFlexibleDimensions || isPushed;
