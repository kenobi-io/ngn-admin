import { Bounden } from '@core-template';

import { casting } from '../../../directive';
import { OverlayRef } from '../../data';
import { toggleClassesOverlayRef } from './attach/toggle-classes-overlay-ref';

export type PanelClassOverlayRef<T> = Bounden<
    OverlayRef<T>,
    'backdropElement' | 'pane' | 'panelClass'
>;

/** Add a CSS class or an array of classes to the overlay pane. */
export const addPanelClassOverlayRef = <T>(
    use: PanelClassOverlayRef<T>
): OverlayRef<T> => {
    return casting(use, () => {
        const { pane, panelClass } = use;
        if (pane) {
            use.toggleClasses = panelClass;
            const tca = { ...use, isAdd: true };
            toggleClassesOverlayRef(tca);
        }
    });
};

/** Remove a CSS class or an array of classes from the overlay pane. */
export const removePanelClassOverlayRef = <T>(
    use: PanelClassOverlayRef<T>
): OverlayRef<T> => {
    return casting(use, () => {
        const { pane, panelClass } = use;
        if (pane) {
            use.toggleClasses = panelClass;
            const tca = { ...use, isAdd: false };
            toggleClassesOverlayRef(tca);
        }
    });
};
