import { Optional } from '@core-template';

import { ContextTemplate } from './context-template';
import { Use } from './use';

export type CreateViewRefUse<T> = Optional<
    Use<T>,
    'context' | 'templateRef' | 'viewContainerRef'
>;
/**
 * `Role` creates embedded view.
 * @param use
 * @returns `Use` instance reference
 */
export const createViewRef = <T>(use: CreateViewRefUse<T>): Use<T> => {
    const { context, templateRef, viewContainerRef } = use;
    use.viewRef = viewContainerRef.createEmbeddedView<ContextTemplate<T>>(
        templateRef,
        context
    );
    return use as Use<T>;
};
