import {
    Directive,
    EmbeddedViewRef,
    OnDestroy,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lapi } from '@relax';
import { Subscription } from 'rxjs';

import {
    clearViewContainerRef,
    createViewRef,
    destroyViewRef,
    unsubscribeFromAll,
} from '../directive';
import { ASYNC_FIELD_ROUTES } from './async-field-routes';
import { ContextRoute } from './context-route';
import { createContextRoute } from './create/create-context-route';
import { createsSubscription } from './create/create-subscription';
import { UseRoute } from './use-route';

type EmbedNull = EmbeddedViewRef<ContextRoute> | null;

@Directive({ selector: '[route]' })
export class RouteDirective implements OnDestroy {
    private context: ContextRoute = {} as ContextRoute;
    private viewRef: EmbedNull = {} as EmbedNull;
    private subscriptions: Subscription[] | null = [];
    private useRoute: UseRoute;

    constructor(
        private templateRef: TemplateRef<ContextRoute>,
        private viewContainerRef: ViewContainerRef,
        private route: ActivatedRoute
    ) {
        lapi(
            createContextRoute,
            createViewRef,
            createsSubscription
        )(
            (this.useRoute = {
                context: this.context,
                fields: ASYNC_FIELD_ROUTES,
                route,
                subscriptions: this.subscriptions,
                templateRef,
                viewContainerRef,
                viewRef: this.viewRef,
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
