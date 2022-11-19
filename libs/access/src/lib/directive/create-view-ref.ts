import { Bounden } from '@core-template';

import { ContextTemplate } from './context-template';
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
export const createViewRef = <T>(use: CreateViewRefUse<T>): Use<T> => {
    const {
        context,
        optionsEmbeddedViewRef,
        templateRef,
        viewContainerRef,
        viewRef,
    } = use;
    !viewRef &&
        (use.viewRef = viewContainerRef.createEmbeddedView<ContextTemplate<T>>(
            templateRef,
            context,
            optionsEmbeddedViewRef
        ));
    return use as Use<T>;
};
