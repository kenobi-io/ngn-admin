import { coerceArray } from '@angular/cdk/coercion';
import { Bounden } from '@core-template';

import { casting } from '../../../../directive';
import { Overlay } from '../../../data';

export type ToggleClassesAttach<T> = Bounden<
    Overlay<T>,
    'backdropElement' | 'toggleClasses'
> & {
    isAdd: boolean;
};

/** Toggles a single CSS class or an array of classes on an element. */
export const toggleClassesOverlayRef = <T>(
    use: ToggleClassesAttach<T>
): Overlay<T> => {
    const { backdropElement, isAdd, toggleClasses } = use;
    return casting(use, () => {
        const classes = coerceArray(toggleClasses || []).filter((c) => !!c);
        if (classes.length) {
            isAdd
                ? backdropElement?.classList.add(...classes)
                : backdropElement?.classList.remove(...classes);
        }
    });
};
