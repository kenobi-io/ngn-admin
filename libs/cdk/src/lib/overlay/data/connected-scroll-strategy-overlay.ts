import { ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';

/** Injection token that determines the scroll handling while the connected overlay is open. */
export const CONNECTED_SCROLL_STRATEGY_OVERLAY = new InjectionToken<
    () => ScrollStrategy
>('cdk-connected-overlay-scroll-strategy');
