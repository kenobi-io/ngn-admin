import { Bounden } from '@core-template';

import { Use } from './use';

export type ClearViewContainerRefUse<T> = Bounden<Use<T>, 'viewContainerRef'>;

/**
 * `Role` clears container reference in view.
 * @param use
 * @returns `Use` instance reference
 */
export const clearViewContainerRef = <T>(
    use: ClearViewContainerRefUse<T>
): Use<T> => {
    const { viewContainerRef } = use;
    viewContainerRef.clear();
    delete use.context; // TODO: = undefined ?
    return use as Use<T>;
};
