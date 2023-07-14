import {
    FlexibleConnectedPosition,
    FlexibleConnectedStrategyPosition as Fcsp,
    ResultFlexibleConnectedStrategyPosition as Rfcsp,
} from '../../data';

/** @internal Retrieves the offset of a position along the x or y axis. */
export const offset =
    <T>(position: FlexibleConnectedPosition, axis: 'x' | 'y'): Rfcsp<T> =>
    (strategyPosition: Fcsp<T>): Fcsp<T> => {
        const { offsetX, offsetY } = strategyPosition;
        strategyPosition.offsetXAndY = undefined;
        if (axis === 'x') {
            // We don't do something like `position['offset' + axis]` in
            // order to avoid breaking minifiers that rename properties.
            strategyPosition.offsetXAndY = position.offsetX
                ? offsetX
                : position.offsetY;
        } else {
            strategyPosition.offsetXAndY = position.offsetY
                ? offsetY
                : position.offsetY;
        }
        return strategyPosition;
    };
