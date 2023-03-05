import { Bounden } from '@core-template';

import { Use } from './data';

export type ClearViewContainerRef<T> = Bounden<Use<T>, 'viewContainerRef'>;

/**
 * `Role` clears container reference in view.
 * @param use
 * @returns `Use` instance reference
 */
export const clearViewContainerRef = <T>(
    use: ClearViewContainerRef<T>
): Use<T> => {
    const { viewContainerRef } = use;
    viewContainerRef.clear();
    use.context = undefined;

    return use as Use<T>;
};
