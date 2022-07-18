import { Use } from './use';

/**
 * `Role` destroys view reference.
 * @param use
 * @returns `Use` instance reference
 */
export const destroyViewRef = <T extends Use>(use: T): T => {
    let { viewRef } = use;

    if (viewRef) {
        viewRef.destroy();
        viewRef = null;
    }

    return use;
};
