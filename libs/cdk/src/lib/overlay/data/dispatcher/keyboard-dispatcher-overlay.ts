/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Zonality } from '../../../directive';
import { DispatcherOverlay } from './dispatcher-overlay';

type KeydownListener = {
    (event: Event): void;
    // eslint-disable-next-line no-use-before-define
    (this: KeyboardDispatcherOverlay, event: KeyboardEvent): void;
};

/**
 * Service for dispatching keyboard events that land on the body to appropriate overlay ref,
 * if any. It maintains a list of attached overlays to determine best suited overlay based
 * on event target and order of overlay opens.
 */
export type KeyboardDispatcherOverlay = Zonality &
    DispatcherOverlay &
    Partial<{
        // kindof: 'KeyboardDispatcherOverlay';
        /** @breaking-change 14.0.0 _ngZone will be required. */
        listener: KeydownListener;
    }>;

export type KeyboardDispatcherOverlayCapability = {
    dispatcher: KeyboardDispatcherOverlay;
};
