import { supportsScrollBehavior } from '@angular/cdk/platform';
import { InjectionToken } from '@angular/core';
import { Model, Unary, unary } from '@core-template';

import { BlockStrategyScroll } from '../../../data';

export const scrollBehaviorSupported = supportsScrollBehavior();

export const disableBlockStrategyScroll = <T>(): Unary<
    BlockStrategyScroll<T>
> =>
    unary((strategy) => {
        const { document, previousHTMLStyles, window } = strategy;

        if (strategy.isEnabled) {
            const html = document.documentElement;
            const body = document.body;
            const htmlStyle = html.style;
            const bodyStyle = body.style;
            const previousHtmlScrollBehavior = htmlStyle.scrollBehavior || '';
            const previousBodyScrollBehavior = bodyStyle.scrollBehavior || '';

            strategy.isEnabled = false;
            htmlStyle.left = `${previousHTMLStyles.left}`;
            htmlStyle.top = `${previousHTMLStyles.left}`;
            html.classList.remove('cdk-global-scrollblock');
            if (scrollBehaviorSupported) {
                htmlStyle.scrollBehavior = bodyStyle.scrollBehavior = 'auto';
            }
            window.scroll({
                left: previousHTMLStyles.left,
                top: previousHTMLStyles.top,
            });

            if (scrollBehaviorSupported) {
                htmlStyle.scrollBehavior = previousHtmlScrollBehavior;
                bodyStyle.scrollBehavior = previousBodyScrollBehavior;
            }
        }
    });

export const DISABLE_BLOCK_STRATEGY_SCROLL = new InjectionToken<
    Unary<BlockStrategyScroll<Model>>
>('[DISABLE_BLOCK_STRATEGY_SCROLL]', {
    factory: () => disableBlockStrategyScroll(),
});
