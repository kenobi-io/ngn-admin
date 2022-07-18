import { Use } from './use';

/**
 * `Role` creates embedded view.
 * @param use
 * @returns `Use` instance reference
 */
export const createViewRef = <T extends Use>(use: T): T => {
    const { context, templateRef, viewContainerRef } = use;
    viewContainerRef.createEmbeddedView(templateRef, context);

    return use;
};
