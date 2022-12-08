import { Bounden } from '@core-template';

import { using } from '../directive';
import { Attach } from './attach/attach';
import { toggleClassesAttach } from './attach/toggle-classes-attach';

export type PanelClassOverlayRef<T> = Bounden<
    Attach<T>,
    'backdropElement' | 'pane' | 'panelClass'
>;

/** Add a CSS class or an array of classes to the overlay pane. */
export const addPanelClassOverlayRef = <T>(
    use: PanelClassOverlayRef<T>
): Attach<T> => {
    return using(use, () => {
        const { pane, panelClass } = use;
        if (pane) {
            use.toggleClasses = panelClass;
            const tca = { ...use, isAdd: true };
            toggleClassesAttach(tca);
        }
    });
};

/** Remove a CSS class or an array of classes from the overlay pane. */
export const removePanelClassOverlayRef = <T>(
    use: PanelClassOverlayRef<T>
): Attach<T> => {
    return using(use, () => {
        const { pane, panelClass } = use;
        if (pane) {
            use.toggleClasses = panelClass;
            const tca = { ...use, isAdd: false };
            toggleClassesAttach(tca);
        }
    });
};
