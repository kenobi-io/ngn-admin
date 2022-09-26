import { Optional } from '@core-template';

import { Use } from './use';

export type DestroyViewRefUse<T> = Optional<Use<T>, 'viewRef'>;

/**
 * `Role` destroys view reference.
 * @param use
 * @returns `Use` instance reference
 */
export const destroyViewRef = <T>(use: DestroyViewRefUse<T>): Use<T> => {
    const { viewRef } = use;
    viewRef?.destroy();
    use.viewRef = null;

    return use as Use<T>;
};
