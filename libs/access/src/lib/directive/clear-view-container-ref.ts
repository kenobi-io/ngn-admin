import { Use } from './use';

/**
 * `Role` clears container reference in view.
 * @param use
 * @returns `Use` instance reference
 */
export const clearViewContainerRef = <T extends Use>(use: T): T => {
    const { viewContainerRef } = use;
    viewContainerRef.clear();

    return use;
};
