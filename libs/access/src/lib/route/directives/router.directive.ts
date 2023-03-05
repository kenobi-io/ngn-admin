/* eslint-disable unicorn/no-empty-file */
// import {
//    Directive,
//    EmbeddedViewRef,
//    OnDestroy,
//    TemplateRef,
//    ViewContainerRef,
// } from '@angular/core';
// import { Router } from '@angular/router';
//
// import {
//    clearViewContainerRef,
//    createViewRef,
//    destroyViewRef,
//    unsubscribesFinal,
// } from '../../directive';
// import { ASYNC_ROUTER_FIELDS, ContextRouter, UseRouter } from '../data';
// import {
//    createContextRouter,
//    createSubscriptionsRouter,
// } from '../interactions';
//
// @Directive({ selector: '[router]', standalone: true })
// export class RouterDirective implements OnDestroy {
//    private useRouter: UseRouter;
//
//    constructor(
//        private readonly templateRef: TemplateRef<ContextRouter>,
//        private readonly viewContainerRef: ViewContainerRef,
//        private readonly router: Router
//    ) {
//        lapi(
//            createContextRouter,
//            createViewRef,
//            createSubscriptionsRouter
//        )(
//            (this.useRouter = {
//                context: {} as ContextRouter,
//                fields: ASYNC_ROUTER_FIELDS,
//                router,
//                templateRef,
//                viewContainerRef,
//                viewRef: {} as EmbeddedViewRef<ContextRouter> | null,
//            })
//        );
//    }
//
//    ngOnDestroy() {
//        lapi(
//            unsubscribesFinal,
//            clearViewContainerRef,
//            destroyViewRef
//        )(this.useRouter);
//    }
// }
