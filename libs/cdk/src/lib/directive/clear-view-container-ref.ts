import { Bounden } from '@core-template';

import { Ref } from './data';

export type ClearViewContainerRef<T> = Bounden<Ref<T>, 'viewContainerRef'>;

/**
 * `Role` clears container reference in view.
 * @param use
 * @returns `Use` instance reference
 */
export const clearViewContainerRef = <T>(
    use: ClearViewContainerRef<T>
): Ref<T> => {
    const { viewContainerRef } = use;
    viewContainerRef.clear();
    use.context = undefined;

    return use as Ref<T>;
};
