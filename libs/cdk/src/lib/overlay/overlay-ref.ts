/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
    OverlayConfig,
    OverlayKeyboardDispatcher,
    OverlayOutsideClickDispatcher,
    PositionStrategy,
    ScrollStrategy,
} from '@angular/cdk/overlay';
import { Portal, PortalOutlet } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';

import { Ref } from '../directive';
import { ImmutableObject } from './immutable-object';

/** Size properties for an overlay. */
export interface OverlayReference {
    attach: (portal: Portal<unknown>) => unknown;
    detach: () => unknown;
    dispose: () => void;
    overlayElement: HTMLElement;
    hostElement: HTMLElement;
    backdropElement: HTMLElement | null;
    getConfig: () => unknown;
    hasAttached: () => boolean;
    updateSize: (config: unknown) => void;
    updatePosition: () => void;
    getDirection: () => Direction;
    setDirection: (dir: Direction | Directionality) => void;
    backdropClick: () => Observable<MouseEvent>;
    attachments: () => Observable<void>;
    detachments: () => Observable<void>;
    keydownEvents: () => Observable<KeyboardEvent>;
    outsidePointerEvents: () => Observable<MouseEvent>;
    addPanelClass: (classes: string | string[]) => void;
    removePanelClass: (classes: string | string[]) => void;
    readonly _outsidePointerEvents: Subject<MouseEvent>;
    readonly _keydownEvents: Subject<KeyboardEvent>;
}

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
export type OverlayRef = PortalOutlet &
    OverlayReference &
    Ref & {
        animationsDisabled: boolean;
        attachments: Subject<void>;
        backdropClick: Subject<MouseEvent>;
        backdropClickHandler: (event: MouseEvent) => void;
        backdropTimeout?: number;
        backdropTransitionendHandler: (event: TransitionEvent) => void;
        config: ImmutableObject<OverlayConfig>;
        detachments: Subject<void>;
        document: Document;
        host: HTMLElement;
        /** Stream of keydown events dispatched to this overlay. */
        _keydownEvents: Subject<KeyboardEvent>;
        keyboardDispatcher: OverlayKeyboardDispatcher;
        location: Location;
        /** Stream of mouse outside events dispatched to this overlay. */
        _outsidePointerEvents: Subject<MouseEvent>;
        outsideClickDispatcher: OverlayOutsideClickDispatcher;
        pane: HTMLElement;
        portalOutlet: PortalOutlet;
        /**
         * Reference to the parent of the `_host` at the time it was detached. Used to restore
         * the `_host` to its original position in the DOM when it gets re-attached.
         */
        previousHostParent?: HTMLElement;
        positionStrategy?: PositionStrategy;
        scrollStrategy?: ScrollStrategy;
    };
