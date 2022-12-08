import { Bounden } from '@core-template';

import { Context } from './context-template';
import { Use } from './use';

export type CreateViewRefUse<T> = Bounden<
    Use<T>,
    'templateRef' | 'viewContainerRef'
>;

/**
 * `Role` creates embedded view.
 * @param use
 * @returns `Use` instance reference
 */
export const createViewRef = <T, K extends Use<T>>(
    use: CreateViewRefUse<T>
): K => {
    const {
        context,
        optionsEmbeddedViewRef,
        templateRef,
        viewContainerRef,
        viewRef,
    } = use;
    !viewRef &&
        (use.viewRef = viewContainerRef.createEmbeddedView<Context<T>>(
            templateRef,
            context,
            optionsEmbeddedViewRef
        ));
    return use as K;
};
