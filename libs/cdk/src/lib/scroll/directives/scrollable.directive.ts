/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directive, inject, OnDestroy, OnInit } from '@angular/core';

import { UseScrollable } from '../data';
import {
    deregisterDispatcherScroll,
    registerDispatcherScroll,
    USE_SCROLLABLE,
} from '../interactions';

export type Scrollable<T> = {
    use: UseScrollable<T>;
};

/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
@Directive({
    selector: '[scrollable]',
    standalone: true,
})
export class ScrollableDirective<T>
    implements OnInit, OnDestroy, Scrollable<T>
{
    use: UseScrollable<T> = inject(USE_SCROLLABLE);
    ngOnInit(): void {
        const { dispatcherScroll } = this.use;
        dispatcherScroll.directive = this;
        registerDispatcherScroll(dispatcherScroll);
    }
    ngOnDestroy(): void {
        const { destroyed, dispatcherScroll } = this.use;
        deregisterDispatcherScroll(dispatcherScroll);
        destroyed.next();
        destroyed.complete();
    }
}
