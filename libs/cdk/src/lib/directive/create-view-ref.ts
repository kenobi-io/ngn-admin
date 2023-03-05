import { Context, Use } from './data';

/**
 * `Role` creates embedded view.
 * @param use
 * @returns `Use` instance reference
 */
export const createViewRef = <T, K extends Use<T>>(use: Use<T>): K => {
    const { context, optionsEmbeddedViewRef, templateRef, viewContainerRef } =
        use;
    templateRef &&
        (use.viewRef = viewContainerRef.createEmbeddedView<Context<T>>(
            templateRef,
            context,
            optionsEmbeddedViewRef
        ));

    return use as K;
};
