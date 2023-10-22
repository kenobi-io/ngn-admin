/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Subscription } from 'rxjs';

import { OverlayCapability } from '../../overlay';
import { DispatcherScroll } from './dispatcher-scroll';
import { StrategyScroll } from './strategy-scroll';

/**
 * Config options for the RepositionScrollStrategy.
 */
export interface ConfigRepositionStrategyScroll<T>
    extends OverlayCapability<T> {
    /** Whether to close the overlay once the user has scrolled away completely. */
    autoClose: boolean;
    /** Time in milliseconds to throttle the scroll events. */
    scrollThrottle: number;
}

type ChangeRepositionStrategyScroll<T> = OverlayCapability<T> & {
    config: Partial<ConfigRepositionStrategyScroll<T>>;
    subscription: Subscription;
};

/**
 * Strategy that will update the element position as the user is scrolling.
 */
export type RepositionStrategyScroll<T = unknown> = StrategyScroll<T> &
    Partial<ChangeRepositionStrategyScroll<T>> & {
        dispatcher?: DispatcherScroll<T>;
    };
