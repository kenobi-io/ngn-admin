/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Location } from '@angular/common';
import { Subject, Subscription, SubscriptionLike } from 'rxjs';

import { Zonality } from '../../directive';
import { ChangesOverlayRef } from './changes-overlay-ref';
import {
    KeyboardDispatcherOverlay,
    OutsideClickDispatcherOverlay,
} from './dispatcher';

/** Size properties for an overlay. */
type CreateOverlayRef = Zonality & {
    attachments: Subject<void>;
    backdropClick: Subject<MouseEvent>;
    backdropClickHandler: (event: MouseEvent) => void;
    backdropTransitionendHandler: (event: TransitionEvent) => void;
    detachments: Subject<void>;
    document: Document;
    /** Stream of keydown events dispatched to this overlay. */
    keyboardDispatcher: KeyboardDispatcherOverlay;
    location: Location;
    locationChanges: SubscriptionLike | Subscription;
    /** Stream of mouse outside events dispatched to this overlay. */
    outsideClickDispatcher: OutsideClickDispatcherOverlay;
};

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export type OverlayRef<T> = CreateOverlayRef & Partial<ChangesOverlayRef<T>>;

export type OverlayRefCapability<T> = {
    overlayRef: OverlayRef<T>;
};
