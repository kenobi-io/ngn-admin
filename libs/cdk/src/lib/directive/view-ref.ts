import { Context, Ref } from './data';

/**
 * `Role` creates embedded view.
 * @param use
 * @returns `Use` instance reference
 */
export const viewRef = <T, K extends Ref<T>>(use: Ref<T>): K => {
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
