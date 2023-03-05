import { FlexibleConnectedPosition } from './flexible-connected-position';
import { FlexibleConnectedStrategyPosition as Fcsp } from './flexible-connected-strategy-position';
import { ResultFlexibleConnectedStrategyPosition as Rfcsp } from './result-flexible-connected-strategy-position';

/** @internal Retrieves the offset of a position along the x or y axis. */
export const offset = <T>(
    position: FlexibleConnectedPosition,
    axis: 'x' | 'y'
): Rfcsp<T> => {
    return (strategyPosition: Fcsp<T>): Fcsp<T> => {
        const { offsetX, offsetY } = strategyPosition;

        if (axis === 'x') {
            // We don't do something like `position['offset' + axis]` in
            // order to avoid breaking minifiers that rename properties.
            strategyPosition.offsetXY = position.offsetX
                ? offsetX
                : position.offsetY;
        } else {
            strategyPosition.offsetXY = position.offsetY
                ? offsetY
                : position.offsetY;
        }
        return strategyPosition;
    };
};
