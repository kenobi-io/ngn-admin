/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Subscription } from 'rxjs';

import { Zonality } from '../../directive';
import { OverlayRef } from '../../overlay';
import { DispatcherScroll } from './dispatcher-scroll';
import { ViewportRulerScroll } from './viewport-rule-scroll';

/**
 * Config options for the RepositionScrollStrategy.
 */
export interface ConfigRepositionStrategyScroll<T> {
    /** Whether to close the overlay once the user has scrolled away completely. */
    autoClose: boolean;
    overlayRef: OverlayRef<T>;
    /** Time in milliseconds to throttle the scroll events. */
    scrollThrottle: number;
}

type ChangeRepositionStrategyScroll<T> = {
    overlayRef: OverlayRef<T>;
    config: Partial<ConfigRepositionStrategyScroll<T>>;
    subscription: Subscription;
};

/**
 * Strategy that will update the element position as the user is scrolling.
 */
export type RepositionStrategyScroll<T> = Zonality &
    Partial<ChangeRepositionStrategyScroll<T>> & {
        dispatcher: DispatcherScroll<T>;
        viewportRuler: ViewportRulerScroll;
    };
