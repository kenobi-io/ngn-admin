import { FlexibleConnectedStrategyPosition } from './flexible-connected-strategy-position';

/** @internal Clears the classes that the position strategy has applied from the overlay panel. */
export const clearClassesPanel = <T>(
    strategyPosition: FlexibleConnectedStrategyPosition<T>
): FlexibleConnectedStrategyPosition<T> => {
    const { appliedPanelClasses, pane } = strategyPosition;
    if (pane) {
        appliedPanelClasses.forEach((cssClass) => {
            pane.classList.remove(cssClass);
        });
        strategyPosition.appliedPanelClasses = [];
    }

    return strategyPosition;
};
