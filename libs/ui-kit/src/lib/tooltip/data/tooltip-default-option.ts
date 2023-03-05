import { InjectionToken } from '@angular/core';

/** Default `Tooltip` options that can be overridden. */
export interface TooltipDefaultOptions {
    /** Default delay when the tooltip is shown. */
    showDelay: number;

    /** Default delay when the tooltip is hidden. */
    hideDelay: number;

    /** Default delay when hiding the tooltip on a touch device. */
    touchendHideDelay: number;

    /** Default touch gesture handling for tooltips. */
    touchGestures?: TooltipTouchGestures;

    /** Default position for tooltips. */
    position?: TooltipPosition;

    /**
     * Default value for whether tooltips should be positioned near the click or touch origin
     * instead of outside the element bounding box.
     */
    positionAtOrigin?: boolean;

    /** Disables the ability for the user to interact with the tooltip element. */
    disableTooltipInteractivity?: boolean;
}

/** @docs-private */
export function TOOLTIP_DEFAULT_OPTIONS_FACTORY(): TooltipDefaultOptions {
    return {
        hideDelay: 0,
        showDelay: 0,
        touchendHideDelay: 1500,
    };
}

/** Injection token to be used to override the default options for `matTooltip`. */
export const TOOLTIP_DEFAULT_OPTIONS =
    new InjectionToken<TooltipDefaultOptions>('mat-tooltip-default-options', {
        factory: TOOLTIP_DEFAULT_OPTIONS_FACTORY,
        providedIn: 'root',
    });
