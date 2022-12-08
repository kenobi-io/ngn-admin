import { coerceArray } from '@angular/cdk/coercion';
import { Bounden } from '@core-template';

import { using } from '../../directive';
import { Attach } from './attach';

export type ToggleClassesAttach<T> = Bounden<
    Attach<T>,
    'backdropElement' | 'toggleClasses'
> & {
    isAdd: boolean;
};

/** Toggles a single CSS class or an array of classes on an element. */
export const toggleClassesAttach = <T>(
    use: ToggleClassesAttach<T>
): Attach<T> => {
    const { backdropElement, isAdd, toggleClasses } = use;
    return using(use, () => {
        const classes = coerceArray(toggleClasses || []).filter((c) => !!c);
        if (classes.length) {
            isAdd
                ? backdropElement?.classList.add(...classes)
                : backdropElement?.classList.remove(...classes);
        }
    });
};
