/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Platform } from '@angular/cdk/platform';
import { ElementRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

import { Zonality } from '../../directive';
import { Scrollable } from '../directives';

/** Time in ms to throttle the scrolling events by default. */
export const DEFAULT_SCROLL_TIME = 20;

type ChangesDispatcherScroll<T> = Partial<Zonality> & {
    /**
     * Scrollable Directive(container) instance to be registered/deregistered
     */
    directive: Scrollable<T>;
    /** Used to reference correct document/window */
    document: Document;
    /** Keeps track of the global `scroll` and `resize` subscriptions. */
    globalSubscription: Subscription;
    /**
     * An observable that emits an event whenever any of the
     * registered scrollable references (or window, document, or body)
     *  fire a scrolled event.
     */
    registeredEmitsEvent: Observable<Scrollable<T> | void>;
    /**
     * An observable that emits whenever any of the
     * scrollable ancestors of an element are scrolled.
     */
    ancestorEmitsEvent: Observable<Scrollable<T> | void>;
    /**
     * Element whose ancestors to listen for.
     */
    elementOrElementRef: ElementRef | HTMLElement;
    /**
     * All registered scrollable directives that contain the provided element.
     */
    directives: Scrollable<T>[];
    /**
     * True if the element is contained within the provided scrollable.
     */
    withinElementContained: boolean;
};

/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
export type DispatcherScroll<T> = Partial<ChangesDispatcherScroll<T>> & {
    /**
     * Time to throttle the scroll events.
     */
    auditTimeInMs: number;
    /**
     * Map of all the scrollable references that are registered with the service and their
     * scroll event subscriptions.
     */
    subscriptionsOfDirectives: Map<Scrollable<T>, Subscription>;
    /** Subject for notifying that a registered scrollable reference element has been scrolled. */
    readonly scrolled: Subject<Scrollable<T> | void>;
    /** Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards. */
    count: number;
    platform: Platform;
};
