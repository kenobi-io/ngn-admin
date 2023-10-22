/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directionality } from '@angular/cdk/bidi';
import {
    Directive,
    ElementRef,
    EmbeddedViewRef,
    inject,
    NgZone,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Context, OptionsEmbeddedViewRef, Scrollable } from '../../directive';
import { VIEW_CONTAINER_REF_TOKEN, ZONE_TOKEN } from '../../platform';
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
export class ScrollableDirective<T> implements OnInit, OnDestroy, Scrollable {
    viewContainerRef: ViewContainerRef = inject(VIEW_CONTAINER_REF_TOKEN);
    ngZone: NgZone = inject(ZONE_TOKEN);
    context?: Context<unknown> | undefined;
    optionsEmbeddedViewRef?: OptionsEmbeddedViewRef | undefined;
    templateRef?: TemplateRef<Context<unknown>> | undefined;
    viewRef?: EmbeddedViewRef<Context<unknown>> | undefined;
    scrollable: Scrollable<T> = inject(REF_SCROLLABLE);
    dispatcher: DispatcherScroll<T> = inject(DISPATCHER_SCROLL);
    destroyed: Subject<void> = new Subject();
    elementScrolled!: Observable<Event>;
    elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
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
