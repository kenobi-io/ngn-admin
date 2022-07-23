import {
    Directive,
    EmbeddedViewRef,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lapi } from '@relax';

import {
    clearViewContainerRef,
    createViewRef,
    destroyViewRef,
    unsubscribeFromAll,
} from '../../directive';
import { ASYNC_ROUTE_FIELDS, ContextRoute, UseRoute } from '../data/index';
import { createContextRoute, createSubscriptionsRoute } from '../interactions';

@Directive({ selector: '[route]', standalone: true })
export class RouteDirective implements OnDestroy {
    private useRoute: UseRoute;

    constructor(
        private readonly templateRef: TemplateRef<ContextRoute>,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly route: ActivatedRoute
    ) {
        lapi(
            createContextRoute,
            createViewRef,
            createSubscriptionsRoute
        )(
            (this.useRoute = {
                context: {} as ContextRoute,
                fields: ASYNC_ROUTE_FIELDS,
                route,
                templateRef,
                viewContainerRef,
                viewRef: {} as EmbeddedViewRef<ContextRoute> | null,
            })
        );
    }

    ngOnDestroy() {
        lapi(
            unsubscribeFromAll,
            clearViewContainerRef,
            destroyViewRef
        )(this.useRoute);
    }
}
