import { Bounden } from '@core-template';

import { Use } from './data/use';

export type DestroyViewRef<T> = Bounden<Use<T>, 'viewRef'>;

/**
 * `Role` destroys view reference.
 * @param use
 * @returns `Use` instance reference
 */
export const destroyViewRef = <T>(use: DestroyViewRef<T>): Use<T> => {
    const { viewRef } = use;
    viewRef?.destroy();
    use.viewRef = undefined;

    return use as Use<T>;
};
