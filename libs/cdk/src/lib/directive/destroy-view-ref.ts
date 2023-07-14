import { Bounden } from '@core-template';

import { Ref } from './data/ref';

export type DestroyViewRef<T> = Bounden<Ref<T>, 'viewRef'>;

/**
 * `Role` destroys view reference.
 * @param use
 * @returns `Use` instance reference
 */
export const destroyViewRef = <T>(use: DestroyViewRef<T>): Ref<T> => {
    const { viewRef } = use;
    viewRef?.destroy();
    use.viewRef = undefined;

    return use as Ref<T>;
};
