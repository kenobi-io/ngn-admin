import { InjectionToken } from '@angular/core';

/** Time in ms to throttle repositioning after scroll events. */
export const SCROLL_THROTTLE_MS = 20;

/** Injection token that determines the scroll handling while a tooltip is visible. */
export const TOOLTIP_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
    'mat-tooltip-scroll-strategy'
);

/** @docs-private */
export function TOOLTIP_SCROLL_STRATEGY_FACTORY(
    overlay: Overlay
): () => ScrollStrategy {
    return () =>
        overlay.scrollStrategies.reposition({
            scrollThrottle: SCROLL_THROTTLE_MS,
        });
}

/** @docs-private */
export const TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    deps: [Overlay],
    provide: TOOLTIP_SCROLL_STRATEGY,
    useFactory: TOOLTIP_SCROLL_STRATEGY_FACTORY,
};
