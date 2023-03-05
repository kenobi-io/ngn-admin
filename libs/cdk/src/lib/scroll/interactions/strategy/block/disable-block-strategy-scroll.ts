import { supportsScrollBehavior } from '@angular/cdk/platform';

import { BlockStrategyScroll } from '../../../data';

export const scrollBehaviorSupported = supportsScrollBehavior();

/** Unblocks page-level scroll while the attached overlay is open. */
export const disableBlockStrategyScroll = (
    strategy: BlockStrategyScroll
): BlockStrategyScroll => {
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
        // Disable user-defined smooth scrolling temporarily while we restore the scroll position.
        // See https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
        // Note that we don't mutate the property if the browser doesn't support `scroll-behavior`,
        // because it can throw off feature detections in `supportsScrollBehavior` which
        // checks for `'scrollBehavior' in documentElement.style`.
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

    return strategy;
};
