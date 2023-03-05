import { coerceCssPixelValue } from '@angular/cdk/coercion';

import { BlockStrategyScroll } from '../../../data';
import {
    positionViewportRulerScroll,
    sizeViewportRulerScroll,
} from '../../scrollable';

/** Blocks page-level scroll while the attached overlay is open. */
export const enableBlockStrategyScroll = (
    strategy: BlockStrategyScroll
): BlockStrategyScroll => {
    const { document, previousHTMLStyles, viewportRulerScroll } = strategy;
    const canBeEnabledScroll = (): boolean => {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        const html = document.documentElement;

        if (
            html.classList.contains('cdk-global-scrollblock') ||
            strategy.isEnabled
        ) {
            return false;
        }
        const body = document.body;
        sizeViewportRulerScroll(viewportRulerScroll);
        const { viewportSize } = viewportRulerScroll;

        if (viewportSize) {
            return (
                body.scrollHeight > viewportSize.height ||
                body.scrollWidth > viewportSize.width
            );
        }

        return false;
    };

    if (canBeEnabledScroll()) {
        const root = document.documentElement;
        positionViewportRulerScroll(viewportRulerScroll);

        if (viewportRulerScroll.startPosition) {
            strategy.previousScrollPosition = viewportRulerScroll.startPosition;
        }
        const { previousScrollPosition } = strategy;
        // Cache the previous inline styles in case the user had set them.
        previousHTMLStyles.left = +root.style.left || 0;
        previousHTMLStyles.top = +root.style.top || 0;
        viewportRulerScroll.rect = previousHTMLStyles;
        // Note: we're using the `html` node, instead of the `body`, because the `body` may
        // have the user agent margin, whereas the `html` is guaranteed not to have one.
        if (previousScrollPosition) {
            root.style.left = coerceCssPixelValue(-previousScrollPosition.left);
            root.style.top = coerceCssPixelValue(-previousScrollPosition.top);
        }
        root.classList.add('cdk-global-scrollblock');
        strategy.isEnabled = true;
    }

    return strategy;
};
