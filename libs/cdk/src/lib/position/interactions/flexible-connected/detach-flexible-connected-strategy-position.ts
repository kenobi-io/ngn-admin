import {
    FlexibleConnectedStrategyPosition,
    ResultFlexibleConnectedStrategyPosition,
} from '../../data';

type DetachFlexibleConnectedStrategyPosition = <T>(
    clearPanelClasses: ResultFlexibleConnectedStrategyPosition<T>
) => ResultFlexibleConnectedStrategyPosition<T>;

export const detachFlexibleConnectedStrategyPosition: DetachFlexibleConnectedStrategyPosition =
    <T>(
        clearPanelClasses: ResultFlexibleConnectedStrategyPosition<T>
    ): ResultFlexibleConnectedStrategyPosition<T> => {
        // const { clearPanelClasses } = fns;
        return (
            strategyPosition: FlexibleConnectedStrategyPosition<T>
        ): FlexibleConnectedStrategyPosition<T> => {
            const { resizeSubscription } = strategyPosition;
            clearPanelClasses(strategyPosition);
            strategyPosition.lastPosition = undefined;
            strategyPosition.previousPushAmount = undefined;
            resizeSubscription.unsubscribe();
            return strategyPosition;
        };
    };
