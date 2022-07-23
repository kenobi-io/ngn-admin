import { EmbedNull, Use } from './use';

/**
 * `Role` creates embedded view.
 * @param use
 * @returns `Use` instance reference
 */
export const createViewRef = <T extends Use>(use: T): T => {
    const { context, templateRef, viewContainerRef } = use;
    use.viewRef = viewContainerRef.createEmbeddedView(
        templateRef,
        context
    ) as EmbedNull;

    return use;
};
