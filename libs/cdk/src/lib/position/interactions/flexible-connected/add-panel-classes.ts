import { coerceArray } from '@angular/cdk/coercion';
import { mono } from '@core-template';

import {
    FlexibleConnectedStrategyPosition,
    ResultFlexibleConnectedStrategyPosition,
} from '../../data';

/**  @internal Adds a single CSS class or an array of classes on the overlay panel. */
export const addPanelClasses = <T>(
    cssClasses?: string | string[]
): ResultFlexibleConnectedStrategyPosition<T> =>
    mono((sp: FlexibleConnectedStrategyPosition<T>) => {
        const { appliedPanelClasses, pane } = sp;

        if (pane && cssClasses) {
            coerceArray(cssClasses).forEach((cssClass) => {
                if (
                    cssClass !== '' &&
                    appliedPanelClasses.indexOf(cssClass) === -1
                ) {
                    appliedPanelClasses.push(cssClass);
                    pane.classList.add(cssClass);
                }
            });
        }
    });
