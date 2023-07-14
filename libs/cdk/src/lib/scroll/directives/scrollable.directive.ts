/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directive, inject, OnDestroy, OnInit } from '@angular/core';

import { Scrollable } from '../../directive';
import { DispatcherScroll } from '../data';
import {
    deregisterDispatcherScroll,
    DISPATCHER_SCROLL,
    REF_SCROLLABLE,
    registerDispatcherScroll,
} from '../interactions';

/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
@Directive({
    selector: '[scrollable]',
    standalone: true,
})
export class ScrollableDirective<T> implements OnInit, OnDestroy {
    scrollable: Scrollable<T /* , RefScrollable<T> */> = inject(REF_SCROLLABLE);
    dispatcher: DispatcherScroll<T /* , RefScrollable<T> */> =
        inject(DISPATCHER_SCROLL);
    destroyed: Subject<void>;
    elementScrolled: Observable<Event>;
    elementRef: ElementRef<HTMLElement>;
    dir?: Directionality;

    ngOnInit(): void {
        registerDispatcherScroll(this)(this.dispatcher);
    }

    ngOnDestroy(): void {
        const { destroyed } = this.scrollable;
        deregisterDispatcherScroll(this)(this.dispatcher);
        destroyed.next();
        destroyed.complete();
    }
}
