import { Optional } from '@core-template';

import { Use } from './use';

export type ClearViewContainerRefUse<T> = Optional<Use<T>, 'viewContainerRef'>;

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

    return use as Use<T>;
};
